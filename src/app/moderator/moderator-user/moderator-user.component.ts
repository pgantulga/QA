import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { PermissionService } from '../../services/permission.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-moderator-user',
  templateUrl: './moderator-user.component.html',
  styleUrls: ['./moderator-user.component.scss']
})
export class ModeratorUserComponent implements OnInit {
  displayedColumns: string[] = ['email', 'verified', 'displayName', 'company', 'idCard', 'roles'];
  users$: Observable<any>;
  companies: any[];
  confirmSelections: any[];
  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    public authService: AuthService,
    public companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
    this.getCompanies();
    this.confirmSelections = [
      {name: 'Confirm', value: 'confirmed'},
      {name: 'Not confirm', value: 'notConfirmed'},
      {name: 'Checking', value: 'checking'}
    ]
  }
  changeRole(role, uid, roles) {
    const roleNames = ['admin', 'moderator', 'member', 'subscriber', 'guest'];
    this.permissionService.changeRole(role, uid);
  }
  reset(uid) {
    console.log(uid);
    this.permissionService.reset(uid);
  }
  changeUserRole(ev, user) {
    this.permissionService.selectRole(ev.target.value, user.uid);
  }
  imageShow(url) {
    window.open(url, '_blank');
  }
  async getCompanies() {
    this.companies = [];
    const companiesPromises = await this.companyService.getCompaniesByArray();
    companiesPromises.forEach(snapshot => {
      this.companies.push({
        name: snapshot.data().name,
        id: snapshot.data().id,
      });
    });
  }
  changeUserCompany(ev, userData) {
    return (ev) ? this.companyService.setUserCompany(ev, userData) : null;
  }
  changeUserConfirmation(ev, userData) {
    return (ev) ? this.companyService.setCompanyConfirmation(ev, userData, this.confirmSelections) : null;
  }
}


