import httpStatus from "http-status";
import bcrypt from "bcrypt";
import ApiError from "../utils/apiError";
import { generateToken } from "../utils/jwtToken";
import { User } from "../models/user";

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  } else if (!bcrypt.compareSync(password, user.password)) {
    throw new ApiError(401, "Incorrect password!");
  }
  return generateToken({
    id: user._id,
    email: user.email,
  });
}

export const register = async ({ password, email }) => {
  const check = await User.findOne({ email });

  if (check) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists");
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const user = new User({
    email,
    password: passwordHash,
  });

  user.save();

  return generateToken({
    id: user._id,
    email: user.email,
  });
}

export const me = async (jwtDecoded) => {
  return jwtDecoded;
}