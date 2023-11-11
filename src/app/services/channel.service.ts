import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private firestore: Firestore) {}

  getChannels(): Observable<any[]> {
    const channelsRef = collection(this.firestore, 'channels');
    const channels$ = collectionData(channelsRef, { idField: 'id' }) as Observable<any[]>;
    channels$.subscribe(data => {
      console.log('Channels data:', data);
    });
    return channels$;
  }
  
}
