import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password } = body;

    const { user, accessToken } = await this.userService.loginUser(
      email,
      password,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({ user });
  }

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Res() res: Response,
    @Query('ref') ref?: string,
  ) {
    const { email, name, password } = body;
    const { user, accessToken } = await this.userService.registerUser(
      name,
      email,
      password,
      ref,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({ user });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 0,
    });

    return res.send({ message: 'Logged out' });
  }

  @Get('referrals')
  getReferrals(@Query('code') code: string) {
    return this.userService.getAllReferrals(code);
  }
}
