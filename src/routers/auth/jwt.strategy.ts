import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSalt } from './constants';
import { md5 } from 'src/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSalt,
        });
    }

    // JWT验证 - Step 4: 被守卫调用
    async validate(payload: any) {
        console.log(`JWT验证 - Step 4: 被守卫调用`);
        const info = payload.info;

        // const userInfo = crypto.AES.decrypt(info, 'salt').toString(crypto.enc.Utf8);

        // console.log(JSON.parse(userInfo));
        return {
            info,
        };
    }
}