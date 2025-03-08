import { PetModel } from '../models/pets.model.js';

class PetsService {
    async createMany(pets) {
        return await PetModel.insertMany(pets);
    }
}

export const petsService = new PetsService();