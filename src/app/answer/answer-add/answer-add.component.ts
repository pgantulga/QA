import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnswerService} from '../../services/answer.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
const config = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],               // custom button values
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
    [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
    [{ direction: 'rtl' }],                         // text direction
    [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    [{ align: [] }],
    ['clean'],                                         // remove formatting button
    ['link', 'image']                         // link and image, video
  ]
};
@Component({
  selector: 'answer-add',
  templateUrl: './answer-add.component.html',
  styleUrls: ['./answer-add.component.css']
})
export class AnswerAddComponent {

  @Input() user: any;
  @Input() postId: any;
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
    console.log(this.postId, this.user);
    return this.answerService.addAnswer( this.postId, {
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
