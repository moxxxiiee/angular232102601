import { AfterViewInit, Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { HttpClient } from '@angular/common/http'; 

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [Header, Sidebar, Footer], 
  templateUrl: './mahasiswa.html',
  styleUrls: ['./mahasiswa.css']
})
export class Mahasiswa implements AfterViewInit {
  data: any;
  table1!: any; 

  constructor(private httpClient: HttpClient) { } 

  ngAfterViewInit(): void {
    this.table1 = $('#table1').DataTable({
      responsive: true,
      data: [], 
      columns: [ 
          { title: "NIM" }, 
          { title: "Nama" }, 
          { title: "Jenis Kelamin" }, 
          { title: "Tempat, Tanggal Lahir" },
          { title: "JP" },
          { title: "Alamat" },
          { title: "Status" },
          { title: "Tahun Masuk" }
      ]
    }); 
    
    this.bindMahasiswa(); 
  }

  bindMahasiswa(): void {
    this.httpClient.get("https://stmikpontianak.cloud/0111600862/tampilMahasiswa.php").subscribe((data: any) => {
        console.table(data);
        this.table1.clear();

        data.forEach((element: any) => {
            var tempatTanggalLahir = element.TempatLahir + ", " + element.TanggalLahir;

            const jenisKelaminFormatted = element.JenisKelamin + " " + (
                (element.JenisKelamin == "Perempuan" || element.JenisKelamin == "perempuan") ?
                '<i class="fas fa-venus text-danger"></i>' :
                (element.JenisKelamin != "undefined") ?
                '<i class="fas fa-mars text-primary"></i>' :
                ""
            );

            var row = [
                element.NIM,
                element.Nama,
                jenisKelaminFormatted,
                tempatTanggalLahir,
                element.JP,
                element.Alamat,
                element.StatusNikah,
                element.TahunMasuk
            ];

            this.table1.row.add(row);
        });

        this.table1.draw(false);
    });
  }

}