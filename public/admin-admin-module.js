(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-module"],{

/***/ "./src/app/admin/admin.component.css":
/*!*******************************************!*\
  !*** ./src/app/admin/admin.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n}\nlabel{color:green}\n.l-container {margin: 20px 10%;}"

/***/ }),

/***/ "./src/app/admin/admin.component.html":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n        <a mat-button routerLink=\"/admin\"><h2>TAS Screening</h2></a>\n        <span class=\"spacer\"></span><span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin\">Register User</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/questions\">Question</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/review\">Review</a>\n    </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"l-container\">\n    <h2>Add Staff</h2>\n    <form (ngSubmit)=\"createUser(f)\" #f=\"ngForm\" class=\"my-form\">\n        <mat-form-field class=\"full-width\">\n            <mat-label>Name</mat-label>\n            <input ngModel name=\"fname\" #fname=\"ngModel\" matInput placeholder=\"First name\" required>\n        </mat-form-field>\n        <mat-form-field class=\"full-width\">\n            <mat-label>Email</mat-label>\n            <input ngModel name=\"email\" #fname=\"ngModel\" matInput placeholder=\"Email\" required>\n        </mat-form-field>\n        <mat-form-field class=\"full-width\">\n            <mat-label>Role</mat-label>\n            <input ngModel name=\"role\" #role=\"ngModel\" matInput placeholder=\"role\" required>\n        </mat-form-field>\n\n        <mat-card-actions>\n            <button mat-raised-button color=\"primary\">SAVE</button>\n            <button mat-icon-button >\n                <mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon>\n            </button>\n            <label>{{msg}}</label>\n        </mat-card-actions>\n    </form>\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n        <!-- Name Column -->\n        <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef> Name </th>\n            <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td>\n        </ng-container>\n\n        <!-- Email Column -->\n        <ng-container matColumnDef=\"email\">\n            <th mat-header-cell *matHeaderCellDef> Email </th>\n            <td mat-cell *matCellDef=\"let element\"> {{element.email}} </td>\n        </ng-container>\n\n        <!-- Status Column -->\n        <ng-container matColumnDef=\"role\">\n            <th mat-header-cell *matHeaderCellDef> Role </th>\n            <td mat-cell *matCellDef=\"let element\"> {{element.role}} </td>\n        </ng-container>\n\n        <!-- Deactivate Column -->\n        <ng-container matColumnDef=\"status\">\n            <th mat-header-cell *matHeaderCellDef> Status </th>\n            <td mat-cell *matCellDef=\"let element\">\n                <mat-slide-toggle></mat-slide-toggle>\n            </td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n</div>"

/***/ }),

/***/ "./src/app/admin/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.service */ "./src/app/admin/user.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminComponent = /** @class */ (function () {
    function AdminComponent(userService, dialog) {
        this.userService = userService;
        this.dialog = dialog;
        this.arr = [];
        this.displayedColumns = ['name', 'email', 'role', 'status'];
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    AdminComponent.prototype.openDialog = function () {
        console.log('tg dialog');
        // this.dialog.open(AddUserComponent);
    };
    AdminComponent.prototype.createUser = function (form) {
        this.arr = form.value;
        this.userService.createUser(this.arr)
            .subscribe(function (resp) { console.log('resp>>', resp); });
        this.msg = "user is saved!";
    };
    AdminComponent.prototype.getUser = function () {
        //console.log('users', this.userService.getUser());
        var _this = this;
        this.userService.getUser()
            .subscribe(function (data) {
            console.log('users data', data);
            _this.dataSource = data;
        }, function (err) { console.log('err', err.message); });
    };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/admin/admin.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin.guard.ts":
/*!**************************************!*\
  !*** ./src/app/admin/admin.guard.ts ***!
  \**************************************/
/*! exports provided: AdminGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuard", function() { return AdminGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AdminGuard = /** @class */ (function () {
    function AdminGuard() {
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        return true;
    };
    AdminGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], AdminGuard);
    return AdminGuard;
}());



/***/ }),

/***/ "./src/app/admin/admin.module.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin.module.ts ***!
  \***************************************/
