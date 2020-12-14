import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnswerService} from '../../services/answer.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {config} from '../../shared/quill-config';

@Component({
  selector: 'answer-add',
  templateUrl: './answer-add.component.html',
  styleUrls: ['./answer-add.component.css']
})
export class AnswerAddComponent {
  @Input() user: any;
  @Input() post: any;
  config: any;
  answerForm: FormGroup;
  constructor(public answerService: AnswerService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router
  ) {
    this.config = config;
    this.answerForm = this.formBuilder.group({
      editor: '',
    });
  }
  addAnswer() {
    console.log(this.post, this.user);
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
              this.snackBar.openFromComponent(SnackComponent, {

                data: 'Таны хариулт нэмэгдлээ.',
              });
              // return this.router.navigate(['/home']);
            });
      }
    });
  }


}
