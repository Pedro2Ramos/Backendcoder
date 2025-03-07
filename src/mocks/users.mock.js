import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (count) => {
    const users = [];
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    for (let i = 0; i < count; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
            _id: faker.database.mongodbObjectId()
        });
    }

    return users;
};