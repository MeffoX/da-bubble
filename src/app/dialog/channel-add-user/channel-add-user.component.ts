import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-channel-add-user',
  templateUrl: './channel-add-user.component.html',
  styleUrls: ['./channel-add-user.component.scss'],
})
export class ChannelAddUserComponent implements OnInit {
  variants: string[] = ['Alle Mitglieder von OfficeTeam hinzufügen', 'Bestimmte Leute hinzufügen']
  displayInput: boolean = false;

  constructor(private dialogRef: MatDialogRef<ChannelAddUserComponent>) { }

  ngOnInit(): void {
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onRadioChange(variant: string) {
    if (variant === 'Bestimmte Leute hinzufügen') {
      this.displayInput = false;
    } else {
      this.displayInput = true;
    }
  }

  createChannel() {
    this.closeDialog();
  }
}
