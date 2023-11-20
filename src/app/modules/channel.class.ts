export class Channel {
    public channelName: string;
    public channelDescription: string;
    public channelUser: any[];
    public channelCreatedBy: any;

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.channelDescription = obj ? obj.channelDescription : '';
        this.channelUser = obj ? obj.channelUser : []; // null statt undefined oder leerer String
        this.channelCreatedBy = obj ? obj.channelCreatedBy : null;
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            ...(this.channelUser != null && { channelUser: this.channelUser }),
            ...(this.channelCreatedBy != null && { channelCreatedBy: this.channelCreatedBy })
        };
    }
}
