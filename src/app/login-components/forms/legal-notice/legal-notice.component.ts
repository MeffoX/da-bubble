import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {
  @Input() legalNotice: boolean;
  @Output() legalNoticeChange = new EventEmitter<boolean>();

  close() {
    this.legalNoticeChange.emit(false);
  }
}
