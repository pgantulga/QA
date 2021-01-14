import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AnswerService} from '../../services/answer.service';
import {PermissionService} from '../../services/permission.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {LayoutService} from '../../services/layout.service';

@Component({
    selector: 'reply-list',
    templateUrl: './reply-list.component.html',
    styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {
    @Input() item: any;

    constructor(public authService: AuthService,
                private answerService: AnswerService,
                public permissionService: PermissionService,
                private dialog: MatDialog,
                private snack: MatSnackBar,
                private layoutService: LayoutService
    ) {
    }

    ngOnInit(): void {
    }

    deleteReply(): any {
        return this.dialog.open(DialogComponent, {
            data: {
                title: 'Хариултыг устгах',
                content: 'Хариултыг устгахдаа итгэлтэй байна уу?'
            },
        })
            .afterClosed().subscribe(res => {
                if (res) {
                    return this.answerService.deleteReply(this.item)
                        .then(() => {
                            return this.snack.openFromComponent(SnackComponent, {
                                data: {
                                    title: 'Хариултыг устгах',
                                    content: 'Хариултыг устгахдаа итгэлтэй байна уу?'
                                },
                            });
                        });
                }
            });
        // this.layoutService.deleteConfirmation(
        //     {
        //       title: 'Хариултыг устгах',
        //       content: 'Хариултыг устгахдаа итгэлтэй байна уу?'
        //     },
        //     'Хариулт устгагдлаа',
        //     this.answerService.deleteReply, this.item);
    }
}
