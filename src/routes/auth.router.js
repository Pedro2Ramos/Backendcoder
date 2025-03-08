import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js'; 
import dotenv from 'dotenv';

dotenv.config();

const router = Router();


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new UserModel({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: 'user',
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
           .status(200)
           .json({ message: 'Login exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticar al usuario', error });
    }
});


router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
    res.status(200).json(req.user);
});

export default router;

