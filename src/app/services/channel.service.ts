import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Channel } from '../modules/channel.class';
import { LoginService } from './login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  selectedChannel: any = [];
  selectedChannelDate: string;

  constructor(
    private firestore: Firestore,
    public loginService: LoginService
  ) {}

  /**
   * Adds a new channel to Firestore.
   * @param channel - The Channel object to be added.
   * @returns A Promise with the ID of the added document.
   */
  async addChannel(channel: Channel): Promise<string> {
    const channelsRef = collection(this.firestore, 'channels');
    const docRef = await addDoc(channelsRef, channel.toJSON());
    return docRef.id;
  }

  /**
   * Adds a user to a specific channel in Firestore.
   * @param channelId - The ID of the channel.
   * @param userName - The name of the user to be added.
   * @returns A Promise indicating the success of the operation.
   */
  async addUserToChannel(channelId: string, userName: string): Promise<void> {
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    return updateDoc(channelDocRef, {
      channelUser: arrayUnion(userName),
    });
  }

  /**
   * Retrieves all channels from Firestore.
   * @returns An Observable array of channels.
   */
  getChannels(): Observable<any[]> {
    const channelsRef = collection(this.firestore, 'channels');
    const channels$ = collectionData(channelsRef, {
      idField: 'id',
    }) as Observable<any[]>;
    return channels$;
  }

  /**
   * Retrieves all users from Firestore.
   * @returns A Promise with an array of user objects.
   */
  async getAllUsers(): Promise<any[]> {
    const usersRef = collection(this.firestore, 'users');
    return getDocs(usersRef).then((snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      return users;
    });
  }

  /**
   * Retrieves the users of a specific channel from Firestore.
   * @param channelId - The ID of the channel.
   * @returns An Observable array of users.
   */
  getChannelUsers(channelId: string): Observable<any[]> {
    debugger;
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    return from(getDoc(channelDocRef)).pipe(
      map((docSnap) => (docSnap.exists() ? docSnap.data().channelUser : []))
    );
  }

  /**
   * Updates the users of the selected channel after a user leaves.
   * @param channelId - The ID of the channel.
   */
  getChannelUsersAfterLeave(channelId: string): void {
    this.getChannelUsers(channelId).subscribe((users) => {
      this.selectedChannel.users = users;
    });
  }

  /**
   * Retrieves the avatar URL of a user.
   * @param user - The user object.
   * @returns The avatar URL.
   */
  getUserAvatar(user: any): string {
    return user.avatarUrl;
  }

  /**
   * Updates a channel in Firestore.
   * @param channelId - The ID of the channel.
   * @param updates - The partial updates to be applied to the channel.
   * @returns A Promise indicating the success of the operation.
   */
  async updateChannel(
    channelId: string,
    updates: Partial<Channel>
  ): Promise<void> {
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    return updateDoc(channelDocRef, updates);
  }

  /**
   * Checks if the current user is in the selected channel.
   * @returns True if the user is in the channel, otherwise false.
   */
  isCurrentUserInTheChannel(): boolean {
    for (let i = 0; i < this.selectedChannel.channelUser.length; i++) {
      if (
        this.selectedChannel.channelUser[i].uid ==
        this.loginService.currentUser.uid
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Deletes the current user from the selected channel in Firestore.
   * Updates the channel users after the user leaves.
   */
  async deleteUserFromChannel(): Promise<void> {
    const channelId = this.selectedChannel.id;
    const channelDocRef = doc(this.firestore, `channels/${channelId}`);
    const currentUserUid = this.loginService.currentUser.uid;
    const channelUserArray = this.selectedChannel.channelUser;
    const userIndex = channelUserArray.findIndex(
      (user) => user.uid === currentUserUid
    );
    if (userIndex !== -1) {
      channelUserArray.splice(userIndex, 1);
      await updateDoc(channelDocRef, {
        channelUser: channelUserArray,
      });
    }
    this.getChannelUsersAfterLeave(channelId);
  }

  formattedDate() {
    let date: Date = this.selectedChannel.channelCreatedDate.toDate();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
    };
    const formattedDate: string = date.toLocaleDateString(
      'de-DE',
      options
    );
    this.selectedChannelDate = formattedDate;
  }
}
