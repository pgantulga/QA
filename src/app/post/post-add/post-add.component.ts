import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { TagService } from '../../services/tag.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { config } from '../../shared/quill-config';
import { switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { PermissionService } from 'src/app/services/permission.service';

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
    isSecret: boolean;
    post$: Observable<any>;
    constructor(
        public postService: PostService,
        public authService: AuthService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        public tagService: TagService,
        public permissionService: PermissionService
    ) {
    }
    ngOnInit(): void {
        this.post$ = this.route.paramMap.pipe(
            switchMap(params => {
                if (params.get('id')) {
                    return this.postService.getPost(params.get('id'))
                }
                else { return EMPTY}
            })
        )
        if (this.post$) {
            this.post$.subscribe((data: any) => {
                if (data) {
                    this.oldValue = data;
                    this.tags = data.tags;
                    this.title.setValue(data.title);
                    this.content.setValue(data.content);
                    this.editing = true;
                    this.isSecret = data.isSecret || false;
                }
            });
        }
        
        this.config = config;
        this.authService.user$.subscribe(user => {
            this.author = user;
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


    createPost() {
        return this.postService.createPost({
            title: this.title.value,
            content: this.content.value,
        }, this.author, this.tags, this.isSecret);
    }
    savePost() {
        return this.postService.savePost({
            title: this.title.value,
            content: this.content.value,
        }, this.author, this.tags, this.oldValue, this.isSecret);
    }

    onSubmit() {
        const dialogData = (!this.editing) ? { title: 'Асуултыг нэмэх', content: ' Таны асуултыг системд нэмэх гэж байна' }
            : { title: 'Сануулах уу', content: 'Таны өөрчлөлтийг сануулах гэж байна' };
        const snackData = (!this.editing) ? 'Шинэ асуулт нэмэгдлээ.' : 'Санагдлаа';
        const dialogRef = this.dialog.open(DialogComponent, { data: dialogData });
        return dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const dialogPromise = (!this.editing) ? this.createPost() : this.savePost();
                dialogPromise
                    .then(() => {
                        this.snackBar.openFromComponent(SnackComponent, { data: snackData });
                        return this.router.navigate(['/home']);
                    });
            }
        });
    }
    cancel(url) {
        const dialogData = {
            title: 'Цуцлах үйлдэл',
            content: ' Таны бичсэн агуулга хадгалагдахгүй.',
        };
        this.dialog.open(DialogComponent, { data: dialogData })
            .afterClosed().subscribe(result => {
                if (result) {
                    this.title.setValue(null);
                    this.content.setValue(null);
                    return this.router.navigate([url]);
                }
            });
    }
}
