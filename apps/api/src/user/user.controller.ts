import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Post('login')
  async login(@Body() body: { email: string; password: string}) {
    const { email, password } = body;
    return this.userService.loginUser(email, password);
  }

  @Post('register')
  register(
    @Body() body: { name: string; email: string; password: string },
    @Query('ref') ref?: string,
  ) {
    const { email, name, password } = body;
    return this.userService.registerUser( name, email, password, ref);
  }

  @Get('referrals')
  getReferrals(@Query('code') code: string) {
    return this.userService.getAllReferrals(code);
  }
}
