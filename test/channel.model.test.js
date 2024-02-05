const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const sandbox = sinon.createSandbox();

const { Channel } = require('../app/models/ChannelModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Channels', () => {
    beforeEach(() => {
        sandbox.restore();
        mongoose.connection.collections.channels.drop();
    });

    describe('#createChannel()', () => {
        it('devrait trouver un canal par ID à partir de la base de données',async () => {
            const name = faker.commerce.productName();
            const description = faker.lorem.paragraphs();
            const createdChannel = await Channel.create({ name, description });

            const savedChannel = await Channel.findOne({ _id: createdChannel._id });
            expect(savedChannel).to.not.be.null;
            expect(savedChannel.name).to.equal(name);
            expect(savedChannel.description).to.equal(description);
        });
    });

    describe('#getChannelById()', () => {
        it('devrait mettre à jour un canal existant dans la base de données', async () => {
            const name = faker.commerce.productName();
            const description = faker.lorem.paragraphs();
            const createdChannel = await Channel.create({ name, description });

            const foundChannel = await Channel.getChannelById(createdChannel._id);
            expect(foundChannel).to.not.be.null;
            expect(foundChannel._id).to.deep.equal(createdChannel._id);
            expect(foundChannel.name).to.equal(name);
            expect(foundChannel.description).to.equal(description);
        });
    });

    describe('#updateChannel()', () => {
        it('devrait mettre à jour un canal existant dans la base de données', async () => {
            const originalName = faker.commerce.productName();
            const updatedName = faker.commerce.productName();
            const description = faker.lorem.paragraphs();
            const createdChannel = await Channel.create({ name: originalName, description });

            const result = await Channel.updateChannel(createdChannel._id, { name: updatedName });
            const updatedChannel = await Channel.findOne({ _id: createdChannel._id });

            expect(result).to.not.be.null;
            expect(updatedChannel.name).to.equal(updatedName);
            expect(updatedChannel.description).to.equal(description);
        });
    });

    describe('#deleteChannel()', () => {
        it('devrait supprimer un canal depuis la base de données', async () => {
            const name = faker.commerce.productName();
            const description = faker.lorem.paragraphs();
            const deletedChannel = await Channel.create({ name, description });

            const result = await Channel.deleteChannel(deletedChannel._id);
            const remainingChannel = await Channel.findOne({ _id: deletedChannel._id });

            expect(remainingChannel).to.be.null;
            expect(result).to.not.be.null;
        });
    });
});
