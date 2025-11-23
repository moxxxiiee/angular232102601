import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [RouterModule, Footer, Sidebar, Header],
  templateUrl: './mahasiswa.html',
  styleUrl: './mahasiswa.css',
})
export class Mahasiswa implements AfterViewInit {
  data: any;
  table1: any;

  constructor(private httpClient: HttpClient, private renderer: Renderer2) {}

 
  ngAfterViewInit(): void {
    
    this.table1 = $('#table1').DataTable({
      responsive: true,
      autoWidth: false,
    });
    
    
    this.bindMahasiswa(); 
  }

 
  bindMahasiswa(): void {
    this.httpClient
      .get('https://stmikpontianak.cloud/011100862/tampilMahasiswa.php')
      .subscribe({
        next: (data: any) => {
         
          console.table(data); 

          
          this.table1.clear();

        
          data.forEach((element: any) => {
            var tempatTanggalLahir = element.TempatLahir + ', ' + element.TanggalLahir;

            // Logika format Jenis Kelamin (sudah benar)
            const jenisKelaminFormatted =
              element.JenisKelamin +
              ' ' +
              (element.JenisKelamin == 'Perempuan' || element.JenisKelamin == 'perempuan'
                ? "<i class='fas fa-venus text-danger'></i>"
                : element.JenisKelamin != 'undefined'
                ? "<i class='fas fa-mars text-primary'></i>"
                : '');

            // Susunan data baris, harus cocok dengan urutan header <th> di mahasiswa.html
            var row = [
              element.NIM,
              element.Nama,
              jenisKelaminFormatted,
              tempatTanggalLahir,
              element.JP,
              element.Alamat,
              element.StatusNikah, // Kolom 'Status'
              element.TahunMasuk, // Kolom 'Tahun Masuk'
            ];

            this.table1.row.add(row);
          });

          // Gambar ulang tabel untuk menampilkan data baru
          this.table1.draw(false);
        },
        error: (err) => {
          // Log error jika API call gagal (misalnya karena CORS atau server mati)
          console.error('Error saat mengambil data mahasiswa:', err);
        }
      });
  }
}