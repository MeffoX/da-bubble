import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablService {
  openDM: boolean = false;
  openThread: boolean = false;
  openChannelChat: boolean = true;
  openWorkspace: boolean = true;

  constructor() { }
}
