import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "../header/header";
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

// deklarasi jQuery supaya bisa pakai fungsi AdminLTE
declare const $: any;

@Component({
  selector: 'app-dashboard2',
  imports: [RouterModule, Header, Sidebar, Footer],
  templateUrl: './dashboard2.html',
  styleUrl: './dashboard2.css',
})
export class Dashboard2 implements AfterViewInit {

  ngAfterViewInit(): void {
    // Aktifkan ulang fungsi toggle sidebar
    $('[data-widget="pushmenu"]').PushMenu();

    // Tutup sidebar otomatis setelah klik menu di tampilan mobile
    $('.nav-link').on('click', () => {
      if ($(window).width() < 992) { // kalau layar mobile
        $('[data-widget="pushmenu"]').PushMenu('collapse');
        
      }
    });
  }
}
