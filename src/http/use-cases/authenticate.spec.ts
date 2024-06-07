import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

// describe para categorizar os testes

// interface RegisterUseCaseRequest {
//   name: string
//   email: string
//   password: string
// }
// interface RegisterUseCaseResponse {
//   user: User
// }
let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;
describe('Authenticate use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
    });
    const { user } = await sut.execute({
      email: 'johndoe@exemple.com',
      password: '123456',
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
    expect(() =>
      sut.execute({
        email: 'johndoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
    });
    expect(() =>
      sut.execute({
        email: 'johndoe@exemple.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
