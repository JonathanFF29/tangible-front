import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from 'src/app/pages/payments/payments.component';
import { CartComponent } from 'src/app/pages/payments/cart/cart.component';


const routes: Routes = [
  { path: '', redirectTo: 'carroCompras', pathMatch: 'full' },
  { path: 'pagoPrincipal', component: PaymentsComponent },
  { path: 'carroCompras', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
