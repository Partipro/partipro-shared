import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import { IUser } from "../models/user/user.interface";

const SECRET_KEY = process.env.SECRET_KEY as string;

class AuthenticationService extends UserRepository {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }
  async generateToken(user: IUser): Promise<string> {
    const u = await this.userRepository.findById(user._id, {});
    console.log(u);
    return jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "10 days",
      },
    );
  }
}

export default AuthenticationService;
