import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LoginService } from './login-service/login.service';
import { DmService } from './dm.service';

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
