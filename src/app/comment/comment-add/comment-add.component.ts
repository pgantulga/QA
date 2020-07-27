import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
const config = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],                                         // remove formatting button
    ['link', 'image']                         // link and image, video
  ]
};

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
    return this.commentService.addComment( this.postId, {
      content: this.commentForm.get('editor').value,
    }, this.user);
  }
  submit() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Хариулт нэмэх',
        content: ' Таны хариултыг нэмэх гэж байна',
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
