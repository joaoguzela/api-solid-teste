import { Checkin, Prisma } from '@prisma/client';
import { CheckInsRepository } from '@/http/repositories/check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: Checkin[] = [];

  async save(checkin: Checkin) {
    const index = this.items.findIndex(item => item.id === checkin.id);
    if (index >= 0) {
      this.items[index] = checkin;
      return this.items[index];
    }

    return checkin;
  }
  async findById(id: string) {
    const checkIn = this.items.find(item => item.id === id);
    if (!checkIn) return null;
    return checkIn;
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      gym_id: data.gym_id,
      created_at: new Date(),
    };
    this.items.push(checkIn);
    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');
    const checkIn = this.items.find(checkIn => {
      const checkinDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });
    if (!checkIn) return null;
    return checkIn;
  }
  async findManyCheckInsByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter(checkIn => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
    return checkIns;
  }
  async countCheckInsByUserId(userId: string) {
    const checkIns = this.items.filter(checkIn => checkIn.user_id === userId);
    return checkIns.length;
  }
}
