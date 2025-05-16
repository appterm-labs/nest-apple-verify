import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class NestAppleVerifyService {
  private readonly client = jwksClient({
    jwksUri: 'https://appleid.apple.com/auth/keys',
  });

  private getAppleKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          const signingKey = key.getPublicKey();
          resolve(signingKey);
        }
      });
    });
  }

  async verifyIdToken(
    idToken: string,
    aud?: string,
  ): Promise<string | jwt.JwtPayload> {
    const decoded = jwt.decode(idToken, { complete: true }) as jwt.Jwt & {
      header: { kid: string; alg: string };
    };

    if (!decoded || !decoded.header) {
      throw new UnauthorizedException('Invalid ID Token');
    }

    const publicKey = await this.getAppleKey(decoded.header.kid);

    try {
      const payload = jwt.verify(idToken, publicKey, {
        algorithms: ['RS256'],
        issuer: 'https://appleid.apple.com',
        audience: aud || undefined,
      });

      return payload;
    } catch {
      throw new UnauthorizedException('Token verification failed');
    }
  }
}
