import { CompanyService } from 'src/app/services/company.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'publisher-profile',
  templateUrl: './publisher-profile.component.html',
  styleUrls: ['./publisher-profile.component.scss']
})
export class PublisherProfileComponent implements OnInit {
  @Input() publisher: any;
  publisherData$: Observable<any>;
  avatar: string;
  constructor(private userService: UserService, private companyService: CompanyService) {
  }
  ngOnInit(): void {
    this.avatar = this.publisher.displayName.charAt(0);
    this.publisherData$ = this.getPublisherData(this.publisher);
  }
  private getPublisherData(publisher): Observable<any> {
    if (publisher.type === 'user') {
      return this.userService.getUserData(publisher)
    }
    if(publisher.type === 'company') {
      return this.companyService.getCompany(publisher.id);
    }
  }

}
