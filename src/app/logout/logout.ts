import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})

export class Logout {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {


    this.cookieService.deleteAll();

   
    this.router.navigate(['/login']);

  }

}
