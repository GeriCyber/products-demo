import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';
import { InfoTeam } from '../interfaces/info-team.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage;
  team: InfoTeam[] = [];
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('./assets/data/data-page.json').subscribe((data: InfoPage) => {
      this.cargada = true;
      this.info = data;
    });
  }

  private cargarEquipo() {
    this.http.get('https://portfolio-demo-d7899.firebaseio.com/equipo.json').subscribe((data: InfoTeam[]) => {
      this.team = data;
    });
  }
}
