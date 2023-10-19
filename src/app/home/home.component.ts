import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  currentDate: Date;

  constructor(private apiService: ApiService) {
    this.currentDate = new Date();
    console.log('The Date is :', this.currentDate);
  }

  weatherFrom = new FormGroup({});

  city: string = 'Mandalay';
  temp: number = 21.3;
  desc: string = 'overcast clouds';
  country: string = 'MM';
  humidity: string = '86';
  visibility: number = 10;
  wind: string = '2.1';
  icon_path: string = 'wi-day-sunny';
  error: boolean = false;
  errorCode?: number;
  errorMessage?: string;

  weatherSub: Subscription = new Subscription();

  ngOnDestroy(){
    if(this.weatherSub) {
      this.weatherSub.unsubscribe
    }
  }

  getWeather() {
    var result = this.apiService.apiCall(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=89e42373f64bcb63aa6b5619d11ca7cb&units=metric`
    );
    console.log(result);
    // https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=89e42373f64bcb63aa6b5619d11ca7cb&units=metric
    this.weatherSub = result.subscribe({
      next: (data: any) => {
        console.log((this.temp = data['main']['temp']));
        console.log((this.desc = data['weather'][0]['description']));
        this.country = data['sys']['country'];
        this.city = data['name'];
        this.humidity = data['main']['humidity'];
        this.wind = data['wind']['speed'];
        this.visibility = data['visibility'] / 1000;

        if (this.desc == 'overcast clouds') {
          this.icon_path = 'wi-day-sunny-overcast';
        } else if (this.desc == 'clear sky') {
          this.icon_path = 'wi-day-sunny';
        } else if (this.desc == 'haze' || this.desc == 'scattered clouds') {
          this.icon_path = 'wi-day-haze';
        } else if (this.desc == 'light rain ' || this.desc == 'broken clouds') {
          this.icon_path = 'wi-day-rain';
        } else if ((this.desc = 'few cloud')) {
          this.icon_path = 'wi-day-cloudy-high';
        }

        // this.currentDate= Math.floor(currentTimestamp/millisecondsPerDay);
      },

      error: (err: HttpErrorResponse) => {
        this.error = true;
        this.errorCode = err.error.code;
        this.errorMessage = err.error.message;
      },
    });
  }
}
