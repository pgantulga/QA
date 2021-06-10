import { BannerService } from './../../services/banner.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BannerAddComponent } from './banner-add/banner-add.component';

@Component({
  selector: 'app-moderator-banner',
  templateUrl: './moderator-banner.component.html',
  styleUrls: ['./moderator-banner.component.scss']
})
export class ModeratorBannerComponent implements OnInit {
  targetUrl: string;
  constructor(
    private bannerService: BannerService,
    public authService: AuthService,
    private dialog: MatDialog  ) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(BannerAddComponent, {
      width: '500px',
      data: {
        targetUrl: this.targetUrl,
      }
    });
    dialogRef.afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.bannerService.addBanner(result);
          }
        },
      });  }

}
