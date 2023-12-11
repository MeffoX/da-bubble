"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WorkspaceComponent = void 0;
var core_1 = require("@angular/core");
var create_channel_component_1 = require("src/app/dialog/create-channel/create-channel.component");
var WorkspaceComponent = /** @class */ (function () {
    function WorkspaceComponent(router, userService, channelService, dialog, loginService, globalVariable, mainChat) {
        this.router = router;
        this.userService = userService;
        this.channelService = channelService;
        this.dialog = dialog;
        this.loginService = loginService;
        this.globalVariable = globalVariable;
        this.mainChat = mainChat;
        this.isListHidden = false;
        this.isContactHidden = false;
        this.users = [];
        this.currentUser = null;
        this.authSubscription = null;
        this.channels = [];
    }
    /**
    * Initializes the component by subscribing to the user, loading users, and loading channels.
    */
    WorkspaceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to changes in the current user
        this.authSubscription = this.loginService.currentUser$.subscribe(function (user) {
            _this.currentUser = user;
        });
        // Load all users
        this.userService.getAllUsers().subscribe(function (users) {
            _this.users = users;
        }, function (error) {
            console.error('Error loading users:', error);
        });
        // Load all channels
        this.channelService.getChannels().subscribe(function (channels) {
            _this.channels = channels;
        });
    };
    /**
     * Toggles the visibility of the user list.
     */
    WorkspaceComponent.prototype.toggleList = function () {
        this.isListHidden = !this.isListHidden;
    };
    /**
     * Toggles the visibility of the contacts list.
     */
    WorkspaceComponent.prototype.toggleContacts = function () {
        this.isContactHidden = !this.isContactHidden;
    };
    /**
     * Opens the dialog to create a new channel.
     */
    WorkspaceComponent.prototype.openCreateChannelDialog = function () {
        var currentUser = this.loginService.getUser();
        if (currentUser) {
            this.dialog.open(create_channel_component_1.CreateChannelComponent);
        }
    };
    /**
     * Unsubscribes from the user subscription when the component is destroyed.
     */
    WorkspaceComponent.prototype.ngOnDestroy = function () {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    };
    /**
     * Selects a user and updates global variables for the workspace.
     * @param user - The selected user.
     */
    WorkspaceComponent.prototype.selectUser = function (user) {
        this.userService.selectedUser = user;
        this.globalVariable.openChannelChat = false;
        this.globalVariable.openThread = false;
        this.globalVariable.openDM = true;
        this.globalVariable.openNewMessage = false;
        this.closeWorkspace();
    };
    /**
     * Opens a channel and updates global variables for the workspace.
     * @param channel - The selected channel.
     */
    WorkspaceComponent.prototype.openChannel = function (channel) {
        var _this = this;
        this.channelService.selectedChannel = channel;
        this.channelService.formattedDate();
        this.channelService.getChannelUsers(channel.id).subscribe(function (users) {
            _this.channelService.selectedChannel.users = users;
        });
        this.globalVariable.openDM = false;
        this.globalVariable.openThread = false;
        this.globalVariable.openChannelChat = true;
        this.globalVariable.openNewMessage = false;
        this.closeWorkspace();
    };
    /**
     * Opens the view for creating a new message.
     */
    WorkspaceComponent.prototype.openNewMessage = function () {
        this.globalVariable.openChannelChat = false;
        this.globalVariable.openThread = false;
        this.globalVariable.openDM = false;
        this.globalVariable.openNewMessage = true;
        this.closeWorkspace();
    };
    /**
     * Closes the workspace if the window width is less than or equal to 1000 pixels.
     */
    WorkspaceComponent.prototype.closeWorkspace = function () {
        if (window.innerWidth <= 1000) {
            this.globalVariable.openWorkspace = false;
        }
    };
    WorkspaceComponent = __decorate([
        core_1.Component({
            selector: 'app-workspace',
            templateUrl: './workspace.component.html',
            styleUrls: ['./workspace.component.scss']
        })
    ], WorkspaceComponent);
    return WorkspaceComponent;
}());
exports.WorkspaceComponent = WorkspaceComponent;
