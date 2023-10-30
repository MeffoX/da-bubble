import { Component } from '@angular/core';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent {
workspaceIsOpen= true;

  constructor() {}

  toggleImageRotation() {
    this.workspaceIsOpen = !this.workspaceIsOpen;
  }

}