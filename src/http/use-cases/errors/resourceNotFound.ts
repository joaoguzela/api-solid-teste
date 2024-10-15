export class ResourceNotFoundError extends Error {
  constructor() {
    super('Gym not exist');
  }
}
