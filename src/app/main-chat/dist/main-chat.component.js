"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.MainChatComponent = void 0;
var core_1 = require("@angular/core");
var user_list_component_1 = require("../dialog/user-list/user-list.component");
var add_user_component_1 = require("../dialog/add-user/add-user.component");
var channel_component_1 = require("../dialog/channel/channel.component");
var firestore_1 = require("@angular/fire/firestore");
var router_1 = require("@angular/router");
var MainChatComponent = /** @class */ (function () {
    function MainChatComponent(dialog, channelService, loginService, firestore, router, route, userService, globalVariable, threadService) {
        var _this = this;
        this.dialog = dialog;
        this.channelService = channelService;
        this.loginService = loginService;
        this.firestore = firestore;
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.globalVariable = globalVariable;
        this.threadService = threadService;
        this.messageText = '';
        this.messages = [];
        this.emojiPicker = false;
        this.emojiPickerReaction = false;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.getMessagesForSelectedChannel();
            }
        });
    }
    MainChatComponent.prototype.ngOnInit = function () {
        this.getMessagesForSelectedChannel();
    };
    Object.defineProperty(MainChatComponent.prototype, "selectedChannel", {
        get: function () {
            return this.channelService.selectedChannel;
        },
        enumerable: false,
        configurable: true
    });
    MainChatComponent.prototype.getUserAvatar = function (user) {
        return user.avatarUrl;
    };
    MainChatComponent.prototype.openUserListDialog = function () {
        this.dialog.open(user_list_component_1.UserListComponent);
    };
    MainChatComponent.prototype.openAddUserDialog = function () {
        this.dialog.open(add_user_component_1.AddUserComponent);
    };
    MainChatComponent.prototype.openChannelDialog = function (channel) {
        channel = this.channelService.selectedChannel;
        this.dialog.open(channel_component_1.ChannelComponent);
    };
    MainChatComponent.prototype.sendMessage = function () {
        var _this = this;
        var channelUserIds = this.selectedChannel.channelUser.map(function (user) { return user; });
        var currentDate = new Date();
        var formattedDate = this.formatDate(currentDate);
        var formattedTime = this.formatTime(currentDate);
        this.sendMessageToGroupChat(this.channelService.selectedChannel.id, {
            text: this.messageText,
            senderId: this.loginService.currentUser.uid,
            receiverId: channelUserIds,
            sentDate: formattedDate,
            sentTime: formattedTime,
            avatarUrl: this.loginService.currentUser.avatarUrl,
            name: this.loginService.currentUser.name,
            reaction: null,
            messageId: ''
        }).then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.messageText = '';
                return [2 /*return*/];
            });
        }); });
    };
    MainChatComponent.prototype.sendMessageToGroupChat = function (channelId, message) {
        return __awaiter(this, void 0, Promise, function () {
            var groupChatRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupChatRef = firestore_1.collection(this.firestore, "channels/" + channelId + "/groupchat");
                        return [4 /*yield*/, firestore_1.addDoc(groupChatRef, message)];
                    case 1:
                        _a.sent();
                        this.scrollToBottom();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainChatComponent.prototype.formatDate = function (date) {
        var options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        return new Intl.DateTimeFormat('de-DE', options).format(date);
    };
    MainChatComponent.prototype.formatTime = function (date) {
        var options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Intl.DateTimeFormat('de-DE', options).format(date);
    };
    MainChatComponent.prototype.formatMessageTime = function (time) {
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        return hours + ":" + minutes;
    };
    MainChatComponent.prototype.getMessagesForSelectedChannel = function () {
        var _this = this;
        var channelId = this.selectedChannel.id;
        var groupChatRef = firestore_1.collection(this.firestore, "channels/" + channelId + "/groupchat");
        var orderedQuery = firestore_1.query(groupChatRef, firestore_1.orderBy('sentDate', 'asc'), firestore_1.orderBy('sentTime', 'asc'));
        this.unsubscribeMessages = firestore_1.onSnapshot(orderedQuery, function (querySnapshot) {
            _this.messages = querySnapshot.docs.map(function (doc) {
                var data = doc.data();
                var id = doc.id;
                return __assign({ id: id }, data);
            });
        });
    };
    MainChatComponent.prototype.toggleEmojiPickerReaction = function (messageId) {
        this.emojiPickerReaction = !this.emojiPickerReaction;
        this.updateCurrentMessageId(messageId);
    };
    MainChatComponent.prototype.updateCurrentMessageId = function (messageId) {
        this.currentMessageId = messageId;
    };
    MainChatComponent.prototype.toggleEmojiPicker = function () {
        this.emojiPicker = !this.emojiPicker;
    };
    MainChatComponent.prototype.addEmoji = function ($event) {
        this.messageText += $event.emoji.native;
        this.emojiPicker = false;
    };
    MainChatComponent.prototype.addReaction = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var emoji, channelId, ref, docSnapshot, currentReactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emoji = $event.emoji.native;
                        if (!this.currentMessageId) return [3 /*break*/, 3];
                        channelId = this.selectedChannel.id;
                        ref = firestore_1.collection(this.firestore, "channels/" + channelId + "/groupchat");
                        return [4 /*yield*/, firestore_1.getDoc(firestore_1.doc(ref, this.currentMessageId))];
                    case 1:
                        docSnapshot = _a.sent();
                        if (!docSnapshot.exists()) return [3 /*break*/, 3];
                        currentReactions = docSnapshot.data().reaction || [];
                        currentReactions.push(emoji);
                        return [4 /*yield*/, firestore_1.updateDoc(firestore_1.doc(ref, this.currentMessageId), { reaction: currentReactions })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.emojiPickerReaction = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    MainChatComponent.prototype.scrollToBottom = function () {
        this.scrollContainer.nativeElement.scrollTop =
            this.scrollContainer.nativeElement.scrollHeight;
    };
    MainChatComponent.prototype.startThread = function (messageId) {
        var _this = this;
        this.choosenMessageId = messageId;
        this.threadService.choosenMessageId = messageId;
        var channelId = this.selectedChannel.id;
        var threadRef = firestore_1.doc(this.firestore, "channels/" + channelId + "/groupchat/" + this.choosenMessageId);
        firestore_1.getDoc(threadRef).then(function (docSnapshot) {
            if (docSnapshot.exists()) {
                _this.threadData = docSnapshot.data();
                _this.openThread(_this.threadData);
            }
        });
    };
    MainChatComponent.prototype.openThread = function (user) {
        this.selectedUser = user;
        if (this.selectedUser) {
            this.globalVariable.openChannelChat = true;
            this.globalVariable.openThread = true;
            this.globalVariable.openDM = false;
            this.globalVariable.openNewMessage = false;
            this.threadService.setSelectedUser(this.selectedUser);
        }
    };
    MainChatComponent.prototype.ngOnDestroy = function () {
        if (this.unsubscribeMessages) {
            this.unsubscribeMessages();
        }
    };
    __decorate([
        core_1.ViewChild('scrollContainer')
    ], MainChatComponent.prototype, "scrollContainer");
    MainChatComponent = __decorate([
        core_1.Component({
            selector: 'app-main-chat',
            templateUrl: './main-chat.component.html',
            styleUrls: ['./main-chat.component.scss']
        }),
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MainChatComponent);
    return MainChatComponent;
}());
exports.MainChatComponent = MainChatComponent;
