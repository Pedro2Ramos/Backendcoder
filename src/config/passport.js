import passport from 'passport';
import { UserModel } from '../models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: 'Usuario no encontrado' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return done(null, false, { message: 'Contraseña incorrecta' });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
