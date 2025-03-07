import { PetModel } from '../models/pet.model.js';

class PetsService {
    async createMany(pets) {
        return await PetModel.insertMany(pets);
    }
}

export const petsService = new PetsService();