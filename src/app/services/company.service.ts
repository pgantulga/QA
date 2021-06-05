import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Company {
  id: string;
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  logo: string;
  cover: string;
  usersNum: number;
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companiesRef: AngularFirestoreCollection<any>;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) { }
  createCompany(formData) {
    this.companiesRef = this.db.collection('companies');
    const data = {
      name: formData.name,
      description: (formData.description || ''),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.companiesRef.add(data)
      .then((res) => {
        return res.update({
          id: res.id
        });
      });
  }
  updateCompany(formData, oldData) {
    return this.db.collection('companies').doc(oldData.id)
      .set({
        id: oldData.id,
        name: formData.name,
        description: formData.description,
        updatedAt: new Date(),
      }, { merge: true });
  }
  getCompanies() {
    return this.db.collection('companies', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }
  getCompany(id) {
    console.log(id);
    return this.db.collection('companies').doc(id).valueChanges();
  }
  getCompaniesByArray() {
    return this.db.collection('companies', ref => ref.orderBy('name', 'desc')).ref.get();
  }
  setUserCompany(companyData, userData) {
    const data = {
      company: {
        name: companyData.name,
        id: companyData.id,
        isConfirmed: {
          confirmed: true,
          notConfirmed: false,
          checking: false
        }
      },
      updatedAt: new Date()
    }
    return this.db.collection('users').doc(userData.uid)
      .set(data, { merge: true })
      .then(() => {
        return this.authService.verify(userData);
      })
  }
  setCompanyConfirmation(value, userData, options) {
    const obj = {};
    for (const option of options) {
      obj[option.value] = option.value === value.value;
    }
    const data = {
      company: {
        name: userData.company.name,
        id: userData.company.id || null,
        isConfirmed: obj
      },
      updatedAt: new Date()
    }
    return this.db.collection('users').doc(userData.uid)
      .set(data, { merge: true });
  }
  setCompanyValue(formData, oldUserData) {
    if (this.isCompanyNameChanged(formData, oldUserData)) {
      return {
        name: formData.name,
        id: null,
        isConfirmed: {
          confirmed: false,
          notConfirmed: false,
          checking: true
        }
      }
    } else {
      if (this.isIdCardChanged(formData, oldUserData)) {
        return {
          name: oldUserData.company.name,
          id: oldUserData.company.id || null,
          isConfirmed: {
            confirmed: false,
            notConfirmed: false,
            checking: true
          }
        }
      } else {
        return {
          name: oldUserData.company.name,
          id: oldUserData.company.id || null,
          isConfirmed: oldUserData.company.isConfirmed || null
        }
      }
    }
  }
  private isCompanyNameChanged(formData, oldUserData) {
    if (formData.name) {
      if (oldUserData.company) {
        if (formData.name !== oldUserData.company.name) {
          return true;
        }
        else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  private isIdCardChanged(formData, oldUserData) {
    if (formData.idCard) {
      if (oldUserData.idCard) {
        if (formData.idCard !== oldUserData.idCard) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
