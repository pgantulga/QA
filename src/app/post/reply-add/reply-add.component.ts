import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../../services/answer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {config} from '../../shared/quill-config';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';

@Component({
    selector: 'reply-add',
    templateUrl: './reply-add.component.html',
    styleUrls: ['./reply-add.component.css']
})
export class ReplyAddComponent implements OnInit {
    @Input() post: any;
    @Input() answer: any;
    @Input() user: any;
    config: any;
    replyForm: FormGroup;

    constructor(
        public answerService: AnswerService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
    ) {
        this.config = config;
        this.replyForm = this.formBuilder.group({
            editor: ''
        });
    }
    ngOnInit(): void {
    }
    addReply(): any {
      return this.answerService.addReply(this.post, this.answer, {
        content: this.replyForm.get('editor').value
      }, this.user);
    }
    submit(): void {
        if (!this.replyForm.get('editor').value) {
            this.snackBar.openFromComponent(SnackComponent, {
                data: 'Бичих талбар хоосон байна'
            });
            return null;
        }
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: 'Хариулт нэмэх',
          content: 'Таны хариултыг нэмэх гэж байна',
        }
      });
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.addReply()
              .then(() => {
                this.snackBar.openFromComponent(SnackComponent, {
                  data: 'Таны хариулт хадгалагдлаа.',
                });
                this.replyForm.get('editor').setValue(' ');
              }
              );
        }
      });
    }

}
