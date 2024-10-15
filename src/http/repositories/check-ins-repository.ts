import { Checkin, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>;
  findManyCheckInsByUserId(userId: string, page: number): Promise<Checkin[]>;
  countCheckInsByUserId(userId: string): Promise<number>;
  findById(id: string): Promise<Checkin | null>;
  save(checkin: Checkin): Promise<Checkin>;
}
