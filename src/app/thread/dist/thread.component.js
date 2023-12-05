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
var ThreadComponent = /** @class */ (function () {
    function ThreadComponent(threadService) {
        this.threadService = threadService;
    }
    ThreadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.threadService.selectedUser$.subscribe(function (user) {
            _this.selectedUser = user;
            console.log(_this.selectedUser);
        });
    };
    ThreadComponent.prototype.formatTime = function (time) {
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        return hours + ":" + minutes;
    };
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
