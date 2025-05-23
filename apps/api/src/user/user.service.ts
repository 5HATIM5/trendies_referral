import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { comparePasswords, hashPassword } from 'src/auth/utils/hash';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,   private jwtService: JwtService,
  ) {}

  // Login User Service Function
  async loginUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordValid = await comparePasswords(password, user.password);
    
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    
    return { user:userWithoutPassword, accessToken: token };
}

  // Register User Service Function
  async registerUser(
    name: string,
    email: string,
    password: string,
    refCode?: string,
  ) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate unique referral code
    const referralCode = `ref-${Math.random().toString(36).substring(2, 8)}`;

    let referredBy: string | null = null;

    // Check if referrer exists and is not same as email
    if (refCode) {
      const referrer = await this.prisma.user.findFirst({
        where: { referralCode: refCode },
      });

      if (referrer && referrer.email !== email) {
        referredBy = referrer.referralCode;
      }
    }

    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        referralCode,
        referredBy,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return { user: userWithoutPassword, accessToken: token };
  }

  // Get All Referrals Service Function
  async getAllReferrals(referralCode: string) {
    return this.prisma.user.findMany({
      where: {
        referredBy: referralCode,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
