import { Component, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article-service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', '../../post/post-list/post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FooterComponent {
  article$: Observable<any>;
  tocId: string;
  constructor(private articleService: ArticleService) {
    this.tocId = '44LFn7kNX5BPkb1RwID5';
    this.article$ = this.articleService.getArticle('WYg2RZvhKat1PxtPaUL0');
   }
}
