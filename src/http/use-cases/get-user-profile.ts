import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/users-repository';
import { UserNotExistsError } from '@/http/use-cases/errors/user-not-exist';

interface GetUserUseCaseRequest {
  userId: string;
}
type GetUserUseCaseResponse = {
  user: User;
};

export class UserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotExistsError();
    }

    return {
      user,
    };
  }
}
