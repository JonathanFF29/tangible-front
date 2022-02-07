import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { Routes, RouterModule } from '@angular/router';
import { ModelsDownloadComponent } from './sections/models-download/models-download.component';
import { ProductComponent } from './sections/models-download/product/product.component';

const routes: Routes = [
  {
    path: '', 
    component: StoreComponent,
    children: [
      { path: 'descarga-de-modelos', component: ModelsDownloadComponent },
      { path: 'descarga-de-modelos/:id', component: ProductComponent },
    ]
  }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
