import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Channel } from '../modules/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private firestore: Firestore) {}

  async addChannel(channel: Channel): Promise<void> {
    const channelsRef = collection(this.firestore, 'channels');
    return addDoc(channelsRef, channel.toJSON())
      .then(docRef => {
        console.log('Channel hinzugefügt mit ID:', docRef.id);
      })
      .catch(error => {
        console.error('Fehler beim Hinzufügen des Channels:', error);
      });
  }

  async addUserToChannel(channelId: string, userName: string): Promise<void> {
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    return updateDoc(channelDocRef, {
      channelUser: arrayUnion(userName) // Hier kann auch eine komplexere Logik angewendet werden
    });
  }

  getChannels(): Observable<any[]> {
    const channelsRef = collection(this.firestore, 'channels');
    const channels$ = collectionData(channelsRef, { idField: 'id' }) as Observable<any[]>;
    channels$.subscribe(data => {
      console.log('Channels data:', data);
    });
    return channels$;
  }
}
