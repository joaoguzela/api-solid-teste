import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { UserProfileUseCase } from '@/http/use-cases/get-user-profile';
import { UserNotExistsError } from '@/http/use-cases/errors/user-not-exist';

let usersRepository: InMemoryUsersRepository;
let userProfileUseCase: UserProfileUseCase;

describe('Get User Profile UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userProfileUseCase = new UserProfileUseCase(usersRepository);
  });
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'joao@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await userProfileUseCase.execute({
      userId: createdUser.id,
    });
    expect(user.id).toEqual(createdUser.id);
  });

  it('should not to be able to able to get user profile with wrong id', async () => {
    expect(
      async () =>
        await userProfileUseCase.execute({
          userId: 'wrong-id',
        }),
    ).rejects.toBeInstanceOf(UserNotExistsError);
  });
});
