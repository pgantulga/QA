import {Component, Input, OnInit} from '@angular/core';
import {ColorService} from '../../services/color.service';
import {AdminCategoryAddComponent} from '../../admin/admin-category-add/admin-category-add.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {MatDialog} from '@angular/material/dialog';
import {TagService} from '../../services/tag.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'tag-category-list',
    templateUrl: './tag-category-list.component.html',
    styleUrls: ['./tag-category-list.component.scss']
})
export class TagCategoryListComponent implements OnInit {
    @Input() item: any;
    @Input() color: any;

    constructor(private colorService: ColorService, private dialog: MatDialog, private tagService: TagService, private snack: MatSnackBar) {
    }

    ngOnInit(): void {

    }
    edit() {
        return this.dialog.open(AdminCategoryAddComponent, {
            width: '500px',
            data: {
                name: this.item.name,
                description: this.item.description,
                tags: this.item.tags
            },
        }).afterClosed().subscribe( res => {
            if (res) {
                this.tagService.updateTagCategory(res, this.item)
                    .then(() => {
                        this.snack.openFromComponent(SnackComponent, {data: 'Category saved'});
                    });
            }
        });
    }

}
