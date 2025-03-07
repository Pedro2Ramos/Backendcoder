import { Router } from 'express';
import { generateMockPets } from '../mocks/pets.mock.js';
import { generateMockUsers } from '../mocks/users.mock.js';
import { usersService } from '../services/users.service.js';
import { petsService } from '../services/pets.service.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    try {
        const pets = generateMockPets(100);
        res.json({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/mockingusers', (req, res) => {
    try {
        const users = generateMockUsers(50);
        res.json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        
        if (users > 0) {
            const mockUsers = generateMockUsers(users);
            await usersService.createMany(mockUsers);
        }
        
        if (pets > 0) {
            const mockPets = generateMockPets(pets);
            await petsService.createMany(mockPets);
        }
        
        res.json({ 
            status: 'success', 
            message: `Generated ${users} users and ${pets} pets successfully` 
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;