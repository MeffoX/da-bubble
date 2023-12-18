"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AvatarFormComponent = void 0;
var core_1 = require("@angular/core");
var AvatarFormComponent = /** @class */ (function () {
    function AvatarFormComponent(loginService, avatarUploadService, router, location) {
        this.loginService = loginService;
        this.avatarUploadService = avatarUploadService;
        this.router = router;
        this.location = location;
        this.avatars = [
            './assets/img/avatar/avatar1.png',
            './assets/img/avatar/avatar2.png',
            './assets/img/avatar/avatar3.png',
            './assets/img/avatar/avatar4.png',
            './assets/img/avatar/avatar5.png',
            './assets/img/avatar/avatar6.png',
        ];
        this.avatar = './assets/img/avatar/avatar0.png';
        this.isUploading = false;
    }
    AvatarFormComponent.prototype.getAvatar = function (selectedAvatar) {
        this.avatar = selectedAvatar;
    };
    AvatarFormComponent.prototype.uploadImage = function (user) {
        var _this = this;
        this.isUploading = true;
        this.avatarUploadService
            .uploadImageFromPath(this.avatar, "profil/" + user.uid)
            .subscribe(function (photoURL) {
            _this.loginService.updateUserProfile({ photoURL: photoURL })
                .then(function () {
                _this.loginService.updateUserInFirestore(user.uid, { avatarUrl: photoURL });
            })
                .then(function () {
                _this.router.navigate(['mainpage']).then(function () {
                    window.location.reload();
                });
            })["catch"](function (error) {
                console.log(error);
                _this.isUploading = false;
            });
        });
    };
    AvatarFormComponent = __decorate([
        core_1.Component({
            selector: 'app-avatar-form',
            templateUrl: './avatar-form.component.html',
            styleUrls: ['./avatar-form.component.scss']
        })
    ], AvatarFormComponent);
    return AvatarFormComponent;
}());
exports.AvatarFormComponent = AvatarFormComponent;
