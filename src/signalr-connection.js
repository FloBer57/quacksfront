// src/signalr-connection.js
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
  
    sendMessage(user, message) {
      this.connection.invoke('NewMessage', user, message).catch(err => console.error('SignalR Send Error: ', err));
    }
  }
  
  export default new SignalRService();
  
