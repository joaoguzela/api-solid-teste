import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-check-ins-repository';

import { getUserMetricsUseCase } from '@/http/use-cases/get-user-metrics';

let checkInRepository: InMemoryCheckInsRepository;
let sut: getUserMetricsUseCase;
describe('get user metrics In use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new getUserMetricsUseCase(checkInRepository);
  });
  it('should be able to get check-ins count', async () => {
    await checkInRepository.create({
      user_id: '123',
      gym_id: '123',
    });
    await checkInRepository.create({
      user_id: '123',
      gym_id: '1234',
    });
    const { checkInsCount } = await sut.execute({
      userId: '123',
    });
    expect(checkInsCount).toEqual(2);
  });
});
