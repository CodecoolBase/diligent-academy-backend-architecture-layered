import { PetRepository } from "../data-access/pet-repository";
import { JsonFileStore } from "../utils/json-file-store";
import { Pet } from "./pet-type";



export class PetService {
  private readonly repository;

  constructor(store: JsonFileStore<Pet>) {
    this.repository = new PetRepository(store)
  }

  async born(name: string) {    
    const created = await this.repository.create({
      name,
      food: 1,
      weight: 1,
      age: 1
    });
    return created;
  }
}