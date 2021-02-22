import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articleCollection = this.db.collection('articles');
  constructor(private db: AngularFirestore) { }
  getAllArticles(): Observable<any> {
    return this.articleCollection.valueChanges();
  }
  getArticle(id: string): Observable<any> {
    return this.articleCollection.doc(id).valueChanges();
  }
  createArticle(article: { title: any; content: any; }, author: { uid: any; displayName: any; }): any {
    return this.articleCollection.add(
        {
          author: {
            uid: author.uid,
            displayName: author.displayName
          },
          content: article.content,
          createdAt: new Date(),
          title: article.title,
        }
    ).then(res => {
      return res.update({
        id: res.id
      });
    });
  }
  deleteArticle(article: { id: string; }): any {
    return this.articleCollection.doc(article.id).delete();
  }
  updateArticle(article: { id: any; title: any; content: any; }, updatedBy: { uid: any; displayName: any; }): any {
    return this.articleCollection.doc(article.id).set({
      content: article.content,
      title: article.title,
      updatedAt: new Date(),
      lastUpdateBy: {
        uid: updatedBy.uid,
        displayName: updatedBy.displayName
      }
    }, {merge: true});
  }
}
