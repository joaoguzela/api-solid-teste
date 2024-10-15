import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from '@/http/use-cases/validate-check-in';
import { ResourceNotFoundError } from '@/http/use-cases/errors/resourceNotFound';

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;
describe('Check In use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: '123',
      user_id: '123',
    });

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
  });
  it('should not be able to validate an inexistent check-in', async () => {
    expect(() => sut.execute({ checkInId: '123' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
