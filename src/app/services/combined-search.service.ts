import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ChannelService } from './channel.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
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

  private filterUsers(users: any[], searchString: string): any[] {
    return users.filter((user: { name: string; }) => user.name.toLowerCase().includes(searchString));
  }

  private filterChannels(channels: any[], searchString: string): any[] {
    return channels.filter(channel => channel.channelName.toLowerCase().includes(searchString));
  }

  private getSearchString(searchString: string): string {
    return searchString.startsWith('@') || searchString.startsWith('#') ? 
           searchString.slice(1).toLowerCase() : searchString.toLowerCase();
  }

  private getFilteredResults(users: any[], channels: any[], searchString: string): any[] {
    let filteredUsers = [], filteredChannels = [];

    if (searchString.startsWith('@')) {
      filteredUsers = this.filterUsers(users, this.getSearchString(searchString));
    } else if (searchString.startsWith('#')) {
      filteredChannels = this.filterChannels(channels, this.getSearchString(searchString));
    } else {
      filteredUsers = this.filterUsers(users, searchString);
      filteredChannels = this.filterChannels(channels, searchString);
    }

    return [...filteredUsers, ...filteredChannels];
  }

  getCombinedSearchResults(): Observable<any[]> {
    return combineLatest([
      this.userService.getAllUsers(),
      this.channelService.getChannels(),
      this.searchControl.asObservable().pipe(startWith(''))
    ])
    .pipe(
      map(([users, channels, searchString]) => 
        this.getFilteredResults(users, channels, searchString))
    );
  }
}
