import { UserModel } from '../models/user.model.js';

class UsersService {
    async createMany(users) {
        return await UserModel.insertMany(users);
    }
}

export const usersService = new UsersService();