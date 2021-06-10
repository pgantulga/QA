import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

export interface Banner {
  name: string;
  id: string;
  mediaUrl: string;
  targetUrl: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  bannerCollection = this.db.collection<any>('banners', ref => ref.orderBy('createdAt', 'desc'))
  constructor(private db: AngularFirestore) { }
  addBanner(formData) {
    const data = {
      name: formData.name,
      mediaUrl: formData.mediaUrl,
      targetUrl: formData.targetUrl,
      type: 'image',
      createdAt: new Date()
    }
    this.bannerCollection.add(data)
    .then(res => {
      return res.update({id: res.id})
    });
  }
  getBanner(id) {
    return this.bannerCollection.doc(id).valueChanges();
  }

}
