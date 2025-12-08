import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [ Footer, Header, Sidebar ],
  templateUrl: './forex.html',
  styleUrls: ['./forex.css']
})
export class Forex implements AfterViewInit {
  private _table1 : any;

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    this._table1 = $("#table1").DataTable({
      "columnDefs": [
        {
          "targets": 3,
          "className": "text-right"
        }
      ]
    });

    this.bindTable1();
  }

  bindTable1(): void {
    console.log("bindTable1");

    // URL to fetch exchange rates
    const ratesUrl = "https://openexchangerates.org/api/latest.json?app_id=024e236176a74ec180273cd4632d6d07";
    // URL to fetch currency names
    const currenciesUrl = "https://openexchangerates.org/api/currencies.json";
    
    // Fetch the currency names
    this.httpClient.get(currenciesUrl).subscribe((currencies: any) => {
      // Fetch the exchange rates
      this.httpClient.get(ratesUrl).subscribe((data: any) => {
        const rates = data.rates;
        let index = 1;

        // Iterate over the rates and add the rows to the table
        for (const currency in rates) {
          // Get the currency name from the API
          const currencyName = currencies[currency];

          // Calculate the rate for the specific currency
          const rate = rates.IDR / rates[currency];
          const formatRate = formatCurrency(rate, "en-US", "", currency);

          console.log(`${currency}: ${currencyName} - ${formatRate}`);

          // Add the row with the index, symbol, currency name, and formatted rate
          const row = [index++, currency, currencyName, formatRate];
          this._table1.row.add(row);
        }
        this._table1.draw(false);
      });
    });
  }
}