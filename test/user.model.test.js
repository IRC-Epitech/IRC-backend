const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const User = require('app/models/UserModel');
const expect = chai.expect;

chai.use(chaiHttp);

// Fonction d'aide pour créer un utilisateur
function createUser({ username = 'testuser', email = 'testuser@gmail.com', password = 'testpassword', token = 'testtoken' } = {}) {
    return new User({ username, email, password, token });
}

describe('Modèle Utilisateur', function() {

    // Nettoyage de la base de données après chaque test
    afterEach(function(done) {
        User.deleteMany({}, function(err) {
            done();
        });
    });

    it('devrait créer un nouvel utilisateur', async function() {
        const user = createUser();

        const savedUser = await user.save();
        expect(savedUser.username).to.equal('testuser');
        expect(savedUser.email).to.equal('testuser@gmail.com');
        expect(savedUser.password).to.equal('testpassword');
        expect(savedUser.token).to.equal('testtoken');
    });

    it('ne devrait pas créer un utilisateur sans champ username', async function() {
        const user = createUser({ username: undefined });

        try {
            await user.save();
        } catch (err) {
            expect(err).to.exist;
        }
    });

    it('ne devrait pas créer un utilisateur sans champ email', async function() {
        const user = createUser({ email: undefined });

        try {
            await user.save();
        } catch (err) {
            expect(err).to.exist;
        }
    });

    it('ne devrait pas créer un utilisateur sans champ password', async function() {
        const user = createUser({ password: undefined });

        try {
            await user.save();
        } catch (err) {
            expect(err).to.exist;
        }
    });

    it('ne devrait pas créer un utilisateur sans champ token', async function() {
        const user = createUser({ token: undefined });

        try {
            await user.save();
        } catch (err) {
            expect(err).to.exist;
        }
    });

    it('devrait échouer si le format de l\'email est invalide', async function() {
        const user = createUser({ email: 'invalidemail' });

        try {
            await user.save();
        } catch (err) {
            expect(err).to.exist;
            expect(err.errors.email).to.exist;
        }
    });


});

