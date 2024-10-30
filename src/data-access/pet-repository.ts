import { Pet, PetProperties } from "../business/pet-type"
import { JsonFileStore } from "../utils/json-file-store";

function getNextId<T extends {id: number}>(items: T[]) {
  if (items.length === 0) {
    return 1;
  }
  const ids = items.map(item => item.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export class PetRepository {

  constructor(
    private readonly store: JsonFileStore<Pet>
  ) {}

  async create(petProperties: PetProperties) {
    
    const pets = await this.store.read();
    const nextId = getNextId(pets);

    const newPet = {
      ...petProperties,
      id: nextId,
    }

    pets.push(newPet);
    await this.store.write(pets);
    return newPet;
  }

  readAll() {
    throw new Error('Not Implemented')
  }

  readById() {
    throw new Error('Not Implemented')
  }

  update() {
    throw new Error('Not Implemented')
  }

  delete() {
    throw new Error('Not Implemented')
  }
}