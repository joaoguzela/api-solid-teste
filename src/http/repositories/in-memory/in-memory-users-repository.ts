import { Prisma, User } from '@prisma/client'
import { usersRepository } from '../users-repository'

export class InMemoryUsersRepository implements usersRepository {
  public items: User[] = []
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name!,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    return user || null
  }
}
