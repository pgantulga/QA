import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColorService} from '../../services/color.service';
import {AdminCategoryAddComponent} from '../../admin/admin-category-add/admin-category-add.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {MatDialog} from '@angular/material/dialog';
import {TagService} from '../../services/tag.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from "../../services/auth.service";
import {PermissionService} from "../../services/permission.service";

@Component({
    selector: 'tag-category-list',
    templateUrl: './tag-category-list.component.html',
    styleUrls: ['./tag-category-list.component.scss']
})
export class TagCategoryListComponent {
    @Input() item: any;
    @Input() color: any;
    @Output() select = new EventEmitter<boolean>();
    selected: boolean;

    image: any;
    style: any;
    constructor(private colorService: ColorService,
                private dialog: MatDialog,
                private tagService: TagService,
                private snack: MatSnackBar,
                private sanitization: DomSanitizer,
                public authService: AuthService,
                public permissionService: PermissionService) {
        this.selected = false;
        if (this.item) {
            this.style = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0,0, 0, 0.73)),url(${this.item.image})`);
        }
    }

    edit() {
        return this.dialog.open(AdminCategoryAddComponent, {
            width: '500px',
            data: {
                name: this.item.name,
                description: this.item.description,
                tags: this.item.tags
            },
        }).afterClosed().subscribe(res => {
            if (res) {
                this.tagService.updateTagCategory(res, this.item)
                    .then(() => {
                        this.snack.openFromComponent(SnackComponent, {data: 'Category saved'});
                    });
            }
        });
    }
    selectCard() {
        this.selected = !this.selected;
        this.select.emit(this.selected);
    }

}
