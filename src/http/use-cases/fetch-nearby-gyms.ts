import { Gym } from '@prisma/client';
import { GymsRepository } from '@/http/repositories/gyms-repository';

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}
interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private prismaGymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.prismaGymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });
    return { gyms };
  }
}
