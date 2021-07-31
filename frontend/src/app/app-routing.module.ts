import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminEditSingleUserComponent } from './admin-edit-single-user/admin-edit-single-user.component';
import { AdminEditUsersComponent } from './admin-edit-users/admin-edit-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OffersComponent } from './offers/offers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsComponent } from './products/products.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit-profile/:id', component:ProfileEditComponent},
  {path: 'profile/:id', component:ProfileComponent},
  {path: 'admin-edit-users', component:AdminEditUsersComponent},
  {path: 'admin-edit-single-user/:id', component:AdminEditSingleUserComponent},
  {path: 'admin-add-user', component:AdminAddUserComponent},
  {path: 'products', component: ProductsComponent },
  {path: 'product-detail/:_id', component: ProductDetailComponent },
  {path: 'product-add', component: ProductAddComponent },
  {path: 'product-delete/:_id', component: ProductDeleteComponent},
  {path: 'product-edit/:_id', component: ProductEditComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'admin/orders', component: AdminOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
