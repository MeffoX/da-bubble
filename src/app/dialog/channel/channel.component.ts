import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
    trigger('moveUp', [
      state('up', style({
        transform: 'translateY(-100%)'
      })),
      state('down', style({
        transform: 'translateY(0)'
      })),
      transition('up => down', animate('300ms ease-out')),
      transition('down => up', animate('300ms ease-in'))
    ])
  ]
})
export class ChannelComponent {
  displayNone: boolean = false;
  displayUpperPart: boolean = true;
  displayInput: boolean = false;

  constructor() {}

  toggleInput() {
    this.displayInput = !this.displayInput;
  }
}
