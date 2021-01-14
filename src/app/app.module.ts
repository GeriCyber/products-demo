import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { ProductCreateComponent } from './products/views/product-create/product-create.component';
import { ProductEditComponent } from './products/views/product-edit/product-edit.component';
import { ProductsListComponent } from './products/views/products-list/products-list.component';
import { InfoPageService } from './services/info-page.service';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        LoginComponent,
        ItemComponent,
        ProductsListComponent,
        ProductCreateComponent,
        ProductEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [InfoPageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
