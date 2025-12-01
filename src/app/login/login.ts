import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare const $: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLoading: boolean = false; // Tambahkan state loading

  ngOnInit() {
    const registerButton: HTMLElement | null = document.getElementById('register');
    const loginButton: HTMLElement | null = document.getElementById('login');
    const container: HTMLElement | null = document.getElementById('container');

    if (registerButton && loginButton && container) {
      registerButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      loginButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }

  constructor(
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.renderer.addClass(document.body, 'login-page');
    this.renderer.removeClass(document.body, 'sidebar-mini');
    this.renderer.removeClass(document.body, 'layout-fixed');
    this.renderer.setAttribute(document.body, 'style', 'min-height: 464px;');
  }

  showPeringatanModal(message: string): void {
    $('#peringatanModal').modal();
    $('#pm_message').html(message);
  }

  signIn(): void {
    // Cegah multiple click
    if (this.isLoading) {
      return;
    }

    console.log('signIn()');
    this.isLoading = true; // Set loading true

    var userId = $('#idText').val();
    userId = encodeURIComponent(userId);

    var password = $('#passwordText').val();
    password = encodeURIComponent(password);

    var url =
      'https://stmikpontianak.cloud/011100862/login.php' +
      '?id=' +
      userId +
      '&password=' +
      password;

    console.log('url : ' + url);

    this.httpClient.get(url).subscribe({
      next: (data: any) => {
        console.log(data);
        var row = data[0];

        if (row.idCount != '1') {
          this.showPeringatanModal('Id atau password tidak cocok');
          this.isLoading = false; // Reset loading state
          return;
        }

        this.cookieService.set('userId', userId);
        console.log('session data berhasil dibuat');

        // Navigate setelah proses selesai
        this.router.navigate(['/dashboard']).then(() => {
          // Optional: Refresh halaman untuk memastikan layout terload dengan benar
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Login error:', error);
        this.showPeringatanModal('Terjadi kesalahan saat login');
        this.isLoading = false; // Reset loading state
      },
    });
  }
}