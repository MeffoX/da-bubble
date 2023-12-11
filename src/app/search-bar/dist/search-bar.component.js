"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchBarComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var profile_menu_clicked_component_1 = require("../dialog/profile-menu-clicked/profile-menu-clicked.component");
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(userService, channelService, dialog, combinedSearchService, globalVariable, breakpointObserver) {
        this.userService = userService;
        this.channelService = channelService;
        this.dialog = dialog;
        this.combinedSearchService = combinedSearchService;
        this.globalVariable = globalVariable;
        this.breakpointObserver = breakpointObserver;
        this.placeholder = 'Suche...';
        this.isNewMessageContext = false;
        this.selectItem = new core_1.EventEmitter();
        this.userSelected = new core_1.EventEmitter();
        this.placeholderText = 'Code Learning durchsuchen';
        this.searchControl = new forms_1.FormControl();
    }
    SearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchControl.valueChanges.subscribe(function (searchString) {
            _this.combinedSearchService.setSearchString(searchString);
        });
        this.items$ = this.combinedSearchService.getCombinedSearchResults();
        var customQuery = '(max-width: 1000px)';
        this.breakpointObserver.observe(customQuery).subscribe(function (result) {
            if (!_this.placeholder) {
                _this.placeholder = result.matches ? 'Gehe zu...' : 'Code Learning durchsuchen';
            }
        });
    };
    SearchBarComponent.prototype.openClickedProfileMenu = function (user) {
        this.userService.selectedUser = user;
        this.dialog.open(profile_menu_clicked_component_1.ProfileMenuClickedComponent);
    };
    SearchBarComponent.prototype.openClickedChannel = function (channel) {
        var _this = this;
        this.channelService.selectedChannel = channel;
        this.channelService.getChannelUsers(channel.id).subscribe(function (users) {
            _this.channelService.selectedChannel.users = users;
        });
        this.globalVariable.openDM = false;
        this.globalVariable.openThread = false;
        this.globalVariable.openChannelChat = true;
        this.globalVariable.openNewMessage = false;
        this.clearSearch();
    };
    SearchBarComponent.prototype.selectUser = function (user) {
        this.userService.selectedUser = user;
        this.globalVariable.openChannelChat = false;
        this.globalVariable.openThread = false;
        this.globalVariable.openDM = true;
        this.globalVariable.openNewMessage = false;
        this.clearSearch();
    };
    SearchBarComponent.prototype.onSelect = function (item) {
        if (this.isNewMessageContext && item.name) {
            this.selectUser(item);
        }
        else if (item.name) {
            this.openClickedProfileMenu(item);
        }
    };
    SearchBarComponent.prototype.clearSearch = function () {
        this.searchControl.setValue('');
    };
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "items$");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "isNewMessageContext");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "inputHeight");
    __decorate([
        core_1.Input()
    ], SearchBarComponent.prototype, "inputFontSize");
    __decorate([
        core_1.Output()
    ], SearchBarComponent.prototype, "selectItem");
    __decorate([
        core_1.Output()
    ], SearchBarComponent.prototype, "userSelected");
    SearchBarComponent = __decorate([
        core_1.Component({
            selector: 'app-search-bar',
            templateUrl: './search-bar.component.html',
            styleUrls: ['./search-bar.component.scss']
        })
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
