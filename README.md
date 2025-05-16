# nest-apple-verify

A simple NestJS module for verifying Apple ID tokens.

## Installation

```bash
npm install nest-apple-verify
```

Or with yarn:

```bash
yarn add nest-apple-verify
```

## Usage

### Import the module

```typescript
import { Module } from '@nestjs/common';
import { NestAppleVerifyModule } from 'nest-apple-verify';

@Module({
  imports: [NestAppleVerifyModule],
})
export class AppModule {}
```

### Inject and use the service

```typescript
import { Injectable } from '@nestjs/common';
import { NestAppleVerifyService } from 'nest-apple-verify';

@Injectable()
export class AuthService {
  constructor(private readonly appleVerifyService: NestAppleVerifyService) {}

  async verifyAppleToken(token: string): Promise<any> {
    // Optionally pass your app's client ID as the second parameter for audience validation
    const payload = await this.appleVerifyService.verifyIdToken(token, 'your.apple.client.id');
    
    // If verification fails, an UnauthorizedException is thrown
    // If successful, the decoded token payload is returned
    return payload;
  }
}
```

## API

### NestAppleVerifyService

#### verifyIdToken(idToken: string, aud?: string): Promise<string | jwt.JwtPayload>

Verifies an Apple ID token.

Parameters:
- `idToken`: The Apple ID token to verify
- `aud` (optional): The audience (client ID) to validate against

Returns:
- A promise that resolves to the token payload if verification is successful
- Throws `UnauthorizedException` if verification fails

## How it works

This module:
1. Fetches Apple's public keys from their JWKS endpoint
2. Decodes the provided ID token to get the key ID (kid)
3. Retrieves the corresponding public key
4. Verifies the token signature and validates claims
5. Returns the decoded token payload or throws an exception

## License

```
Copyright (C) 2025 Ege Sabanci <esabanci@appterm.co>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```