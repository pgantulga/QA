import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {VoteService} from '../../services/vote.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'vote-button',
    templateUrl: './vote-button.component.html',
    styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit, OnDestroy {
    @Input() obj: any;
    @Input() type: string;
    isVoted: boolean;
    loading = false;
    user: any;

    constructor(public voteService: VoteService,
                public snackBar: MatSnackBar,
                public authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        this.voteService.findVote(this.obj, this.type).then(data => {
            if (data) {
                data.forEach(doc => {
                    this.isVoted = doc.exists;
                });
            }
        });
    }
    ngOnDestroy() {
        this.isVoted = false;
    }

    onClick() {
        if (!this.user) {
            return this.snackBar.openFromComponent(SnackComponent, {
                data: 'Та системд нэвтэрч байж үнэлгээ өгөх боломжтой.'
            });
        }
        this.loading = true;
        if (!this.isVoted) {
            this.addVote().then(res => {
                console.log(res);
                // @ts-ignore
                if (res) {
                    // until cloud function runs
                    this.obj.votesNumber++;
                    this.isVoted = !this.isVoted;
                    this.loading = false;
                } else {
                    return null;
                }
            });
        } else {
            this.removeVote()
                .then(() => {
                    this.isVoted = !this.isVoted;
                    this.obj.votesNumber--;
                    this.loading = false;
                });
        }
    }

    addVote() {
        console.log('add');
        return this.voteService.addVote(this.obj, this.type)
            .then(() => {
                this.snackBar.openFromComponent(SnackComponent, {
                    data: 'Таны үнэлгээ нэмэгдлээ'
                });
                return true;
            })
            .catch(err => {
                console.log(err);
                return false
            });
    }

    removeVote() {
        return this.voteService.removeVote(this.obj, this.type)
            .then(() => {
                this.snackBar.openFromComponent(SnackComponent, {
                    data: 'Таны үнэлгээ хасагдлаа'
                });
            });
    }
}
