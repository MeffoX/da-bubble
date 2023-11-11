export class User {
    public uid: string;
    public name: string;
    public email: string;
    public avatarUrl: string;

    constructor(obj?: any) {
        this.uid = obj ? obj.uid : '',
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.avatarUrl = obj ? obj.avatar_url : '';
    }

    public toJSON() {
        return {
            uid: this.uid,
            name: this.name,
            email: this.email,
            avatarUrl: this.avatarUrl
        };
    }
}