import * as signalR from '@microsoft/signalr';

const URL = 'https://localhost:7019/hub'; // Remplacez par l'URL de votre hub

class SignalRService {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();

    this.isSubscribed = false;

    this.connection.start().catch(err => console.error('SignalR Connection Error: ', err));
  }

  onMessageReceived(callback) {
    this.connection.on('messageReceived', callback);
  }

  onNotificationReceived(callback) {
    this.connection.on('ReceiveNotification', callback);
  }

  sendMessage(user, message, channelId) {
    this.connection.invoke('NewMessage', user, message, channelId).catch(err => console.error('SignalR Send Error: ', err));
  }

  sendNotification(user, notification, channelId) {
    this.connection.invoke('SendNotification', user, notification, channelId).catch(err => console.error('SignalR Send Error: ', err)); // Correction ici
  }

  joinChannel(channelId) {
    this.connection.invoke('JoinChannel', channelId).catch(err => console.error('SignalR Join Error: ', err));
  }

  exitChannel(channelId) {
    this.connection.invoke('ExitChannel', channelId).catch(err => console.error('SignalR Exit Error: ', err));
  }
}

export default new SignalRService();
