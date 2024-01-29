const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const User = require('app/models/UserModel');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Modèle Utilisateur', function() {
    it('devrait créer un nouvel utilisateur', function(done) {
        const user = new User({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword',
            token: 'testtoken'
        });

        user.save(function(err, user) {
            expect(err).to.be.null;
            expect(user.username).to.equal('testuser');
            expect(user.email).to.equal('testuser@gmail.com');
            expect(user.password).to.equal('testpassword');
            expect(user.token).to.equal('testtoken');
            done();
        });
    });

    it('ne devrait pas créer un utilisateur sans champ username', function(done) {
        const user = new User({
            email: 'testuser@gmail.com',
            password: 'testpassword',
            token: 'testtoken'
        });

        user.save(function(err, user) {
            expect(err).to.exist;
            done();
        });
    });

    it('ne devrait pas créer un utilisateur sans champ email', function(done) {
        const user = new User({
            username: 'testuser',
            password: 'testpassword',
            token: 'testtoken'
        });

        user.save(function(err, user) {
            expect(err).to.exist;
            done();
        });
    });

    it('ne devrait pas créer un utilisateur sans champ password', function(done) {
        const user = new User({
            username: 'testuser',
            email: 'testuser@gmail.com',
            token: 'testtoken'
        });

        user.save(function(err, user) {
            expect(err).to.exist;
            done();
        });
    });

    it('ne devrait pas créer un utilisateur sans champ token', function(done) {
        const user = new User({
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword'
        });

        user.save(function(err, user) {
            expect(err).to.exist;
            done();
        });
    });
});

