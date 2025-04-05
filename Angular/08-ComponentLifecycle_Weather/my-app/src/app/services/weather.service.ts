import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // constructor() { }
  fetchWeatherData(city: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!city) {
          reject('City name is required');
        } else {
          resolve({
            temperature: Math.floor(Math.random() * 30) + 1, 
            humidity: Math.floor(Math.random() * 100), 
            condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
          });
        }
      }, 2000); // Simulated API delay
    });
  }
}
