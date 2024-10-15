import { Checkin } from '@prisma/client';
import { CheckInsRepository } from '@/http/repositories/check-ins-repository';
import { GymsRepository } from '@/http/repositories/gyms-repository';
import { ResourceNotFoundError } from '@/http/use-cases/errors/resourceNotFound';
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinate';
interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
type CheckInUseCaseResponse = {
  checkIn: Checkin;
};

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private GymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.GymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }
    const distance = getDistanceBetweenCoordinate(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );
    const MAX_DISTANCE = 0.1;

    if (distance > MAX_DISTANCE) {
      throw new Error('User is too far from gym');
    }
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );
    if (checkInOnSameDay) {
      throw new Error('User already checked in today');
    }
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
