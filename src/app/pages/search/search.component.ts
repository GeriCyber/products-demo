import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, public service: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe(info => {
      this.service.searchProduct(info['text']);
    });
  }

}
