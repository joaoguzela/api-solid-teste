import { Checkin } from '@prisma/client';
import { CheckInsRepository } from '@/http/repositories/check-ins-repository';
import { GymsRepository } from '@/http/repositories/gyms-repository';
import { ResourceNotFoundError } from '@/http/use-cases/errors/resourceNotFound';
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinate';
interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}
type ValidateCheckInUseCaseResponse = {
  checkIn: Checkin;
};

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }
    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
