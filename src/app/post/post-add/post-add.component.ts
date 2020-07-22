import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackComponent} from "../../shared/components/snack/snack.component";

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
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  postForm: FormGroup;
  author: any;
  config: any;

  constructor(private formBuilder: FormBuilder,
              public postService: PostService,
              public authService: AuthService,
              public router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
      this.authService.user$.subscribe(user => {
          this.author = user;
      })
  }
  ngOnInit(): void {
      this.config = config;
      this.postForm = this.formBuilder.group({
          editor: '',
          title: '',
      });
  }

  createPost() {
      return this.postService.createPost( {
          title: this.postForm.get('title').value,
          content: this.postForm.get('editor').value,
      }, this.author)

  }
    //add tag
  onSubmit() {
      const dialogRef = this.dialog.open(DialogComponent, {
          data: {
              title: 'Асуултыг нэмэх',
              content: ' Таны асуултыг системд нэмэх гэж байна',
          }
      });
      dialogRef.afterClosed().subscribe( result => {
          if (result) this.createPost()
              .then(() => {
                    this.snackBar.openFromComponent(SnackComponent, {
                        data: 'Шинэ асуулт нэмэгдлээ.',
                    });
                    return this.router.navigate(['/home']);
              })
      })
  }
  cancel() {

  }


}
