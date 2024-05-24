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
  
    onNotificationReceived(callback) {
      if (!this.isSubscribed) {
        this.connection.on('ReceiveNotification', (notification) => {
          console.log('Notification reçue :', notification);
          callback(notification);
        });
        this.isSubscribed = true;
      }
    }
  
    sendNotification(notificationId, notificationName, notificationText, notificationType) {
      this.connection.invoke('SendNotification', notificationId, notificationName, notificationText, notificationType)
        .catch(err => console.error('SignalR Send Error: ', err));
      console.log('Notification envoyée à c#');
    }

  onMessageReceived(callback) {
    this.connection.on('messageReceived', callback);
  }

  sendMessage(user, message, channelId) {
    this.connection.invoke('NewMessage', user, message, channelId).catch(err => console.error('SignalR Send Error: ', err));
  }

  joinChannel(channelId) {
    this.connection.invoke('JoinChannel', channelId).catch(err => console.error('SignalR Join Error: ', err));
  }

  exitChannel(channelId) {
    this.connection.invoke('ExitChannel', channelId).catch(err => console.error('SignalR Exit Error: ', err));
  }
}

export default new SignalRService();
