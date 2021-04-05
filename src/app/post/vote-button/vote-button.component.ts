import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { AuthService } from '../../services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';

const BeerIcons = [
  {
    name: 'beer_0',
    url: '../../../assets/beer_icon/beer_0.svg',
  },
  {
    name: 'beer_1',
    url: '../../../assets/beer_icon/beer_1.svg',
  },
  {
    name: 'beer_2',
    url: '../../../assets/beer_icon/beer_2.svg',
  },
  {
    name: 'beer_3',
    url: '../../../assets/beer_icon/beer_3.svg',
  },
  {
    name: 'beer_4',
    url: '../../../assets/beer_icon/beer_4.svg',
  },
  {
    name: 'beer_cheers',
    url: '../../../assets/beer_icon/beer_cheers.svg',
  },
];

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
    const vote = this.userVote === 1 ? 0 : 1;
    this.voteService.updateVote(this.obj, this.user.uid, vote, this.type);
  }
  downVote() {
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
}
