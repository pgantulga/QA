"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnackComponent = void 0;
const core_1 = require("@angular/core");
const snack_bar_1 = require("@angular/material/snack-bar");
let SnackComponent = class SnackComponent {
    constructor(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
};
SnackComponent = __decorate([
    core_1.Component({
        selector: 'snack',
        templateUrl: './snack.component.html',
        styleUrls: ['./snack.component.scss']
    }),
    __param(1, core_1.Inject(snack_bar_1.MAT_SNACK_BAR_DATA))
], SnackComponent);
exports.SnackComponent = SnackComponent;
//# sourceMappingURL=snack.component.js.map