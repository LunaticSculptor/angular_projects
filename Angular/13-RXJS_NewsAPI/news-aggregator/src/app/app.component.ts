import { Component } from '@angular/core';
import { NewsComponent } from './components/news/news.component';

@Component({
  selector: 'app-root',
  imports: [NewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'news-aggregator';
}
