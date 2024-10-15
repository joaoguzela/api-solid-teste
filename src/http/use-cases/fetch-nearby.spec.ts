import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from '@/http/use-cases/fetch-nearby-gyms';

let gymInRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;
describe('Fetch nearby gyms use case', () => {
  beforeEach(() => {
    gymInRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymInRepository);
  });
  it('should be able to fetch nearby gyms', async () => {
    await gymInRepository.create({
      title: `gym-near`,
      description: '',
      phone: '123456',
      latitude: -27.2092052,
      longitude: -49.6401092,
    });
    await gymInRepository.create({
      title: `gym-far`,
      description: '',
      phone: '123456',
      latitude: -27.0610928,
      longitude: -49.5229501,
    });
    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401092,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-near' })]);
  });
});
