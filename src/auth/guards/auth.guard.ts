import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "src/Entities/session.entity";
import { Repository } from "typeorm";

@Injectable()
export class SessionAuthGuard implements CanActivate {

    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const sessionId = request.cookies?.sessionId;
        if (!sessionId) {
        throw new UnauthorizedException('Not authenticated');
        }

        const session = await this.sessionRepository.findOne({
        where: { id: sessionId },
        relations: ['user'],
        });

        if (!session) {
        throw new UnauthorizedException('Invalid session');
        }

        if (session.expiresAt < new Date()) {
        throw new UnauthorizedException('Session expired');
        }

        // attach user to request
        request.user = session.user;
        return true;
    }
}