import { Component, HostListener } from '@angular/core';
import { GlobalVariablService } from '../services/global-variabl.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  workspaceIsOpen = true;

  constructor(public globalVariable: GlobalVariablService) {}

  toggleImageRotation() {
    this.workspaceIsOpen = !this.workspaceIsOpen;
    this.globalVariable.openWorkspace = !this.globalVariable.openWorkspace;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth < 1000) {
      this.globalVariable.openWorkspace = false;
    } else {
      this.globalVariable.openWorkspace = true;
    }
  }
}