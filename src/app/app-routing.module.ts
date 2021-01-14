import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './pages/item/item.component';
import { ProductResolver } from './products/resolvers/product.resolver';
import { ProductsResolver } from './products/resolvers/products.resolver';
import { ProductCreateComponent } from './products/views/product-create/product-create.component';
import { ProductEditComponent } from './products/views/product-edit/product-edit.component';
import { ProductsListComponent } from './products/views/products-list/products-list.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard],
    },
    {
        path: 'products',
        component: ProductsListComponent,
        canActivate: [AuthGuard],
        resolve: {
            products: ProductsResolver,
        },
    },
    {
        path: 'products/create-product',
        component: ProductCreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'products/edit-product/:productId',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        resolve: {
            product: ProductResolver,
        },
    },
    { path: 'item/:id', component: ItemComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
