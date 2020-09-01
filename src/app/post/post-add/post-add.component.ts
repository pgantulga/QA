import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import {FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackComponent} from "../../shared/components/snack/snack.component";
import {TagService} from '../../services/tag.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {config} from '../../shared/quill-config';
import {switchMap} from 'rxjs/operators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
    postForm: FormGroup;
    author: any;
    config: any;
    tags: any[] = [];
    content = new FormControl('', [
        Validators.minLength(150)
    ]);
    title = new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
    ]);
    editing = false;
    oldValue: any;

    constructor(private formBuilder: FormBuilder,
                public postService: PostService,
                public authService: AuthService,
                public route: ActivatedRoute,
                public router: Router,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                public tagService: TagService) {
        this.authService.user$.subscribe(user => {
            this.author = user;
        });
        this.route.paramMap.pipe(
            switchMap( params => {
                return params.get('id') ? this.postService.getPost(params.get('id')) : null;
            })
        ).subscribe((data: any) => {
            if (data) {
                console.log(data);
                this.oldValue = data;
                this.title.setValue(data.title);
                this.content.setValue(data.content);
                this.editing = true;
            }
        });
    }

    getTag(tag) {
        this.tags = [];
        tag.forEach(item => {
            this.tags.push(item);
        });
    }

    getErrorMessage() {
        if (this.title.hasError('required')) {
            return 'Гарчиг шаардлагтай';
        }
        return this.title.hasError('length') ? '150 тэмдэгтэд багтаана уу' : '';
    }

    ngOnInit(): void {
        this.config = config;
        this.postForm = this.formBuilder.group({editor: '', title: '',});
    }

    createPost() {
        return this.postService.createPost({
            title: this.title.value,
            content: this.content.value,
        }, this.author, this.tags);
    }
    savePost() {
        return this.postService.savePost ( {
            title: this.title.value,
            content: this.content.value,
        }, this.author, this.tags, this.oldValue);
    }

    onSubmit() {
        if (!this.editing) {
            const dialogRef = this.dialog.open(DialogComponent, {
                data: {
                    title: 'Асуултыг нэмэх',
                    content: ' Таны асуултыг системд нэмэх гэж байна',
                }
            });
            return dialogRef.afterClosed().subscribe( result => {
                if (result) {
                    this.createPost()
                        .then(() => {
                            this.snackBar.openFromComponent(SnackComponent, {
                                data: 'Шинэ асуулт нэмэгдлээ.',
                            });
                            return this.router.navigate(['/home']);
                        });
                }
            });
        }
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: 'Сануулах уу',
                content: 'Таны өөрчлөлтийг сануулах гэж байна'
            }
        });
        return dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.savePost()
                    .then(() => {
                        this.snackBar.openFromComponent(SnackComponent, {
                            data: 'Санагдлаа',
                        })
                        return this.router.navigate(['/home'])
                    })
            }
        })
    }
}
