import { Checkin } from '@prisma/client';
import { CheckInsRepository } from '@/http/repositories/check-ins-repository';
import { ResourceNotFoundError } from '@/http/use-cases/errors/resourceNotFound';
import dayjs from 'dayjs';
import { inflate } from 'zlib';
import { LateCheckInValidationError } from '@/http/use-cases/errors/late-checkIn-validation-error';
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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }
    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
