import { Component, OnInit } from '@angular/core';
import { InfoPage } from '../../interfaces/info-page.interface';
import { InfoPageService } from '../../services/info-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public infoService: InfoPageService, public router: Router) {
  }

  ngOnInit() {
  }

  searchProduct(text: string) {
    if (text.length < 1) {
      return;
    }
    console.log(text);
    this.router.navigate(['/search', text]);
  }

}
