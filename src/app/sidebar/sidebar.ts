import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  @Input() moduleName: string = "";
  username: string = "";

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.cookieService.get('userId');
  }

  setDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }

  setLightMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }

}
