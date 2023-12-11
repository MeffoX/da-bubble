import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CombinedSearchService } from '../services/combined-search.service';
import { UserService } from '../services/user.service';
import { ChannelService } from '../services/channel.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { GlobalVariablService } from 'src/app/services/global-variabl.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  @Input() items$: Observable<any[]>;
  @Input() placeholder: string = 'Suche...';
  @Input() isNewMessageContext: boolean = false;

  @Input() inputHeight: string;
  @Input() inputFontSize: string;

  @Output() selectItem = new EventEmitter<any>();
  @Output() userSelected = new EventEmitter<any>();
  placeholderText: string = 'Code Learning durchsuchen';

  constructor(
    public userService: UserService,
    private channelService: ChannelService,
    private dialog: MatDialog,
    private combinedSearchService: CombinedSearchService,
    public globalVariable: GlobalVariablService,
    private breakpointObserver: BreakpointObserver
        ) { }

  searchControl = new FormControl();

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(searchString => {
      this.combinedSearchService.setSearchString(searchString);
    });
    this.items$ = this.combinedSearchService.getCombinedSearchResults();

    const customQuery = '(max-width: 1000px)';

    this.breakpointObserver.observe(customQuery).subscribe(result => {
      if (!this.placeholder) {
        this.placeholder = result.matches ? 'Gehe zu...' : 'Code Learning durchsuchen';
      }
    });
  }
  
  openClickedProfileMenu(user: any) {
    this.userService.selectedUser = user;
    this.dialog.open(ProfileMenuClickedComponent);
  }

  openClickedChannel(channel: any) {
    this.channelService.selectedChannel = channel;
    this.channelService.getChannelUsers(channel.id).subscribe(users => {
      this.channelService.selectedChannel.users = users;
    });
    this.globalVariable.openDM = false;
    this.globalVariable.openThread = false;
    this.globalVariable.openChannelChat = true;
    this.globalVariable.openNewMessage=false;
    this.clearSearch();
  }

  selectUser(user) {
    this.userService.selectedUser = user;
    this.globalVariable.openChannelChat = false;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = true;
    this.globalVariable.openNewMessage=false;
    this.clearSearch();
  }

  onSelect(item: any) {
    if (this.isNewMessageContext && item.name) {
      this.selectUser(item);
    } else if (item.name) {
      this.openClickedProfileMenu(item);
    }
  }
  
  

  clearSearch() {
    this.searchControl.setValue('');
  }
}