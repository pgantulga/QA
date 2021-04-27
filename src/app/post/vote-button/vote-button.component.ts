import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { AuthService } from '../../services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { BeerIcons } from "../../services/vote.service";

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss'],
})
export class VoteButtonComponent implements OnInit, OnDestroy {
  @Input() obj: any;
  @Input() type: string;
  isVoted: boolean;
  loading = false;
  user: any;
  userVote: any;
  voteCount: any;

  constructor(
    public voteService: VoteService,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons(BeerIcons);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.voteService
        .getItemVotes(this.obj, this.type)
        .subscribe((upvotes: any) => {
          if (this.user) {
            this.userVote = upvotes ? upvotes[this.user.uid] : 0;
          }
          this.voteCount = upvotes
            ? Object.values(upvotes).reduce((a: number, b: number) => a + b, 0)
            : 0;
          // this.voteCount = Object.sum(values(upvotes));
        });
    });
  }
  ngOnDestroy() {
    this.isVoted = false;
  }
  upVote() {
    this.checkAuth();
    // this.voteCount += 1;
    const vote = this.userVote === 1 ? 0 : 1;
    this.voteService.updateVote(this.obj, this.user.uid, vote, this.type);
  }
  downVote() {
    this.checkAuth();
    // this.voteCount -= 1;
    const vote = this.userVote === -1 ? 0 : -1;
    this.voteService.updateVote(this.obj, this.user.uid, vote, this.type);
  }
  registerIcons(icons: Array<any>) {
      icons.forEach(icon => {
        this.matIconRegistry.addSvgIcon(
            icon.name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(
              icon.url
            )
          );
      });
  }
  checkAuth () {
    if (!this.user) {
      return this.snackBar.openFromComponent(SnackComponent, {
        data: 'Та системд нэвтэрч байж үнэлгээ өгөх боломжтой.',
      })
    }
  }
}
