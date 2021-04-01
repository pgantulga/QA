import { DomSanitizer } from "@angular/platform-browser";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { VoteService } from "../../services/vote.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackComponent } from "../../shared/components/snack/snack.component";
import { AuthService } from "../../services/auth.service";
import { MatIconRegistry } from "@angular/material/icon";

import { Observable } from "rxjs";

@Component({
  selector: "vote-button",
  templateUrl: "./vote-button.component.html",
  styleUrls: ["./vote-button.component.scss"],
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
    this.matIconRegistry.addSvgIcon(
      "empty",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../assets/beer_icon/beer_5.svg"
      )
    );
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.voteService.getItemVotes(this.obj.id).subscribe((upvotes: any) => {
        if (this.user) {
          this.userVote = (upvotes) ? upvotes[this.user.uid] : 0;
        }
        // this.voteCount = Object.sum(values(upvotes));
      });
    });
    this.voteService.findVote(this.obj, this.type).then((data) => {
      if (data) {
        data.forEach((doc) => {
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
        data: 'Та системд нэвтэрч байж үнэлгээ өгөх боломжтой.',
      });
    }
    this.loading = true;
    if (!this.isVoted) {
      this.addVote().then((res) => {
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
      this.removeVote().then(() => {
        this.isVoted = !this.isVoted;
        this.obj.votesNumber--;
        this.loading = false;
      });
    }
  }

  addVote() {
    return this.voteService
      .addVote(this.obj, this.type)
      .then(() => {
        this.snackBar.openFromComponent(SnackComponent, {
          data: "Таны үнэлгээ нэмэгдлээ",
        });
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  removeVote() {
    return this.voteService.removeVote(this.obj, this.type).then(() => {
      this.snackBar.openFromComponent(SnackComponent, {
        data: "Таны үнэлгээ хасагдлаа",
      });
    });
  }

  upVote() {
      const vote = (this.userVote === 1) ? 0 : 1;
      this.voteService.updateVote(this.obj.id, this.user.uid, vote);
  }
  downVote() {
      const vote = (this.userVote === -1 ) ? 0 : -1;
      this.voteService.updateVote(this.obj.id, this.user.uid, vote);
  }
}
