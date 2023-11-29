import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariablService {
  openDM: boolean = false;
  openThread: boolean = false;
  openChannelChat: boolean = false;
  openWorkspace: boolean = true;
  openNewMessage: boolean;

  constructor() {
    this.screenWidthCheck();
  }

  screenWidthCheck(): void {
    if (window.innerWidth <= 1000) {
      this.openNewMessage = false;
    } else {
      this.openNewMessage = true;
    }
  }
}
