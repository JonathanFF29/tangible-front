import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectKeysPipe } from 'src/app/pipes/object-keys.pipe';
import { UtilService } from 'src/app/shared/services/util.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [
    ObjectKeysPipe,
    SnackbarComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,

  ],
  exports: [
    ObjectKeysPipe,

  ],
  providers: [
    UtilService
  ],
})
export class SharedModule { }
