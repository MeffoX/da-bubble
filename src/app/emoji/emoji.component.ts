import { Component } from '@angular/core';
import { GlobalVariablService } from '../services/global-variabl.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent {

  constructor(public globalVariable: GlobalVariablService) {}

  addEmoji($event){}
}
