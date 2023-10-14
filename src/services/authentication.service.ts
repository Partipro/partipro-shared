import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/user.repository";
import BadRequestError from "../errors/BadRequestError";
import mongoose from "mongoose";

const SECRET_KEY = process.env.SECRET_KEY as string;

class AuthenticationService extends UserRepository {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }
  async generateToken(id: string, { session }: { session?: mongoose.mongo.ClientSession } = {}): Promise<string> {
    const foundUser = await this.userRepository.findById(id, { session });
    if (!foundUser) {
      throw new BadRequestError("user_not_found", "Usuário não encontrado.");
    }
    return jwt.sign(
      {
        id: foundUser._id.toString(),
        email: foundUser.email,
        contract: foundUser.contract,
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

export default AuthenticationService;
