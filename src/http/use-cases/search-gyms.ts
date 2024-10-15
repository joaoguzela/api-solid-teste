import { Gym } from '@prisma/client';
import { GymsRepository } from '@/http/repositories/gyms-repository';

interface SearchGymUseCaseRequest {
  query: string;
  page: number;
}
interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private prismaGymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.prismaGymRepository.searchMany(query, page);
    return { gyms };
  }
}
