export class DirectMessage {
  public userIds: string[];
  public avatarUrl: string;
  public text: string;
  public senderId: string;
  public sentDate: Date;
  public name: string;

  constructor(obj?: any) {
    this.userIds = obj?.userIds || [];
    this.avatarUrl = obj?.avatarUrl || [];
    this.text = obj?.text || '';
    this.senderId = obj?.senderId || '';
    this.sentDate = obj?.sentDate || new Date();
    this.name = obj?.name || '';
  }
}
