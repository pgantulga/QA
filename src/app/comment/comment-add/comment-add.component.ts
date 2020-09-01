import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {config} from '../../shared/quill-config';

@Component({
  selector: 'comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent  {
  @Input() user: any;
  @Input() postId: any;
  config: any;
  commentForm: FormGroup;
  constructor(public commentService: CommentService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router
              ) {
    this.config = config;
    this.commentForm = this.formBuilder.group({
      editor: '',
    });
  }
  addComment() {
    console.log(this.postId, this.user);
    return this.commentService.addComment( this.postId, {
      content: this.commentForm.get('editor').value,
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
        this.addComment()
            .then(() => {
              this.snackBar.openFromComponent(SnackComponent, {
                data: 'Шинэ асуулт нэмэгдлээ.',
              });
              // return this.router.navigate(['/home']);
            });
      }
    });
  }

}
