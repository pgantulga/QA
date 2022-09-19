"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsHeaderComponent = void 0;
const core_1 = require("@angular/core");
const tag_add_component_1 = require("../tag-add/tag-add.component");
let TagsHeaderComponent = class TagsHeaderComponent {
    constructor(authService, permissionService, tagService, dialog) {
        this.authService = authService;
        this.permissionService = permissionService;
        this.tagService = tagService;
        this.dialog = dialog;
    }
    ngOnInit() {
        this.metaData$ = this.tagService.getMeta();
    }
    openDialog(user) {
        const dialogRef = this.dialog.open(tag_add_component_1.TagAddComponent, {
            width: '500px',
            data: {
                name: this.name,
                description: this.description
            }
        });
        dialogRef.afterClosed()
            .subscribe(result => {
            if (result) {
                this.tagService.recommendTag(result, user);
            }
        });
    }
};
TagsHeaderComponent = __decorate([
    core_1.Component({
        selector: 'tags-header',
        templateUrl: './tags-header.component.html',
        styleUrls: ['./tags-header.component.scss']
    })
], TagsHeaderComponent);
exports.TagsHeaderComponent = TagsHeaderComponent;
//# sourceMappingURL=tags-header.component.js.map