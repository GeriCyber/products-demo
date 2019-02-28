import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage;
  cargada = false;

  constructor(private http: HttpClient) {
    this.http.get('./assets/data/data-page.json').subscribe((data: InfoPage) => {
        this.cargada = true;
        this.info = data;
        // console.log(this.info);
      });
  }
}
