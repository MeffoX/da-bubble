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
exports.ThreadService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var rxjs_1 = require("rxjs");
var ThreadService = /** @class */ (function () {
    function ThreadService(firestore, channelService, loginService) {
        this.firestore = firestore;
        this.channelService = channelService;
        this.loginService = loginService;
        this.selectedUserSource = new rxjs_1.BehaviorSubject(null);
        this.selectedUser$ = this.selectedUserSource.asObservable();
        this.messages = [];
    }
    ThreadService.prototype.setSelectedUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var channelId, threadDocRef, messagesCollectionRef, messagesQuery, querySnapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedUserSource.next(user);
                        channelId = this.channelService.selectedChannel.id;
                        threadDocRef = firestore_1.doc(this.firestore, "channels/" + channelId + "/groupchat/" + this.choosenMessageId);
                        messagesCollectionRef = firestore_1.collection(threadDocRef, 'thread');
                        messagesQuery = firestore_1.query(messagesCollectionRef);
                        return [4 /*yield*/, firestore_1.getDocs(messagesQuery)];
                    case 1:
                        querySnapshot = _a.sent();
                        this.messages = querySnapshot.docs.map(function (doc) { return doc.data(); });
                        this.sortMessagesByTime();
                        return [2 /*return*/];
                }
            });
        });
    };
    ThreadService.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, Promise, function () {
            var channelId, threadRef, currentTimestamp, newMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = this.channelService.selectedChannel.id;
                        threadRef = firestore_1.collection(this.firestore, "channels/" + channelId + "/groupchat/" + this.choosenMessageId + "/thread");
                        currentTimestamp = firestore_1.Timestamp.now().toDate();
                        newMessage = {
                            senderId: this.loginService.currentUser.uid,
                            text: message,
                            sentDate: currentTimestamp.toLocaleDateString(),
                            sentTime: currentTimestamp.getHours() + ":" + currentTimestamp.getMinutes(),
                            send: firestore_1.Timestamp.now(),
                            avatarUrl: this.loginService.currentUser.avatarUrl,
                            name: this.loginService.currentUser.name
                        };
                        return [4 /*yield*/, firestore_1.addDoc(threadRef, newMessage)];
                    case 1:
                        _a.sent();
                        this.messages.push(newMessage);
                        this.sortMessagesByTime();
                        return [2 /*return*/];
                }
            });
        });
    };
    ThreadService.prototype.sortMessagesByTime = function () {
        this.messages.sort(function (a, b) {
            var timeA = a.send.seconds;
            var timeB = b.send.seconds;
            return timeA - timeB;
        });
    };
    ThreadService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ThreadService);
    return ThreadService;
}());
exports.ThreadService = ThreadService;
