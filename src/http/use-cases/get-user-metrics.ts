import { Checkin } from '@prisma/client';

import { CheckInsRepository } from '@/http/repositories/check-ins-repository';

interface getUserMetricsUseCaseRequest {
  userId: string;
}
type getUserMetricsUseCaseResponse = {
  checkInsCount: number;
};

export class getUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: getUserMetricsUseCaseRequest): Promise<getUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countCheckInsByUserId(
      userId,
    );
    return {
      checkInsCount,
    };
  }
}
