import { PrismaUsersRepository } from '@/http/repositories/prisma-users-repository';
import { RegisterUseCase } from '@/http/use-cases/register';

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);
  return registerUseCase;
}
