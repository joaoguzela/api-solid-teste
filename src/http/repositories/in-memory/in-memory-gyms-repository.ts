import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/http/repositories/gyms-repository';
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinate';
import { Gym, Prisma } from '@prisma/client';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];
  async findById(id: string) {
    const gym = this.items.find(gym => gym.id === id);
    if (!gym) return null;
    return gym;
  }
  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter(item => {
      const distance = getDistanceBetweenCoordinate(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );
      return distance <= 10;
    });
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: 'gym-1',
      title: data.title!,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };
    this.items.push(gym);
    return gym;
  }
  async searchMany(query: string, page: number) {
    return this.items
      .filter(gym => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
}
