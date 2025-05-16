import * as jwt from 'jsonwebtoken';
export declare class NestAppleVerifyService {
    private readonly client;
    private getAppleKey;
    verifyIdToken(idToken: string, aud?: string): Promise<string | jwt.JwtPayload>;
}
