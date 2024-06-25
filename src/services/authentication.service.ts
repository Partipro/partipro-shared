import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import BadRequestError from "../errors/BadRequestError";
import mongoose from "mongoose";
import BaseService from "../core/base.service";
import { IUser } from "../models/user/user.interface";
import UserRepository from "../repositories/user.repository";

const SECRET_KEY = process.env.SECRET_KEY as string;

export class AuthenticationService extends BaseService<IUser> {
  constructor() {
    super(UserRepository);
  }
  async generateToken(id: string, { session }: { session?: mongoose.mongo.ClientSession } = {}): Promise<string> {
    const foundUser = await super.findById(id, { session });
    if (!foundUser) {
      throw new BadRequestError("user_not_found", "Usuário não encontrado.");
    }
    return jwt.sign(
      {
        id: foundUser._id.toString(),
        email: foundUser.email,
        contract: foundUser.contract,
        role: foundUser.role,
      },
      SECRET_KEY,
      {
        expiresIn: "10 days",
      },
    );
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new AuthenticationService();