/*! exports provided: ADMIN_ROUTES, AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_ROUTES", function() { return ADMIN_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _admin_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin.guard */ "./src/app/admin/admin.guard.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../material.module */ "./src/app/material.module.ts");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _questions_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./questions.component */ "./src/app/admin/questions.component.ts");
/* harmony import */ var _review_review_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./review/review.component */ "./src/app/admin/review/review.component.ts");
/* harmony import */ var _review_review_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./review/review.service */ "./src/app/admin/review/review.service.ts");
/* harmony import */ var _review_progress_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./review/progress.component */ "./src/app/admin/review/progress.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var ADMIN_ROUTES = [
    { path: '', component: _admin_component__WEBPACK_IMPORTED_MODULE_2__["AdminComponent"], canActivate: [_admin_guard__WEBPACK_IMPORTED_MODULE_3__["AdminGuard"]] },
    { path: 'questions', component: _questions_component__WEBPACK_IMPORTED_MODULE_7__["QuestionsComponent"], canActivate: [_admin_guard__WEBPACK_IMPORTED_MODULE_3__["AdminGuard"]] },
    { path: 'review', component: _review_review_component__WEBPACK_IMPORTED_MODULE_8__["ReviewComponent"], canActivate: [_admin_guard__WEBPACK_IMPORTED_MODULE_3__["AdminGuard"]] },
    { path: 'review/:id', component: _review_progress_component__WEBPACK_IMPORTED_MODULE_10__["ProgressComponent"], canActivate: [_admin_guard__WEBPACK_IMPORTED_MODULE_3__["AdminGuard"]] },
];
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_5__["MyMaterialModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_6__["MatRippleModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_11__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatChipsModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatProgressBarModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(ADMIN_ROUTES)
            ],
            // entryComponents: [AddUserComponent],
            declarations: [_admin_component__WEBPACK_IMPORTED_MODULE_2__["AdminComponent"], _questions_component__WEBPACK_IMPORTED_MODULE_7__["QuestionsComponent"], _review_review_component__WEBPACK_IMPORTED_MODULE_8__["ReviewComponent"], _review_progress_component__WEBPACK_IMPORTED_MODULE_10__["ProgressComponent"]],
            bootstrap: [_admin_component__WEBPACK_IMPORTED_MODULE_2__["AdminComponent"]],
            providers: [_review_review_service__WEBPACK_IMPORTED_MODULE_9__["ReviewService"]]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/admin/question.service.ts":
/*!*******************************************!*\
  !*** ./src/app/admin/question.service.ts ***!
  \*******************************************/
/*! exports provided: QuestionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionService", function() { return QuestionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionService = /** @class */ (function () {
    function QuestionService(http) {
        this.http = http;
        this.domain = 'http://localhost:3000';
    }
    QuestionService.prototype.addQuestion = function (data) {
        console.log('Question service has data-> :' + JSON.stringify(data));
        return this.http.post(this.domain + '/admin/questions/create', data); //, { withCredentials: true });
    };
    QuestionService.prototype.getQuestions = function () {
        //console.log('hi get question service');
        return this.http.get(this.domain + '/admin/questions/all'); //, { withCredentials: true });
    };
    QuestionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], QuestionService);
    return QuestionService;
}());



/***/ }),

/***/ "./src/app/admin/questions.component.html":
/*!************************************************!*\
  !*** ./src/app/admin/questions.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n        <a mat-button routerLink=\"/admin\"><h2>TAS Screening</h2></a>\n        <span class=\"spacer\"></span><span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin\">Register User</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/questions\">Question</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/review\">Review</a>\n    </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"l-container\">\n    <h2>Add Question</h2>\n    <form (ngSubmit)=\"addQuestion(f)\" #f=\"ngForm\" class=\"my-form\">\n        <mat-form-field class=\"full-width the-question\">\n            <mat-label>Question</mat-label>\n            <input ngModel name=\"question\" #question=\"ngModel\" matInput placeholder=\"Question\" required>\n        </mat-form-field>\n        <mat-form-field class=\"full-width the-qn-status\">\n            <mat-label>Status</mat-label>\n\n            <input ngModel name=\"active\" #active=\"ngModel\" matInput placeholder=\"Email\" required>\n            <!-- <mat-slide-toggle value='true'></mat-slide-toggle>-->\n        </mat-form-field>\n        <mat-card-actions>\n            <button mat-raised-button color=\"primary\">SAVE</button>\n            <label>{{msg}}</label>\n        </mat-card-actions>\n    </form>\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n        <!-- Name Column -->\n        <ng-container matColumnDef=\"question\">\n            <th mat-header-cell *matHeaderCellDef> Question </th>\n            <td mat-cell *matCellDef=\"let element\"> {{element.question}} </td>\n        </ng-container>\n        <!-- active Column -->\n        <ng-container matColumnDef=\"active\">\n            <th mat-header-cell *matHeaderCellDef> Status </th>\n            <td mat-cell *matCellDef=\"let element\">\n                <mat-slide-toggle></mat-slide-toggle>\n            </td>\n        </ng-container>\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n\n    </table>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/questions.component.ts":
/*!**********************************************!*\
  !*** ./src/app/admin/questions.component.ts ***!
  \**********************************************/
