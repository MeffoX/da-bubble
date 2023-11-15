import { Component } from '@angular/core';
import { GlobalVariablService } from '../services/global-variabl.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(public globalVariable: GlobalVariablService) {

  }
}
