import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ routes } from './app-routing.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AdminEditUsersComponent } from './admin-edit-users/admin-edit-users.component';
import { AdminEditSingleUserComponent } from './admin-edit-single-user/admin-edit-single-user.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { OffersComponent } from './offers/offers.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileEditComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    AdminEditUsersComponent,
    AdminEditSingleUserComponent,
    AdminAddUserComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductDeleteComponent,
    ProductDetailComponent,
    ProductEditComponent,
    OffersComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