/*! exports provided: QuestionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionsComponent", function() { return QuestionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _question_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question.service */ "./src/app/admin/question.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(questionService) {
        this.questionService = questionService;
        this.arr = [];
        this.dataSource = [];
        this.displayedColumns = ['question', 'active'];
    }
    QuestionsComponent.prototype.ngOnInit = function () {
        this.getAllQuestions();
    };
    QuestionsComponent.prototype.addQuestion = function (form) {
        this.arr = form.value;
        console.log('value', JSON.stringify(form.value));
        this.questionService.addQuestion(this.arr).subscribe(function (resp) { return console.log('resp>>', resp); });
        this.msg = '  Question is saved!';
    };
    QuestionsComponent.prototype.getAllQuestions = function () {
        var _this = this;
        this.questionService.getQuestions()
            .subscribe(function (data) {
            _this.dataSource = data;
        });
    };
    QuestionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-question',
            template: __webpack_require__(/*! ./questions.component.html */ "./src/app/admin/questions.component.html"),
            styles: ["\n    table {width: 100%;} label{color:green} .l-container {margin: 20px 10%;}\n    .the-question {width: 80%;}\n    .the-qn-status {width: 10%;}\n  "]
        }),
        __metadata("design:paramtypes", [_question_service__WEBPACK_IMPORTED_MODULE_1__["QuestionService"]])
    ], QuestionsComponent);
    return QuestionsComponent;
}());



/***/ }),

/***/ "./src/app/admin/review/progress.component.css":
/*!*****************************************************!*\
  !*** ./src/app/admin/review/progress.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".center-content{\n    display: flex;\n    align-items: center;\n}\n.code-input {\n    width: 100%;\n    background: url(http://i.imgur.com/2cOaJ.png);\n    background-attachment: local;\n    background-repeat: no-repeat;\n    padding-left: 35px;\n    padding-top: 10px;\n    font-family: monospace;\n    box-sizing: border-box;\n    color: #982b2b !important;\n    border: 1px solid gray !important;\n    height: 450px !important;\n}\n.qn-answer {\n    margin: 20px 10%;\n}\n.fab-container {\n    display: inline;\n    box-sizing: border-box;\n    overflow: auto;\n    position: fixed;\n    bottom: 30px;\n    padding: 10px;\n}\n.fab-container.right {\n    right: 30px;\n}\n.fab-container.left {\n    left: 30px;\n}\n.fab-container .with-time{\n    font-size: 14px;\n}\n.fab-container button {\n    display: block;\n    margin-top: 10px;\n}\n.user-info {\n    margin: 10px 0 30px;\n}"

/***/ }),

