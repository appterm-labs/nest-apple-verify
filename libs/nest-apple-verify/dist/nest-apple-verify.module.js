"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAppleVerifyModule = void 0;
const common_1 = require("@nestjs/common");
const nest_apple_verify_service_1 = require("./nest-apple-verify.service");
let NestAppleVerifyModule = class NestAppleVerifyModule {
};
exports.NestAppleVerifyModule = NestAppleVerifyModule;
exports.NestAppleVerifyModule = NestAppleVerifyModule = __decorate([
    (0, common_1.Module)({
        providers: [nest_apple_verify_service_1.NestAppleVerifyService],
        exports: [nest_apple_verify_service_1.NestAppleVerifyService],
    })
], NestAppleVerifyModule);
//# sourceMappingURL=nest-apple-verify.module.js.map