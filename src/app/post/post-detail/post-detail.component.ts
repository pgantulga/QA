import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {AnswerService} from '../../services/answer.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
    post$: any;
    answers$: any;
    logs$: any;

    // @ViewChild('answer') scrollContainer: ElementRef;
    constructor(public route: ActivatedRoute, private postService: PostService, public authService: AuthService,
                public answerService: AnswerService) {
    }

    ngOnInit(): void {
        // combine observers
        this.post$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.postService.getPost(params.get('id'));
            }));
        this.answers$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.answerService.getAllAnswer(params.get('id'));
            })
        );
        this.logs$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.postService.getLogs(params.get('id'));
            })
        );
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }


}
