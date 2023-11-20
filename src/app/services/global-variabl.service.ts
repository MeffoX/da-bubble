import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablService {
  openDM: boolean = true;
  openThread: boolean = false;
  openChannelChat: boolean = false;
  openWorkspace: boolean = true;

  constructor() {}
}
