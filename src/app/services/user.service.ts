import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login-service/login.service';
import { DmService } from './dm.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _selectedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectedUser$ = this._selectedUser.asObservable();

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

  set selectedUser(user: any) {
    this._selectedUser.next(user);
  }

  get selectedUser(): any {
    return this._selectedUser.getValue();
  }
}
