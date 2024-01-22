// script de test pour créer un utilisateur
const mongoose = require('mongoose');
const User = require('./app/models/UserModel'); // Assurez-vous que le chemin est correct

mongoose.connect('mongodb://localhost:27017/IRC', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));

db.once('open', async () => {
    try {
        const user = new User({
            username: 'nomutilisateur',
            email: 'email@example.com',
            password: 'motdepasse' // Hasher le mot de passe en production
        });

        await user.save();
        console.log("Utilisateur créé avec succès");
        db.close();
    } catch (error) {
        console.error(error);
        db.close();
    }
});
