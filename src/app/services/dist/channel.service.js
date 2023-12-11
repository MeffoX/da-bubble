"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChannelService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var rxjs_1 = require("rxjs");
var ChannelService = /** @class */ (function () {
    function ChannelService(firestore, loginService) {
        this.firestore = firestore;
        this.loginService = loginService;
        this.selectedChannel = [];
    }
    /**
     * Adds a new channel to Firestore.
     * @param channel - The Channel object to be added.
     * @returns A Promise with the ID of the added document.
     */
    ChannelService.prototype.addChannel = function (channel) {
        return __awaiter(this, void 0, Promise, function () {
            var channelsRef, docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelsRef = firestore_1.collection(this.firestore, 'channels');
                        return [4 /*yield*/, firestore_1.addDoc(channelsRef, channel.toJSON())];
                    case 1:
                        docRef = _a.sent();
                        return [2 /*return*/, docRef.id];
                }
            });
        });
    };
    /**
     * Adds a user to a specific channel in Firestore.
     * @param channelId - The ID of the channel.
     * @param userName - The name of the user to be added.
     * @returns A Promise indicating the success of the operation.
     */
    ChannelService.prototype.addUserToChannel = function (channelId, userName) {
        return __awaiter(this, void 0, Promise, function () {
            var channelDocRef;
            return __generator(this, function (_a) {
                channelDocRef = firestore_1.doc(this.firestore, "channels/" + channelId);
                return [2 /*return*/, firestore_1.updateDoc(channelDocRef, {
                        channelUser: firestore_1.arrayUnion(userName)
                    })];
            });
        });
    };
    /**
     * Retrieves all channels from Firestore.
     * @returns An Observable array of channels.
     */
    ChannelService.prototype.getChannels = function () {
        var channelsRef = firestore_1.collection(this.firestore, 'channels');
        var channels$ = firestore_1.collectionData(channelsRef, {
            idField: 'id'
        });
        return channels$;
    };
    /**
     * Retrieves all users from Firestore.
     * @returns A Promise with an array of user objects.
     */
    ChannelService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, Promise, function () {
            var usersRef;
            return __generator(this, function (_a) {
                usersRef = firestore_1.collection(this.firestore, 'users');
                return [2 /*return*/, firestore_1.getDocs(usersRef).then(function (snapshot) {
                        var users = snapshot.docs.map(function (doc) { return doc.data(); });
                        return users;
                    })];
            });
        });
    };
    /**
     * Retrieves the users of a specific channel from Firestore.
     * @param channelId - The ID of the channel.
     * @returns An Observable array of users.
     */
    ChannelService.prototype.getChannelUsers = function (channelId) {
        var channelDocRef = firestore_1.doc(this.firestore, "channels/" + channelId);
        return rxjs_1.from(firestore_1.getDoc(channelDocRef)).pipe(rxjs_1.map(function (docSnap) { return (docSnap.exists() ? docSnap.data().channelUser : []); }));
    };
    /**
     * Updates the users of the selected channel after a user leaves.
     * @param channelId - The ID of the channel.
     */
    ChannelService.prototype.getChannelUsersAfterLeave = function (channelId) {
        var _this = this;
        this.getChannelUsers(channelId).subscribe(function (users) {
            _this.selectedChannel.users = users;
        });
    };
    /**
     * Retrieves the avatar URL of a user.
     * @param user - The user object.
     * @returns The avatar URL.
     */
    ChannelService.prototype.getUserAvatar = function (user) {
        return user.avatarUrl;
    };
    /**
     * Updates a channel in Firestore.
     * @param channelId - The ID of the channel.
     * @param updates - The partial updates to be applied to the channel.
     * @returns A Promise indicating the success of the operation.
     */
    ChannelService.prototype.updateChannel = function (channelId, updates) {
        return __awaiter(this, void 0, Promise, function () {
            var channelDocRef;
            return __generator(this, function (_a) {
                channelDocRef = firestore_1.doc(this.firestore, "channels/" + channelId);
                return [2 /*return*/, firestore_1.updateDoc(channelDocRef, updates)];
            });
        });
    };
    /**
     * Checks if the current user is in the selected channel.
     * @returns True if the user is in the channel, otherwise false.
     */
    ChannelService.prototype.isCurrentUserInTheChannel = function () {
        for (var i = 0; i < this.selectedChannel.channelUser.length; i++) {
            if (this.selectedChannel.channelUser[i].uid ==
                this.loginService.currentUser.uid) {
                return true;
            }
        }
        return false;
    };
    /**
     * Deletes the current user from the selected channel in Firestore.
     * Updates the channel users after the user leaves.
     */
    ChannelService.prototype.deleteUserFromChannel = function () {
        return __awaiter(this, void 0, Promise, function () {
            var channelId, channelDocRef, currentUserUid, channelUserArray, userIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = this.selectedChannel.id;
                        channelDocRef = firestore_1.doc(this.firestore, "channels/" + channelId);
                        currentUserUid = this.loginService.currentUser.uid;
                        channelUserArray = this.selectedChannel.channelUser;
                        userIndex = channelUserArray.findIndex(function (user) { return user.uid === currentUserUid; });
                        if (!(userIndex !== -1)) return [3 /*break*/, 2];
                        channelUserArray.splice(userIndex, 1);
                        return [4 /*yield*/, firestore_1.updateDoc(channelDocRef, {
                                channelUser: channelUserArray
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.getChannelUsersAfterLeave(channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelService.prototype.formattedDate = function () {
        var date = this.selectedChannel.channelCreatedDate.toDate();
        var options = {
            day: 'numeric',
            month: 'long'
        };
        var formattedDate = date.toLocaleDateString('de-DE', options);
        this.selectedChannelDate = formattedDate;
    };
    ChannelService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ChannelService);
    return ChannelService;
}());
exports.ChannelService = ChannelService;
