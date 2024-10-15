import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-check-ins-repository';

import { FetchCheckInsHistoryUseCase } from '@/http/use-cases/fetch-member-checkin-history';
import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymUseCase } from '@/http/use-cases/search-gyms';

let gymInRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;
describe('Should be able to search for gyms', () => {
  beforeEach(() => {
    gymInRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymInRepository);
  });
  it('should be able to check in', async () => {
    await gymInRepository.create({
      title: 'John Doe',
      description: '',
      phone: '123456',
      latitude: 123,
      longitude: 123,
    });
    await gymInRepository.create({
      title: 'Jym Doe',
      description: '',
      phone: '123456',
      latitude: 123,
      longitude: 123,
    });
    const { gyms } = await sut.execute({
      query: 'John',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'John Doe' })]);
  });
  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymInRepository.create({
        title: `gym-${i}`,
        description: '',
        phone: '123456',
        latitude: 123,
        longitude: 123,
      });
    }
    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ]);
  });
});
