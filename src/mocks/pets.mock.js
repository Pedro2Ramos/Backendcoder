import { faker } from '@faker-js/faker';

export const generateMockPets = (count) => {
    const pets = [];

    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.animal.dog(),
            species: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'hamster']),
            age: faker.number.int({ min: 1, max: 15 })
        });
    }

    return pets;
};
