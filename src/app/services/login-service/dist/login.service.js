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
exports.LoginService = void 0;
var core_1 = require("@angular/core");
var auth_1 = require("@angular/fire/auth");
var rxjs_1 = require("rxjs");
var firestore_1 = require("@angular/fire/firestore");
var user_class_1 = require("src/app/modules/user.class");
var LoginService = /** @class */ (function () {
    function LoginService(auth, router, firestore) {
        this.auth = auth;
        this.router = router;
        this.firestore = firestore;
        this.currentUser$ = auth_1.authState(this.auth);
    }
    LoginService.prototype.login = function (email, password) {
        var _this = this;
        return rxjs_1.from(auth_1.signInWithEmailAndPassword(this.auth, email, password)).pipe(rxjs_1.switchMap(function (_a) {
            var user = _a.user;
            _this.setCurrentUser(user);
            return rxjs_1.from(_this.updateUserInFirestore(user.uid, { isOnline: true }));
        }));
    };
    LoginService.prototype.signUp = function (name, email, password, avatarUrl) {
        var _this = this;
        if (avatarUrl === void 0) { avatarUrl = './assets/img/avatar/avatar0.png'; }
        return rxjs_1.from(auth_1.createUserWithEmailAndPassword(this.auth, email, password)).pipe(rxjs_1.switchMap(function (_a) {
            var user = _a.user;
            var usersRef = firestore_1.collection(_this.firestore, 'users');
            return rxjs_1.from(firestore_1.addDoc(usersRef, {
                uid: user.uid,
                name: name,
                email: email,
                avatarUrl: avatarUrl
            })).pipe(rxjs_1.switchMap(function () {
                return auth_1.updateProfile(user, { displayName: name, photoURL: avatarUrl });
            }));
        }));
    };
    LoginService.prototype.setCurrentUser = function (user) {
        this.currentUser = new user_class_1.User({
            uid: user.uid,
            name: user.displayName || '',
            email: user.email,
            avatarUrl: user.photoURL || '',
            isOnline: true
        });
    };
    LoginService.prototype.getCurrentUser = function () {
        var _this = this;
        this.currentUser$.subscribe(function (user) {
            if (user) {
                _this.setCurrentUser(user);
                _this.updateUserInFirestore(user.uid, { isOnline: true });
            }
        });
    };
    LoginService.prototype.getUser = function () {
        return this.currentUser;
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        if (this.currentUser) {
            this.updateUserInFirestore(this.currentUser.uid, {
                isOnline: false
            }).then(function () {
                return rxjs_1.from(_this.auth.signOut());
            });
        }
    };
    LoginService.prototype.googleSignIn = function () {
        var _this = this;
        var auth = auth_1.getAuth();
        var provider = new auth_1.GoogleAuthProvider();
        auth_1.signInWithPopup(auth, provider)
            .then(function (result) {
            var user = result.user;
            _this.router.navigate(['mainpage']);
        })["catch"](function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };
    LoginService.prototype.updateUserProfile = function (data) {
        var user = this.auth.currentUser;
        if (user) {
            return auth_1.updateProfile(user, data);
        }
        else {
            return Promise.reject(new Error('Benutzer nicht gefunden'));
        }
    };
    LoginService.prototype.sendPasswordResetEmail = function (email) {
        var resetLink = "https://dschabrail-isaev.developerakademie.net/dabubble?email=" + email;
        return auth_1.sendPasswordResetEmail(this.auth, email, {
            url: resetLink,
            handleCodeInApp: true
        });
    };
    LoginService.prototype.updateUserInFirestore = function (uid, data) {
        return __awaiter(this, void 0, Promise, function () {
            var usersRef, q, querySnapshot, userDocRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRef = firestore_1.collection(this.firestore, 'users');
                        q = firestore_1.query(usersRef, firestore_1.where('uid', '==', uid));
                        return [4 /*yield*/, firestore_1.getDocs(q)];
                    case 1:
                        querySnapshot = _a.sent();
                        if (!!querySnapshot.empty) return [3 /*break*/, 3];
                        userDocRef = querySnapshot.docs[0].ref;
                        return [4 /*yield*/, firestore_1.updateDoc(userDocRef, data)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Benutzerdokument nicht gefunden:', uid);
                        throw new Error('Benutzerdokument nicht gefunden');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginService.prototype.isGuestUser = function () {
        return this.currentUser ? this.currentUser.uid === '9h3DuXdZ6Ibbrowkvsn7DwBG2PT2' : false;
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
