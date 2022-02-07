import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { ModelsDownloadComponent } from './sections/models-download/models-download.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';
import { ProductComponent } from './sections/models-download/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { CompanyFilterPipe } from 'src/app/pipes/company-filter.pipe';
import { FormatFilterPipe } from 'src/app/pipes/format-filter.pipe';
import { StyleFilterPipe } from 'src/app/pipes/style-filter.pipe';
import { PriceFilterPipe } from 'src/app/pipes/price-filter.pipe';



@NgModule({
  declarations: [StoreComponent,
    ModelsDownloadComponent,
    ProductComponent,
    FilterPipe,
    CompanyFilterPipe,
    PriceFilterPipe,
    StyleFilterPipe,
    FormatFilterPipe,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxPaginationModule,
    MatCheckboxModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class StoreModule { }
