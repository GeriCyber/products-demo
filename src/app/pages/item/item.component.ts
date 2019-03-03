import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductoCompleto } from 'src/app/interfaces/complete-product.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product: ProductoCompleto;
  id: string;

  constructor(private route: ActivatedRoute, public productService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe(info => {
      this.productService.getProduct(info['id']).
        subscribe((data: ProductoCompleto) => {
        this.product = data;
        this.id = info['id'];
      });
    });
  }

}
