import { PrismaUsersRepository } from '@/http/repositories/prisma-users-repository';
import { AuthenticateUseCase } from '@/http/use-cases/authenticate';
import { RegisterUseCase } from '@/http/use-cases/register';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  return authenticateUseCase;
}
