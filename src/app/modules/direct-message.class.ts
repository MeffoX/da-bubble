import { User } from './user.class';

export class DirectMessage {
  public userIds: string[];
  public users: User[];
  public text: string;
  public senderId: string;
  public sentDate: Date;

  constructor(obj?: any) {
    this.userIds = obj?.userIds || [];
    this.users = obj?.users || [];
    this.text = obj?.text || '';
    this.senderId = obj?.senderId || '';
    this.sentDate = obj?.sentDate || new Date();
  }
}
