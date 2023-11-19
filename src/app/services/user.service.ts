import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { LoginService } from './login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: any = [];

  constructor(
    private firestore: Firestore,
    public loginService: LoginService,
    ) {}

  getAllUsers(): Observable<any[]> {
    const usersRef = collection(this.firestore, 'users');
    const users$ = collectionData(usersRef, { idField: 'id' }) as Observable<
      any[]
    >;
    return users$;
  }
}