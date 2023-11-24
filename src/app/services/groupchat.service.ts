import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Channel } from '../modules/channel.class';
import { Observable, concatMap, take } from 'rxjs';
import { LoginService } from './login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class GroupchatService {

  constructor(private firestore: Firestore, public loginService: LoginService) { }

  // createGroupchat(channel: Channel): Observable<string> {
  //   const ref = collection(this.firestore, 'groupchat');
  //   return this.loginService.currentUser$.pipe(
  //     take(1),
  //     concatMap(user => addDoc(ref, {

  //     }))
  //   )
  //  }
}
