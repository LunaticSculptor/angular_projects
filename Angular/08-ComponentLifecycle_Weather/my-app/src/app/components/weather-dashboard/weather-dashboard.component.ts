import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-dashboard',
  imports: [CommonModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css'
})
export class WeatherDashboardComponent {
  @Input() city: string = 'New York'; // Default city
  weatherData: any;
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    console.log('ngOnInit - Initializing component with default city:', this.city);
    this.fetchWeather();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city'] && !changes['city'].firstChange) {
      console.log('ngOnChanges - City changed to:', this.city);
      this.fetchWeather();
    }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy - Cleaning up component');
  }

  private fetchWeather() {
    this.loading = true;
    this.error = '';
    this.weatherService.fetchWeatherData(this.city)
      .then(data => {
        this.weatherData = data;
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Failed to load weather data';
        this.loading = false;
      });
  }
}
