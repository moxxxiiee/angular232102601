import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Input() moduleName: string = '';
  username: string = '';
  isDarkMode: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Username
    this.username = this.cookieService.get('userId');

    // Load dark mode dari localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.enableDarkMode();
      this.isDarkMode = true;
    }
  }

  toggleDarkMode(event: Event): void {
    event.preventDefault();

    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.enableDarkMode();
      localStorage.setItem('theme', 'dark');
    } else {
      this.disableDarkMode();
      localStorage.setItem('theme', 'light');
    }
  }

  private enableDarkMode(): void {
    this.renderer.addClass(document.body, 'dark-mode');
  }

  private disableDarkMode(): void {
    this.renderer.removeClass(document.body, 'dark-mode');
  }
}