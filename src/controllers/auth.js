import catchAsync from "../utils/catchAsync";
import * as authService from "../services/auth";
import httpStatus from "http-status";

export const login = catchAsync(async (req, res) => {
  const token = await authService.login(req.body);
  res.status(httpStatus.OK).send({ token });
});

export const register = catchAsync(async (req, res) => {
  const token = await authService.register(req.body);
  res.status(httpStatus.CREATED).send({ token });
});

export const logout = catchAsync(async (req, res) => {
  res.status(httpStatus.NO_CONTENT).send();
});

export const me = catchAsync(async (req, res) => {
  console.log(req.jwtDecoded);
  const user = await authService.me(req.jwtDecoded);
  console.log(req.jwtDecoded);
  res.status(httpStatus.OK).send(user);
});