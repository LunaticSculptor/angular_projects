import { Component, inject, Signal } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

  private newsService = inject(NewsService);
  constructor() {console.log('News Component called')}
  news$: Signal<any[]> = this.newsService.news;
}
