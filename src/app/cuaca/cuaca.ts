import { AfterViewInit, Component, Renderer2, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-cuaca',
  standalone: true,
  imports: [Footer, Sidebar, Header, RouterModule, CommonModule],
  templateUrl: './cuaca.html',
  styleUrl: './cuaca.css',
})
export class Cuaca implements AfterViewInit, OnInit {
  private table1: any;
  private map: any;

  currentWeather: any = null;
  cityData: any = null;
  todayDate: string = '';

  constructor(private httpClient: HttpClient, private renderer: Renderer2) {
    // Pengaturan tampilan sidebar (opsional, bawaan template)
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.renderer.addClass(document.body, 'sidebar-collapsed');
  }

  ngOnInit(): void {
    this.todayDate = moment().format('MMM DD, hh:mma');
    this.getData('Pontianak');
  }

  ngAfterViewInit(): void {
    this.table1 = $('#table1').DataTable({
      columnDefs: [
        {
          targets: 0,
          render: function (data: string) {
            const waktu = moment(data + ' UTC');
            return (
              waktu.local().format('YYYY-MM-DD') + '<br />' + waktu.local().format('HH:mm') + ' WIB'
            );
          },
        },
        {
          targets: 1,
          render: function (data: string) {
            return (
              "<img src='" +
              data +
              "' style='filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));' />"
            );
          },
        },
        {
          targets: [2],
          render: function (data: string) {
            const array = data.split('||');
            return '<strong>' + array[0] + '</strong> <br />' + array[1];
          },
        },
      ],
    });
  }

  getData(city: string): void {
    city = encodeURIComponent(city);

    this.httpClient
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d884631e5ebfe7157966d6837789bd9d`
      )
      .subscribe(
        (data: any) => {
          this.cityData = data.city;

          if (data.list.length > 0) {
            this.currentWeather = data.list[0];
            this.todayDate = moment(this.currentWeather.dt_txt + ' UTC')
              .local()
              .format('MMM DD, hh:mma');

            // MEMUNCULKAN PETA SESUAI LOKASI KOTA
            setTimeout(() => {
              this.initMap(this.cityData.coord.lat, this.cityData.coord.lon);
            }, 100);
          }

          let list = data.list;
          this.table1.clear();

          list.forEach((element: any) => {
            const weather = element.weather[0];
            const iconUrl = 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png';
            const cuacaDeskripsi = weather.main + '||' + weather.description;
            const main = element.main;
            const tempMin = this.kelvinToCelcius(main.temp_min);
            const tempMax = this.kelvinToCelcius(main.temp_max);
            const temp = tempMin + '°C - ' + tempMax + '°C';
            const row = [element.dt_txt, iconUrl, cuacaDeskripsi, temp];
            this.table1.row.add(row);
          });

          this.table1.draw(false);
        },
        (error: any) => {
          console.error(error);
          alert(error.error.message);
        }
      );
  }

  // LOGIKA PETA LEAFLET
  private initMap(lat: number, lon: number): void {
    // Hapus peta lama jika ada agar tidak menumpuk/error
    if (this.map) {
      this.map.remove();
    }

    // Buat peta baru dan arahkan (setView) ke koordinat kota tersebut
    this.map = L.map('map-container').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([lat, lon]).addTo(this.map).bindPopup(this.cityData.name).openPopup();
  }

  handleEnter(event: any) {
    let city = event.target.value;
    if (city) {
      this.getData(city);
    }
  }

  kelvinToCelcius(kelvin: any): number {
    return parseFloat((kelvin - 273.15).toFixed(1));
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  getWindDirection(deg: number): string {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 22.5) % 16;
    return directions[index];
  }
}