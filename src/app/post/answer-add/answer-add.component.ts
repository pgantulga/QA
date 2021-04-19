import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnswerService} from '../../services/answer.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {configReply} from '../../shared/quill-config';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'answer-add',
  templateUrl: './answer-add.component.html',
  styleUrls: ['./answer-add.component.scss']
})
export class AnswerAddComponent {
  @Input() user: any;
  @Input() post: any;
  @Input() text: any;
  config: any;
  answerForm: FormGroup;
  constructor(public answerService: AnswerService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router,
              private bottomSheet: MatBottomSheet
  ) {
    this.config = configReply;
    this.answerService.highlightedText$.subscribe( value => {
      this.answerForm.patchValue(
          {
            editor: '<blockquote>' + value + '</blockquote>' + '<br/>' + '<p> </p>'
          }
      );
    });
    this.answerForm = this.formBuilder.group({
      editor: '',
    });
  }
  addAnswer() {
    return this.answerService.addAnswer( this.post, {
      content: this.answerForm.get('editor').value,
    }, this.user);
  }
  submit() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Хариулт нэмэх',
        content: 'Таны хариултыг нэмэх гэж байна',
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.addAnswer()
            .then(() => {
              this.answerForm.patchValue({editor: null}
              );
              this.snackBar.openFromComponent(SnackComponent, {
                data: 'Таны хариулт нэмэгдлээ.',
              });
              this.bottomSheet.dismiss();
              // return this.router.navigate(['/home']);
            });
      }
    });
  }
  clear() {
    this.answerForm = this.formBuilder.group({
      editor: '',
    })
  }


}
