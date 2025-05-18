"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAppleVerifyService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
let NestAppleVerifyService = class NestAppleVerifyService {
    constructor() {
        this.client = jwksClient({
            jwksUri: 'https://appleid.apple.com/auth/keys',
        });
    }
    getAppleKey(kid) {
        return new Promise((resolve, reject) => {
            this.client.getSigningKey(kid, (err, key) => {
                if (err) {
                    reject(err);
                }
                else {
                    const signingKey = key.getPublicKey();
                    resolve(signingKey);
                }
            });
        });
    }
    async verifyIdToken(idToken, aud) {
        const decoded = jwt.decode(idToken, { complete: true });
        if (!decoded || !decoded.header) {
            throw new common_1.UnauthorizedException('Invalid ID Token');
        }
        const publicKey = await this.getAppleKey(decoded.header.kid);
        try {
            const payload = jwt.verify(idToken, publicKey, {
                algorithms: ['RS256'],
                issuer: 'https://appleid.apple.com',
                audience: aud || undefined,
            });
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Token verification failed');
        }
    }
};
exports.NestAppleVerifyService = NestAppleVerifyService;
exports.NestAppleVerifyService = NestAppleVerifyService = __decorate([
    (0, common_1.Injectable)()
], NestAppleVerifyService);
//# sourceMappingURL=nest-apple-verify.service.js.map