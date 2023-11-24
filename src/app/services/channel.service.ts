import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, arrayUnion, getDocs, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Channel } from '../modules/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  selectedChannel: any = [];
  

  constructor(private firestore: Firestore) { }

  async addChannel(channel: Channel): Promise<string> {
    const channelsRef = collection(this.firestore, 'channels');
    const docRef = await addDoc(channelsRef, channel.toJSON());
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
    return channels$;
  }
  
  async getAllUsers(): Promise<any[]> {
    const usersRef = collection(this.firestore, 'users');
    return getDocs(usersRef).then(snapshot => {
      const users = snapshot.docs.map(doc => doc.data());
      return users;
    });
  }

  getChannelUsers(channelId: string): Observable<any[]> {
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    return from(getDoc(channelDocRef)).pipe(
      map(docSnap => docSnap.exists() ? docSnap.data().channelUser : [])
    );
  }

  getUserAvatar(user: any): string {
    return user.avatarUrl;
  }
  
}