/***/ "./src/app/admin/review/progress.component.html":
/*!******************************************************!*\
  !*** ./src/app/admin/review/progress.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n        <a mat-button routerLink=\"/admin\"><h2>TAS Screening</h2></a>\n        <span class=\"spacer\"></span><span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin\">Register User</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/questions\">Question</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/review\">Review</a>\n    </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"qn-answer\">\n    {{currentQuestion.question}}\n    <div class=\"container\" fxLayout=\"row\" fxLayoutGap=\"20px\" fxLayoutAlign=\"center\">\n        <button mat-icon-button color=\"primary\" (click)=\"goToQuestion(numCurrQuestion-1)\">\n            <mat-icon aria-label=\"Example icon-button with a heart icon\">arrow_back_ios</mat-icon>\n        </button>\n        <span class=\"spacer\"></span>\n        <span class=\"center-content\">\n            <mat-chip color=\"primary\">{{numCurrQuestion}} / {{numQuestions}}</mat-chip>\n        </span>\n        <span class=\"spacer\"></span>\n        <button mat-icon-button color=\"primary\" (click)=\"goToQuestion(numCurrQuestion+1)\">\n            <mat-icon aria-label=\"Example icon-button with a heart icon\">arrow_forward_ios</mat-icon>\n        </button>\n    </div>\n    <div class=\"container\" fxLayout=\"row\" fxLayoutGap=\"20px\" fxLayoutAlign=\"center\">\n        <button mat-icon-button color=\"primary\" (click)=\"goToSnapshot(numCurrSnapshot-1)\">\n            <mat-icon aria-label=\"Example icon-button with a heart icon\">arrow_back_ios</mat-icon>\n        </button>\n        <span class=\"spacer\"></span>\n        <span class=\"center-content\">\n            <mat-chip color=\"primary\">{{numCurrSnapshot}} / {{numProgresses}}</mat-chip>\n        </span>\n        <span class=\"spacer\"></span>\n        <button mat-icon-button color=\"primary\" (click)=\"goToSnapshot(numCurrSnapshot+1)\">\n            <mat-icon aria-label=\"Example icon-button with a heart icon\">arrow_forward_ios</mat-icon>\n        </button>\n    </div>\n    <mat-progress-bar mode=\"indeterminate\" *ngIf=\"show_loader\"></mat-progress-bar>\n    <div class=\"container\" fxLayout=\"row\" fxLayoutGap=\"20px\" fxLayoutAlign=\"center\">\n        <textarea matInput class=\"code-input\" rows=\"35\" [disabled]=\"true\">{{currentSnapshot.text}}</textarea>\n    </div>\n    <div fxLayout=\"row\" fxLayoutAlign=\"center\" class=\"user-info\">\n        <mat-chip-list>\n            <mat-chip color=\"primary\" selected>\n                <mat-icon>person</mat-icon>\n                {{reviewData.name}}\n            </mat-chip>\n            <mat-chip color=\"accent\" selected>\n                <mat-icon>email</mat-icon>\n                {{reviewData.email}}\n            </mat-chip>\n            <mat-chip color=\"warn\" selected>\n                <mat-icon>timer</mat-icon>\n                {{reviewData.time_used}}\n            </mat-chip>\n        </mat-chip-list>\n    </div>\n</div>\n<div class=\"fab-container right\">\n    <button mat-fab color=\"primary\" (click)=\"setPass(true)\"><mat-icon>check</mat-icon></button>\n    <button mat-fab color=\"warn\" (click)=\"setPass(false)\"><mat-icon>close</mat-icon></button>\n</div>\n<div class=\"fab-container left\">\n    <button mat-fab color=\"primary\">{{numCurrQuestion}}</button>\n    <button mat-fab color=\"primary\"><mat-icon class=\"with-time\">timer</mat-icon>{{currentQuestion.duration}}</button>\n</div>"

/***/ }),

/***/ "./src/app/admin/review/progress.component.ts":
/*!****************************************************!*\
  !*** ./src/app/admin/review/progress.component.ts ***!
  \****************************************************/
