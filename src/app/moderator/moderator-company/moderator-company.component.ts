import { CompanyAddComponent } from './company-add/company-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moderator-company',
  templateUrl: './moderator-company.component.html',
  styleUrls: ['./moderator-company.component.css']
})
export class ModeratorCompanyComponent implements OnInit {
  companiesTable = ['name', 'usersNumber', 'createdAt', 'description', 'action'];
  companies$: Observable<any>;
  name: string;
  description: string;
  constructor(
    private companyService: CompanyService,
    public authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.companies$ = this.companyService.getCompanies();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      width: '500px',
      data: {
        name: this.name,
        description: this.description,
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.companyService.createCompany(result);
        }
      });
  }
  editCompany(company) {
    const dialogRef = this.dialog.open(CompanyAddComponent, {
      width: '500px',
      data: {
        name: company.name,
        description: company.description
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.companyService.updateCompany(result, company);
        }
      });
  }
}
