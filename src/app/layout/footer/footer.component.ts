import { GlobalObjectService } from './../../services/global-object.service';
import { Component, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', '../../post/post-list/post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class FooterComponent {
  article$: Observable<any>;
  tocId: string;
  window: any;
  constructor(private articleService: ArticleService, windowRef: GlobalObjectService, @Inject(PLATFORM_ID) private platformId: object) {
    this.tocId = '44LFn7kNX5BPkb1RwID5';
    this.article$ = this.articleService.getArticle('WYg2RZvhKat1PxtPaUL0');
    this.window = windowRef.getWindow();
   }
   feedback() {
     if (isPlatformBrowser(this.platformId)) {
      this.window.location.href = 'mailto:tulga@miningmongolia.mn?subject=Санал хүсэлт Уурхайчин форум';
     }
  }
}
