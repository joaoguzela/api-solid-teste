import { Checkin } from '@prisma/client';

import { CheckInsRepository } from '@/http/repositories/check-ins-repository';

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page?: number;
}
type FetchUserCheckInsHistoryUseCaseResponse = {
  checkIns: Checkin[];
};

export class FetchCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyCheckInsByUserId(
      userId,
      page,
    );
    return {
      checkIns,
    };
  }
}
