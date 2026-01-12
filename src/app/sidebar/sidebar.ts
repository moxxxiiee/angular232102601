import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  @Input() moduleName: string = '';
  username: string = "";

  constructor(private cookieService: CookieService, private router: Router){}

  ngOnInit(): void {
    this.username = this.cookieService.get("userId");
    
    const saved = localStorage.getItem('adminlte-theme');
    const body = document.body;
    const header = document.querySelector('.main-header') as HTMLElement;

    if (saved === 'dark') {
      body.classList.add('dark-mode');

      if (header) {
        header.classList.remove('navbar-white', 'navbar-light');
        header.classList.add('navbar-dark', 'navbar-primary');
      }
    } else {
      if (header) {
        header.classList.remove('navbar-dark', 'navbar-primary');
        header.classList.add('navbar-white', 'navbar-light');
      }
    }
  }

  toggleTheme() {
    const body = document.body;
    const header = document.querySelector('.main-header') as HTMLElement;

    const isDark = body.classList.contains('dark-mode');

    // toggle body
    body.classList.toggle('dark-mode');

    // toggle header class AdminLTE
    if (header) {
      if (!isDark) {
        // dari light → dark
        header.classList.remove('navbar-white', 'navbar-light');
        header.classList.add('navbar-dark', 'navbar-primary'); // atau navbar-dark navbar-dark
      } else {
        // dari dark → light
        header.classList.remove('navbar-dark', 'navbar-primary');
        header.classList.add('navbar-white', 'navbar-light');
      }
    }

    // simpan tema
    localStorage.setItem('adminlte-theme', isDark ? 'light' : 'dark');
  }
}