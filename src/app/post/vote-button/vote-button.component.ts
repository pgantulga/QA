import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { AuthService } from '../../services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { BeerIcons } from "../../services/vote.service";
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VoteButtonComponent implements OnInit, OnDestroy {
  @ViewChild("tooltip") tooltip: MatTooltip;

  @Input() obj: any;
  @Input() type: string;
  
  isVoted: boolean;
  loading = false;
  user: any;
  userVote: any;
  voteCount: any;
  tooltipValue: any;
  showTooltip: boolean = false;
  subscription: Subscription

  constructor(
    public voteService: VoteService,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {
    this.registerIcons(BeerIcons);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.subscription = this.voteService
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
    this.subscription.unsubscribe();
    this.isVoted = false;
  }
  upVote() {
    this.checkAuth();
    const vote = this.userVote === 1 ? 0 : 1;
    this.tooltipValue = this.userVote === 1 ? '-1' : '+1';
    // this.voteCount += 1;
    this.voteService.updateVote(this.obj, this.user, vote, this.type);
    this.toggle();
  }
  downVote() {
    this.checkAuth();
    const vote = this.userVote === -1 ? 0 : -1;
    this.tooltipValue = this.userVote === -1 ? '+1' : '-1';
    // this.voteCount += -1;

    this.voteService.updateVote(this.obj, this.user, vote, this.type);
    this.toggle();
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
  checkAuth() {
    if (!this.user) {
      return this.snackBar.openFromComponent(SnackComponent, {
        data: 'Та системд нэвтэрч байж үнэлгээ өгөх боломжтой.',
      })
    }
  }
  toggle() {
    this.showTooltip = true;
    setTimeout(() => {
      this.showTooltip = false;
    }, 1500);
  }
}

