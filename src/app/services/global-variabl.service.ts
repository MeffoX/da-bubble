import { Injectable } from '@angular/core';
import { DmService } from './dm.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariablService {
  openDM: boolean = false;
  openThread: boolean = false;
  openChannelChat: boolean = true;
  openWorkspace: boolean = true;

  constructor() {}
}
