const userChannelController = require('../app/controllers/UserChannelController');
const userChannelService = require('../app/services/UserChannelService');
const httpMocks = require('node-mocks-http');

jest.mock('../app/services/UserChannelService');

describe('UserChannelController', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('devrait ajouter un utilisateur à un canal avec succès', async () => {
        userChannelService.addUserToChannel.mockResolvedValue({});
        await userChannelController.addUserToChannel(req, res, next);
        expect(res.statusCode).toBe(201);
    });

    it('devrait retourner 500 lorsque le service addUserToChannel renvoie une erreur', async () => {
        userChannelService.addUserToChannel.mockRejectedValue(new Error());
        await userChannelController.addUserToChannel(req, res, next);
        expect(res.statusCode).toBe(500);
    });

    it('devrait obtenir une association utilisateur-canal avec succès', async () => {
        userChannelService.getUserChannelById.mockResolvedValue({});
        await userChannelController.getUserChannel(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    it('devrait retourner 404 lorsque le service getUserChannelById renvoie null', async () => {
        userChannelService.getUserChannelById.mockResolvedValue(null);
        await userChannelController.getUserChannel(req, res, next);
        expect(res.statusCode).toBe(404);
    });

    it('devrait mettre à jour une association utilisateur-canal avec succès', async () => {
        userChannelService.updateUserChannel.mockResolvedValue({});
        await userChannelController.updateUserChannel(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    it('devrait supprimer une association utilisateur-canal avec succès', async () => {
        userChannelService.deleteUserChannel.mockResolvedValue({});
        await userChannelController.deleteUserChannel(req, res, next);
        expect(res.statusCode).toBe(200);
    });

    it('devrait retourner 404 lorsque le service deleteUserChannel renvoie null', async () => {
        userChannelService.deleteUserChannel.mockResolvedValue(null);
        await userChannelController.deleteUserChannel(req, res, next);
        expect(res.statusCode).toBe(404);
    });
});
