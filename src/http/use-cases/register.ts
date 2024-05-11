import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse {
  user: User
}

// SOLID
// D - Dependency Inversion Principle
export class RegisterUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private prismaUsersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.prismaUsersRepository.findByEmail(
      email,
    )
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const password_hash = await hash(password, 6)

    const user = await this.prismaUsersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