/*! exports provided: ProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressComponent", function() { return ProgressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _review_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./review.service */ "./src/app/admin/review/review.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProgressComponent = /** @class */ (function () {
    function ProgressComponent(service, route, snackBar, router) {
        var _this = this;
        this.service = service;
        this.route = route;
        this.snackBar = snackBar;
        this.router = router;
        this.show_loader = false;
        this.reviewData = {
            _id: '',
            email: '',
            name: '',
            started_at: '',
            submitted_at: '',
            questions: []
        };
        this.numQuestions = 0;
        this.numProgresses = 0;
        this.numCurrSnapshot = 0;
        this.numCurrQuestion = 0;
        this.currentQuestion = { question: '', progress: [] };
        this.currentSnapshot = { text: '' };
        this.route.params.subscribe(function (params) {
            _this.invitationId = params['id'];
        });
    }
    ProgressComponent.prototype.openSnackBar = function () {
        var config = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBarConfig"]();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';
        config.duration = 2000;
        //config.extraClasses = this.addExtraClass ? ['test'] : undefined;
        this.snackBar.open('Review successful !', 'OK', config);
    };
    ProgressComponent.prototype.ngOnInit = function () {
        this.loadSubmission();
    };
    ProgressComponent.prototype.goToQuestion = function (n) {
        var index = n - 1;
        if (index >= 0 && index < this.numQuestions) {
            this.numCurrQuestion = n;
            this.currentQuestion = this.reviewData.questions[index];
            this.numProgresses = this.currentQuestion.progress.length;
            if (this.currentQuestion.progress && this.numProgresses > 0) {
                this.numCurrSnapshot = this.numProgresses;
                this.currentSnapshot = this.currentQuestion.progress[this.numCurrSnapshot - 1];
            }
        }
    };
    ProgressComponent.prototype.goToSnapshot = function (n) {
        var index = n - 1;
        if (index >= 0 && index < this.currentQuestion.progress.length) {
            this.numCurrSnapshot = n;
            this.currentSnapshot = this.currentQuestion.progress[index];
        }
    };
    ProgressComponent.prototype.loadSubmission = function () {
        var _this = this;
        console.log("getSub>>", this.invitationId);
        this.show_loader = true;
        this.service.getSubmission(this.invitationId)
            .subscribe(function (data) {
            console.log('db>> ', data.questions);
            _this.show_loader = false;
            _this.reviewData = data;
            if (data.questions && data.questions.length > 0) {
                _this.numCurrQuestion = 1;
                _this.numQuestions = data.questions.length;
                _this.currentQuestion = data.questions[0];
                if (_this.currentQuestion.progress && _this.currentQuestion.progress.length > 0) {
                    _this.numProgresses = _this.currentQuestion.progress.length;
                    _this.numCurrSnapshot = _this.numProgresses;
                    _this.currentSnapshot = _this.currentQuestion.progress[_this.numCurrSnapshot - 1];
                }
            }
        });
    };
    ProgressComponent.prototype.setPass = function (pass) {
        var _this = this;
        this.show_loader = true;
        this.service.setPass(this.invitationId, pass)
            .subscribe(function (info) {
            //this.show_loader = false;
            _this.openSnackBar();
            setTimeout(function () {
                _this.router.navigate(['/admin/review']);
            }, 1500);
        });
    };
    ProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-progress',
            template: __webpack_require__(/*! ./progress.component.html */ "./src/app/admin/review/progress.component.html"),
            styles: [__webpack_require__(/*! ./progress.component.css */ "./src/app/admin/review/progress.component.css")],
        }),
        __metadata("design:paramtypes", [_review_service__WEBPACK_IMPORTED_MODULE_1__["ReviewService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./src/app/admin/review/review.component.css":
/*!***************************************************!*\
  !*** ./src/app/admin/review/review.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".review_row{\n    cursor: pointer;\n    user-select: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n\n    -webkit-user-drag: none;\n    -webkit-tap-highlight-color: transparent;\n}\n.mat-table {\n    width: 100%;\n}\n.l-container {\n    margin: 20px 10%;\n}"

/***/ }),

/***/ "./src/app/admin/review/review.component.html":
/*!****************************************************!*\
  !*** ./src/app/admin/review/review.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n        <a mat-button routerLink=\"/admin\"><h2>TAS Screening</h2></a>\n        <span class=\"spacer\"></span><span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin\">Register User</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/questions\">Question</a>\n        <span class=\"spacer\"></span>\n        <a mat-button routerLink=\"/admin/review\">Review</a>\n    </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"l-container\">\n    <mat-card-content>\n        <table mat-table [dataSource]=\"reviewList\" class=\"mat-elevation-z8\">\n        \n            <ng-container matColumnDef=\"email\">\n                <th mat-header-cell *matHeaderCellDef> Email </th>\n                <td mat-cell *matCellDef=\"let element\"> {{element.email}} </td>\n            </ng-container>\n            \n            <ng-container matColumnDef=\"started_at\">\n                <th mat-header-cell *matHeaderCellDef> Started </th>\n                <td mat-cell *matCellDef=\"let element\"> {{element.started_at}} </td>\n            </ng-container>\n            \n            <ng-container matColumnDef=\"submitted_at\">\n                <th mat-header-cell *matHeaderCellDef> Submitted </th>\n                <td mat-cell *matCellDef=\"let element\"> {{element.submitted_at}} </td>\n            </ng-container>\n        \n            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n            <tr \n                matRipple\n                [matRippleCentered]=\"false\"\n                [matRippleDisabled]=\"false\"\n                [matRippleUnbounded]=\"true\"\n                mat-row *matRowDef=\"let row; columns: displayedColumns;\" \n                class=\"review_row\" \n                (click)=\"loadSubmission(row)\">\n            </tr>\n        </table>\n    </mat-card-content>\n</div>"

/***/ }),

