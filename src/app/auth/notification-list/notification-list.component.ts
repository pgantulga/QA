import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
    @Input() item: any;
    icon: string;

    constructor(private router: Router, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.icon = this.getNotificationIcon(this.item.entity_type)
    }

    getNotificationIcon(entityType) {
        if (entityType === 1) {
            return 'edit';
        } else if (entityType === 2) {
            return 'edit';
        } else if (entityType === 4 || entityType === 5) {
            return 'reply';
        }
    }

    deleteNotification() {
        return this.notificationService.removeNotification(this.item.id);
    }

    async changeStatus() {
        const doc = await this.notificationService.getNotificationObject(this.item.notificationObjectId);
        (doc.data().parent) ? await this.router.navigate(['/posts', doc.data().parent])
            : await this.router.navigate(['/posts', doc.data().entity]);
        // console.log('change status');
        return this.notificationService.updateNotifier(this.item.id, {status: 0});
    }
}
