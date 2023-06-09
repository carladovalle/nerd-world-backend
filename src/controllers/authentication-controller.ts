import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/users-service";

import authenticationService, { SignInParams, AuthSignInParams } from "../services/authentication-service";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function authSingInPost(req: Request, res: Response) {
  const { email } = req.body as AuthSignInParams;

  try {
    await userService.createAuthUser({ email });
    const result = await authenticationService.authSignIn(email);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function signOut(req: Request, res: Response) {
  try {
    await authenticationService.signOut(res.locals.token);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}