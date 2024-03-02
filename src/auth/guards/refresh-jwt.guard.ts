import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refresh_token, username } = request.body;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token is necessary');
    }
    if (!username) {
      throw new UnauthorizedException('Username is necessary');
    }

    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Username doesnt exist');
    }

    return true;
  }
}
