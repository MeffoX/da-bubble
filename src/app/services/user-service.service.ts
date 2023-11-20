import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private searchControl = new BehaviorSubject<string>('');

  constructor(private userService: UserService) { }

  setSearchString(searchString: string) {
    this.searchControl.next(searchString);
  }

  getSearchResults(): Observable<any[]> {
    return combineLatest([this.userService.getAllUsers(), this.searchControl.asObservable().pipe(startWith(''))])
      .pipe(
        map(([users, searchString]) => {
          const searchStr = (typeof searchString === 'string') ? searchString.toLowerCase() : '';
          return users.filter(u => u.name.toLowerCase().includes(searchStr));
        })
      );
  }
  
}