import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/resgister.dto';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {

    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<User> {
        //hash password by bcrypt
        registerDto.password = await bcrypt.hash(registerDto.password, 12);
        const user = await this.userService.create(registerDto);

        delete user.password;

        return user;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const user = await this.userService.findOne({ email: loginDto.email });

        if (!user) {
            throw new BadRequestException('User invalid')
        }

        if (!await bcrypt.compare(loginDto.password, user.password)) {
            throw new BadRequestException('Password invalid')
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { httpOnly: true });

        return {
            message: 'success'
        };
    }

    @Get()
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({ id: data['id'] })

            // hide password from user
            const { password, ...result } = user;
            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }

    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'logout success'
        }
    }
}
