import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/http/use-cases/checkin';
import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { FetchCheckInsHistoryUseCase } from '@/http/use-cases/fetch-member-checkin-history';

let checkInRepository: InMemoryCheckInsRepository;
let sut: FetchCheckInsHistoryUseCase;
describe('Fetch checkin hystory In use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new FetchCheckInsHistoryUseCase(checkInRepository);
  });
  it('should be able to check in', async () => {
    await checkInRepository.create({
      user_id: '123',
      gym_id: '123',
    });
    await checkInRepository.create({
      user_id: '123',
      gym_id: '1234',
    });
    const { checkIns } = await sut.execute({
      userId: '123',
      page: 1,
    });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '123' }),
      expect.objectContaining({ gym_id: '1234' }),
    ]);
  });

  it('should be able to fetch paginated check in', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: `user-01`,
        gym_id: `gym-${i}`,
      });
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ]);
  });
});
