import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ChannelService } from './channel.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CombinedSearchService {
  private searchControl = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private channelService: ChannelService
  ) { }

  setSearchString(searchString: string) {
    this.searchControl.next(searchString);
  }

  getCombinedSearchResults(): Observable<any[]> {
    return combineLatest([
      this.userService.getAllUsers(),
      this.channelService.getChannels(),
      this.searchControl.asObservable().pipe(startWith(''))
    ])
    .pipe(
      map(([users, channels, searchString]) => {
        const searchStr = searchString.toLowerCase();
        const filteredUsers = users.filter(user => 
          user.name.toLowerCase().includes(searchStr) || 
          user.email.toLowerCase().includes(searchStr)
        );
        const filteredChannels = channels.filter(channel => 
          channel.channelName.toLowerCase().includes(searchStr) || 
          channel.channelDescription.toLowerCase().includes(searchStr)
        );
        return [...filteredUsers, ...filteredChannels];
      })
    );
  }
}
