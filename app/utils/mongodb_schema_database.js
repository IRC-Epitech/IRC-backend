
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  if (err) throw err;
  const db = client.db('myDatabase'); // Remplacez 'myDatabase' par le nom de votre base de données

  // Schéma de la collection Utilisateurs
  const users = db.collection('Users');
  const user = {
    userId: '<unique_user_id>', // Identifiant unique de l'utilisateur
    username: '<username>', // Nom d'utilisateur choisi
    email: '<email_address>', // Adresse e-mail de l'utilisateur
    password: bcrypt.hashSync('<password>', 10), // Mot de passe hashé
    createdAt: new Date(), // Horodatage de la création du compte
  };

  // Schéma de la collection Messages
  const messages = db.collection('Messages');
  const message = {
    messageId: '<unique_message_id>', // Identifiant unique du message
    content: '<message_content>', // Contenu textuel du message
    senderId: '<sender_user_id>', // ID de l'utilisateur expéditeur
    channelId: '<channel_id>', // ID du canal où le message est envoyé
    createdAt: new Date() // Horodatage de l'envoi du message
  };

  // Schéma de la collection Canaux
  const channels = db.collection('Channels');
  const channel = {
    channelId: '<unique_channel_id>', // Identifiant unique du canal
    name: '<channel_name>', // Nom du canal
    members: ['<user_id_1>', '<user_id_2>'], // Liste des ID des utilisateurs membres
    createdAt: new Date() // Horodatage de la création du canal
  };

  // Exemples d'insertions (décommentez pour utiliser)
  // users.insertOne(user);
  // messages.insertOne(message);
  // channels.insertOne(channel);

  client.close();
});
