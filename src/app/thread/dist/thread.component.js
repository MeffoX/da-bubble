"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ThreadComponent = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var ThreadComponent = /** @class */ (function () {
    function ThreadComponent(threadService, mainChat, channelService, loginService, globalVariable, uploadService) {
        this.threadService = threadService;
        this.mainChat = mainChat;
        this.channelService = channelService;
        this.loginService = loginService;
        this.globalVariable = globalVariable;
        this.uploadService = uploadService;
        this.message = '';
        this.emojiPicker = false;
    }
    ThreadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.threadService.selectedUser$.subscribe(function (user) {
            _this.selectedUser = user;
        });
    };
    ThreadComponent.prototype.toggleEmojiPicker = function () {
        this.emojiPicker = !this.emojiPicker;
    };
    ThreadComponent.prototype.addEmoji = function ($event) {
        this.message += $event.emoji.native;
        this.emojiPicker = false;
    };
    ThreadComponent.prototype.sendMessage = function () {
        if (this.message.length > 0) {
            this.threadService.sendMessage(this.message);
            this.message = '';
            this.scrollToBottom();
        }
    };
    ThreadComponent.prototype.triggerFileUpload = function () {
        this.fileInput.nativeElement.click();
    };
    ThreadComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        var fileToUpload = files.item(0);
        if (fileToUpload) {
            if (!this.uploadService.checkFileSize(fileToUpload)) {
                window.alert('Datei ist zu groß. Maximale Dateigröße ist 2 MB.');
                return;
            }
            this.uploadService.uploadFile(fileToUpload).then(function (downloadURL) {
                _this.sendMediaMessage(fileToUpload, downloadURL);
            })["catch"](function (error) {
                console.error("Fehler beim Hochladen: ", error);
            });
        }
    };
    ThreadComponent.prototype.sendMediaMessage = function (file, downloadURL) {
        var currentTimestamp = firestore_1.Timestamp.now().toDate();
        var message = {
            text: this.message,
            senderId: this.loginService.currentUser.uid,
            sentDate: currentTimestamp.toLocaleDateString(),
            sentTime: currentTimestamp.getHours() + ":" + currentTimestamp.getMinutes(),
            send: firestore_1.Timestamp.now(),
            avatarUrl: this.loginService.currentUser.avatarUrl,
            name: this.loginService.currentUser.name,
            reaction: null,
            messageId: '',
            mediaUrl: downloadURL,
            fileName: file.name
        };
        this.message = message;
        this.threadService.sendMessage(this.message);
    };
    ThreadComponent.prototype.formatTime = function (time) {
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        return hours + ":" + minutes;
    };
    ThreadComponent.prototype.formatDate = function (date) {
        var options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        return new Intl.DateTimeFormat('de-DE', options).format(date);
    };
    ThreadComponent.prototype.scrollToBottom = function () {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    };
    ThreadComponent.prototype.closeThread = function () {
        this.globalVariable.openChannelChat = true;
        this.globalVariable.openThread = false;
        this.globalVariable.openDM = false;
        this.globalVariable.openNewMessage = false;
    };
    ThreadComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], ThreadComponent.prototype, "fileInput");
    __decorate([
        core_1.ViewChild('scrollContainer')
    ], ThreadComponent.prototype, "scrollContainer");
    ThreadComponent = __decorate([
        core_1.Component({
            selector: 'app-thread',
            templateUrl: './thread.component.html',
            styleUrls: ['./thread.component.scss']
        })
    ], ThreadComponent);
    return ThreadComponent;
}());
exports.ThreadComponent = ThreadComponent;
