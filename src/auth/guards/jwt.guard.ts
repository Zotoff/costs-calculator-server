import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1]; // return bearer
    if (!token) {
      throw new UnauthorizedException('Auth error');
    }
    // validate with jwt auth
    const validToken = this.authService.verifyToken(token);
    if (validToken?.error) {
      throw new UnauthorizedException(validToken.error);
    }

    return (request.token = token);
  }
}
