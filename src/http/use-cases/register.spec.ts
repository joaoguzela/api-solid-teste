import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('Register use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });
  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password up on registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });
    const isPasswordCorretlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorretlyHashed).toBe(true);
  });
  it('should not to be able to register with same email twice', async () => {
    const email = 'johndoe123@exemple.com';
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });
    expect(
      async () =>
        await registerUseCase.execute({
          name: 'John Doe',
          email,
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
