import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'jwtsecret',
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.userId) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}
