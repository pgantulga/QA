import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

export interface EventObj {
  entity: string;
  entityType: number;
  collection: string;
  actor: string;
  createdAt: any;
}
export const entityType = {
  create: 1,
  update: 2,
  delete: 3,
  follow: 4,
  unfollow: 5
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private db: AngularFirestore) { }
  private createEventObj(collection, entity, entityType, actor): EventObj {
    return {
      entity: entity,
      collection: collection,
      entityType: entityType,
      actor: actor,
      createdAt: new Date()
    }
  }

  addEventObj(collection, entity, entityType, actor) {
    this.db.collection('eventLogs')
      .add(this.createEventObj(collection, entity, entityType, actor))
      .then(() => {
        console.log('Event Object added.')
      })
  }
}
