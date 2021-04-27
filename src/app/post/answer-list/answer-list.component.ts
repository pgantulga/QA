import { LogService } from './../../services/log-service.service';
import {Component, Input} from '@angular/core';
import {VoteService} from '../../services/vote.service';
import {AuthService} from '../../services/auth.service';
import {AnswerService} from '../../services/answer.service';
import {Observable} from 'rxjs';
import {PermissionService} from '../../services/permission.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {LayoutService} from '../../services/layout.service';

@Component({
    selector: 'answer-list',
    templateUrl: './answer-list.component.html',
    styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent {
    @Input() answer: any;
    showReply: boolean;
    showReplies: boolean;
    toggleIcon: string;
    replies$: Observable<any>;
    deleter: any;

    constructor(public authService: AuthService,
                private answerService: AnswerService,
                public permissionService: PermissionService,
                private dialog: MatDialog,
                private snack: MatSnackBar,
                private layoutService: LayoutService,
                ) {
        this.deleter = this.answerService.deleteAnswer;
        this.showReply = false;
        this.showReplies = false;
        this.toggleIcon = 'keyboard_arrow_down';
    }

    showRepliesToggle() {
        this.showReplies = !this.showReplies;
        this.replies$ = (this.showReplies) ? this.answerService.getReplies(this.answer) : null;
        this.toggleIcon = this.iconChange(this.showReplies);
    }

    reply() {
        this.showReply = !this.showReply;
    }
    edit() {

    }
    delete() {
        return this.dialog.open(DialogComponent, {
            data: {
                title: 'Хариулт устгах',
                content: 'Та энэ хариултыг устгахдаа итгэлтэй байнаа уу?'
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                return this.answerService.deleteAnswer(this.answer)
                    .then(() => {

                        return this.snack.openFromComponent(SnackComponent, {data: 'Хариулт устгагдлаа'});
                    });
            }
        });
    }


    iconChange(showReplies) {
        return showReplies ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }
}
