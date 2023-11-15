import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  

  getAllUsers(): Observable<any[]> {
    const usersRef = collection(this.firestore, 'users');
    const users$ = collectionData(usersRef, { idField: 'id' }) as Observable<any[]>;
    return users$;
    
  }
}
