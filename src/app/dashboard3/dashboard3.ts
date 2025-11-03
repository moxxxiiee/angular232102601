import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "../header/header";
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

// Tambahkan deklarasi ini agar bisa pakai jQuery
declare const $: any;

@Component({
  selector: 'app-dashboard3',
  imports: [RouterModule, Header, Sidebar, Footer],
  templateUrl: './dashboard3.html',
  styleUrl: './dashboard3.css',
})
export class Dashboard3 implements AfterViewInit {

  ngAfterViewInit(): void {
    // Aktifkan kembali fungsi toggle sidebar
    $('[data-widget="pushmenu"]').PushMenu();

    // Tutup sidebar otomatis setelah klik menu di tampilan mobile
    $('.nav-link').on('click', () => {
      if ($(window).width() < 992) { // ukuran mobile
        $('[data-widget="pushmenu"]').PushMenu('collapse');
      }
    });
  }
}
