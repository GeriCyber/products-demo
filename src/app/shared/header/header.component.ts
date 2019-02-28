import { Component, OnInit } from '@angular/core';
import { InfoPage } from '../../interfaces/info-page.interface';
import { InfoPageService } from '../../services/info-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public infoService: InfoPageService) {
  }

  ngOnInit() {
  }

}
