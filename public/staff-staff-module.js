(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["staff-staff-module"],{

/***/ "./src/app/staff/invitations.component.css":
/*!*************************************************!*\
  !*** ./src/app/staff/invitations.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/staff/invitations.component.html":
/*!**************************************************!*\
  !*** ./src/app/staff/invitations.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card-content>\n  <mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n       <span><a href=\"/\">HOME</a></span>\n       <span class=\"spacer\"></span>\n       <a  mat-button  routerLink=\"/logout\">Logout</a>\n    </mat-toolbar-row>\n  </mat-toolbar>\n  \n  <form class=\"my-form\">\n    <div class=\"form-group\">\n      <h2>Invitations</h2>\n      <table class=\"table table-striped\">\n        <tr>\n          <th scope=\"col\"> Name </th>\n          <th scope=\"col\"> Email </th>\n          <th scope=\"col\"> Status </th>\n        </tr>\n        <tr *ngFor=\"let student of studentInfo\">\n          <td>{{ student.name }}</td>\n          <td>{{ student.email }}</td>\n          <td>{{ student.status }}</td>\n        </tr>\n      </table>\n      <mat-card-actions>\n            <button mat-raised-button (click)=\"unhide()\" color=\"primary\">Send New Invitation</button><br/><br/>\n      </mat-card-actions>\n        \n      <mat-card-content>\n        <form #invitation=\"ngForm\" class=\"my-form\">\n          <div *ngIf=\"addApplicant\">\n            <mat-form-field class=\"full-width\">\n              <mat-label>Full Name</mat-label>\n              <input  name=\"newName\" type=\"text\" matInput  placeholder=\"Full Name\"  [(ngModel)] = \"newName\"  class=\"form-control\" required>\n            </mat-form-field>\n            <mat-form-field class=\"full-width\">\n              <mat-label>Email</mat-label>\n              <input  name=\"newEmail\" type=\"email\" matInput  placeholder=\"Email\"  [(ngModel)] = \"newEmail\"  class=\"form-control\" required>\n            </mat-form-field>\n            <mat-card-actions>\n              <button mat-raised-button [disabled]=\"invitation.form.invalid\" (click)=\"send()\" color=\"primary\">Send</button>\n            </mat-card-actions>\n          </div>\n        </form> \n      </mat-card-content>\n    </div>\n  </form>\n</mat-card-content>\n"

/***/ }),

/***/ "./src/app/staff/invitations.component.ts":
/*!************************************************!*\
  !*** ./src/app/staff/invitations.component.ts ***!
  \************************************************/
/*! exports provided: InvitationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvitationsComponent", function() { return InvitationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _invitations_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invitations.service */ "./src/app/staff/invitations.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InvitationsComponent = /** @class */ (function () {
    function InvitationsComponent(invitationsService) {
        this.invitationsService = invitationsService;
        this.newName = '';
        this.newEmail = '';
        this.newStatus = 'Pending';
        this.addApplicant = false;
        this.studentInfo = invitationsService.retrieveInfo();
        this.studentInfo = invitationsService.getStudentInfo();
    }
    InvitationsComponent.prototype.ngOnInit = function () {
        this.subscription = this.invitationsService.retrieveInfo()
            .subscribe(function (data) {
            console.log(data);
        });
    };
    InvitationsComponent.prototype.unhide = function () { this.addApplicant = !this.addApplicant; };
    InvitationsComponent.prototype.send = function () {
        var info = { name: this.newName, email: this.newEmail, status: this.newStatus };
        console.log(info);
        this.invitationsService.sendInfo(info)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    InvitationsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    InvitationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'invitations',
            template: __webpack_require__(/*! ./invitations.component.html */ "./src/app/staff/invitations.component.html"),
            styles: [__webpack_require__(/*! ./invitations.component.css */ "./src/app/staff/invitations.component.css")]
        }),
        __metadata("design:paramtypes", [_invitations_service__WEBPACK_IMPORTED_MODULE_1__["InvitationsService"]])
    ], InvitationsComponent);
    return InvitationsComponent;
}());



/***/ }),

/***/ "./src/app/staff/invitations.service.ts":
/*!**********************************************!*\
  !*** ./src/app/staff/invitations.service.ts ***!
  \**********************************************/
/*! exports provided: InvitationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvitationsService", function() { return InvitationsService; });
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


var InvitationsService = /** @class */ (function () {
    function InvitationsService(http) {
        this.http = http;
        this.domain = 'http://localhost:3000';
        //For testing
        this.studentInfo = [
            { name: "Alem Embiale", email: "alemwatch@gmail.com", status: "Sent" },
            { name: "Silas Kaggwa", email: "silas@gmail.com", status: "Sent" },
            { name: "Tigist Tadesse", email: "tigist@gmail.com", status: "Pending" },
        ];
    }
    //untile connected to backend
    InvitationsService.prototype.getStudentInfo = function () {
        return this.studentInfo;
    };
    InvitationsService.prototype.retrieveInfo = function () {
        //console.log("inside retriveInfo");
        return this.http.get(this.domain + '/info/');
    };
    InvitationsService.prototype.sendInfo = function (info) {
        this.studentInfo.push(info);
        return this.http.post(this.domain + '/staff/invite', info);
    };
    InvitationsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], InvitationsService);
    return InvitationsService;
}());



/***/ }),

/***/ "./src/app/staff/staff.module.ts":
/*!***************************************!*\
  !*** ./src/app/staff/staff.module.ts ***!
  \***************************************/
/*! exports provided: STAFF_ROUTES, StaffModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAFF_ROUTES", function() { return STAFF_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffModule", function() { return StaffModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _invitations_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invitations.component */ "./src/app/staff/invitations.component.ts");
/* harmony import */ var _invitations_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./invitations.service */ "./src/app/staff/invitations.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var STAFF_ROUTES = [
    { path: '', component: _invitations_component__WEBPACK_IMPORTED_MODULE_5__["InvitationsComponent"] }
];
var StaffModule = /** @class */ (function () {
    function StaffModule() {
    }
    StaffModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(STAFF_ROUTES),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"]
            ],
            providers: [_invitations_service__WEBPACK_IMPORTED_MODULE_6__["InvitationsService"]],
            declarations: [
                _invitations_component__WEBPACK_IMPORTED_MODULE_5__["InvitationsComponent"]
            ],
            bootstrap: [_invitations_component__WEBPACK_IMPORTED_MODULE_5__["InvitationsComponent"]]
        })
    ], StaffModule);
    return StaffModule;
}());



/***/ })

}]);
//# sourceMappingURL=staff-staff-module.js.map