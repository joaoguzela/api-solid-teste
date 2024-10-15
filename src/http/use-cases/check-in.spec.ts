import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/http/use-cases/checkin';
import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;
describe('Check In use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    gymsRepository.items.push({
      id: '123',
      title: 'Academia',
      description: 'Academia de teste',
      phone: '123',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: '123',
      gymId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: '123',
      gymId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });
    await expect(() =>
      sut.execute({
        userId: '123',
        gymId: '123',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: '123',
      gymId: '123',
      userLatitude: 0,
      userLongitude: 0,
    }),
      vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: '123',
      gymId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: '1234',
      title: 'Academia',
      description: 'Academia de teste',
      phone: '123',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    expect(() =>
      sut.execute({
        userId: '1234',
        gymId: '123',
        userLatitude: -27.2092052,
        userLongitude: -49.6401092,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
