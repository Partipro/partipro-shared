import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";
import BadRequestError from "../errors/BadRequestError";

const SECRET_KEY = process.env.SECRET_KEY as string;

class AuthenticationService extends UserRepository {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }
  async generateToken(id: string): Promise<string> {
    const foundUser = await this.userRepository.findById(id, {});
    if (!foundUser) {
      throw new BadRequestError("user_not_found", "User not found.");
    }
    return jwt.sign(
      {
        id: foundUser._id.toString(),
        email: foundUser.email,
      },
      SECRET_KEY,
      {
        expiresIn: "10 days",
      },
    );
  }
}

export default AuthenticationService;
