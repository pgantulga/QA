import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<any>;
  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser()
        .then(user => {
          this.notifications$ = this.notificationService.getNotifications(user);
        });
  }

}