/***/ "./src/app/admin/review/review.component.ts":
/*!**************************************************!*\
  !*** ./src/app/admin/review/review.component.ts ***!
  \**************************************************/
/*! exports provided: ReviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewComponent", function() { return ReviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _review_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./review.service */ "./src/app/admin/review/review.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReviewComponent = /** @class */ (function () {
    function ReviewComponent(service, router) {
        this.service = service;
        this.router = router;
        this.reviewList = [];
        this.displayedColumns = ['email', 'started_at', 'submitted_at'];
    }
    ReviewComponent.prototype.ngOnInit = function () {
        this.loadAllSubmission();
    };
    ReviewComponent.prototype.loadSubmission = function (submission) {
        console.log("row>>", submission);
        this.router.navigate(['/admin/review/' + submission._id]);
    };
    ReviewComponent.prototype.loadAllSubmission = function () {
        var _this = this;
        this.service.getSubmissions()
            .subscribe(function (data) {
            console.log('db>> ', data);
            _this.reviewList = data;
        });
    };
    ReviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-review',
            template: __webpack_require__(/*! ./review.component.html */ "./src/app/admin/review/review.component.html"),
            styles: [__webpack_require__(/*! ./review.component.css */ "./src/app/admin/review/review.component.css")]
        }),
        __metadata("design:paramtypes", [_review_service__WEBPACK_IMPORTED_MODULE_1__["ReviewService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ReviewComponent);
    return ReviewComponent;
}());



/***/ }),

/***/ "./src/app/admin/review/review.service.ts":
/*!************************************************!*\
  !*** ./src/app/admin/review/review.service.ts ***!
  \************************************************/
/*! exports provided: ReviewService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewService", function() { return ReviewService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReviewService = /** @class */ (function () {
    function ReviewService(http) {
        this.http = http;
        this.domain = 'http://localhost:3000';
    }
    ReviewService.prototype.getSubmissions = function () {
        return this.http.get(this.domain + '/admin/submissions'); //, { withCredentials: true });
    };
    ReviewService.prototype.getSubmission = function (invitatation_id) {
        return this.http.get(this.domain + '/admin/submissions/' + invitatation_id); //, { withCredentials: true });
    };
    ReviewService.prototype.setPass = function (invitatation_id, pass) {
        return this.http.post(this.domain + '/admin/submissions/' + invitatation_id, { pass: pass });
    };
    ReviewService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ReviewService);
    return ReviewService;
}());



/***/ }),

/***/ "./src/app/admin/user.service.ts":
/*!***************************************!*\
  !*** ./src/app/admin/user.service.ts ***!
  \***************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.domain = 'http://localhost:3000';
    }
    UserService.prototype.createUser = function (data) {
        console.log('service has data-> :' + JSON.stringify(data));
        return this.http.post(this.domain + '/admin/user/create', data); //, { withCredentials: true });
    };
    UserService.prototype.getUser = function () {
        return this.http.get(this.domain + '/admin/user'); //, { withCredentials: true });
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MyMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyMaterialModule", function() { return MyMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MyMaterialModule = /** @class */ (function () {
    function MyMaterialModule() {
    }
    MyMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],],
            exports: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatGridListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],],
        })
    ], MyMaterialModule);
    return MyMaterialModule;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-module.js.map