import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from '@/http/use-cases/create-gym';

let gymRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe('Register use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymRepository);
  });
  it('should be able to register', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'John Doe',
      description: '',
      phone: '123456',
      latitude: 123,
      longitude: 123,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
