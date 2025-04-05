import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private sources = [
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=8b088b0716ca40358a41b36b37cd6775',
    'https://newsapi.org/v2/everything?q=tesla&from=2025-02-21&sortBy=publishedAt&apiKey=8b088b0716ca40358a41b36b37cd6775',
    // 'https://api.currentsapi.services/v1/latest-news?apiKey=YOUR_CURRENTS_API_KEY'
  ];

  news = signal<any[]>([]);

  constructor(private http: HttpClient) { 
    this.fetchNews();
    console.log('Fetch news called');
   }

  fetchNews(): void {
    console.log('fetch news called');
    
    const requests = this.sources.map(url => this.http.get(url));
    merge(...requests)
      .pipe(map((response: any) => response.articles || response.news)) // Normalize data
      .subscribe(data => this.news.set(data)); // Update signal
    console.log(this.news());
  }
}
