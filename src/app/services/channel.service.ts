import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, arrayUnion, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Channel } from '../modules/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private firestore: Firestore) {}

  async addChannel(channel: Channel): Promise<string> {
    const channelsRef = collection(this.firestore, 'channels');
    const docRef = await addDoc(channelsRef, channel.toJSON());
    console.log('Channel hinzugefügt mit ID:', docRef.id);
    return docRef.id;
  }

  async addUserToChannel(channelId: string, userName: string): Promise<void> {
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    return updateDoc(channelDocRef, {
      channelUser: arrayUnion(userName)
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

  async getAllUsers(): Promise<string[]> {
    const usersRef = collection(this.firestore, 'users');
    return getDocs(usersRef).then(snapshot => {
      const userNames = snapshot.docs.map(doc => doc.data().name);
      console.log('Abgerufene Benutzernamen:', userNames);
    return userNames;
    });
}

}
