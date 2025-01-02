import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class JwtAgentGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      //get the request
      const request = context.switchToHttp().getRequest();
  
      // return TRUE if agent exists.
      return request?.agent;
    }
  }