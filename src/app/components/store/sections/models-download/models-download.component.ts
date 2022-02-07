import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/models/shared.model';
import { LoadCategoriesService } from '../../services/load-categories.service';
import { AuthenticacionService } from 'src/app/services/firebase/authenticacion.service';
import { PaymentsService } from 'src/app/pages/payments/service/payments.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { ModelsService } from 'src/app/services/models.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-models-download',
  templateUrl: './models-download.component.html',
  styleUrls: ['./models-download.component.scss']
})
export class ModelsDownloadComponent implements OnInit {
  filterRefresh: boolean = false;
  companies = [];
  prices = [0, 24000, 48000];
  styles = [];
  formats = [];

  constructor(private _authService: AuthService, public _loadCtg: LoadCategoriesService, private authenticacionService: AuthenticacionService,
    public paymentsService: PaymentsService, public snackBar: MatSnackBar, private matSnackBar: MatSnackBar,
    public modelsSvc: ModelsService, private http: HttpClient) { }

  ngOnInit() {
    this._authService.GetCompanies().subscribe((r) => {
      this.companies = JSON.parse(JSON.stringify(r)).companies;
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
    this._authService.GetStyles().subscribe((r) => {
      this.styles = JSON.parse(JSON.stringify(r)).tags;
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })

    this._authService.GetFormats().subscribe((r) => {
      this.formats = JSON.parse(JSON.stringify(r)).formats;
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  onCompanyCheck(element, checked) {
    this.filterRefresh = !this.filterRefresh;
    if (checked){
      this._loadCtg.filterCompanies.push(element)
    }
    else {
      const index = this._loadCtg.filterCompanies.indexOf(element);
      if (index > -1) {
        this._loadCtg.filterCompanies.splice(index, 1);
      }
    }
  }

  onPriceCheck(element, checked) {
    this.filterRefresh = !this.filterRefresh;
    if (checked){
      this._loadCtg.filterPrices.push(element)
    }
    else {
      const index = this._loadCtg.filterPrices.indexOf(element);
      if (index > -1) {
        this._loadCtg.filterPrices.splice(index, 1);
      }
    }
  }

  onStyleCheck(element, checked) {
    this.filterRefresh = !this.filterRefresh;
    if (checked){
      this._loadCtg.filterStyles.push(element)
    }
    else {
      const index = this._loadCtg.filterStyles.indexOf(element);
      if (index > -1) {
        this._loadCtg.filterStyles.splice(index, 1);
      }
    }
  }

  onFormatCheck(element, checked) {
    this.filterRefresh = !this.filterRefresh;
    if (checked){
      this._loadCtg.filterFormats.push(element)
    }
    else {
      const index = this._loadCtg.filterFormats.indexOf(element);
      if (index > -1) {
        this._loadCtg.filterFormats.splice(index, 1);
      }
    }
  }

  addCartList(model) {
    let isLogged = localStorage.getItem("userInfo");
    if (isLogged !== null) {
      this._authService.GetPurchasedModels().subscribe((r) => {
        let myModels = JSON.parse(JSON.stringify(r)).purchasedModels;
        const found = myModels.find(element => element.id == model.id);
        if (found) {
          const message = 'Ya has adquirido este modelo, revisa tu perfil en la sección mis modelos';
          const icon = 'check_circle_outline';
          this.matSnackBar.openFromComponent(SnackbarComponent, {
            data: { message, snackType: icon },
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        } else {
          this.paymentsService.addCartlist(model);
          const message = 'Se agrego al carrito correctamente';
          const icon = 'shopping_cart';
          this.matSnackBar.openFromComponent(SnackbarComponent, {
            data: { message, snackType: icon },
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      }, error => {
        let dataError: ErrorResponse = error.error;
        console.log(dataError);
      })
    } else {
      const message = 'Por favor inicia sesión';
      const icon = 'login';
      this.matSnackBar.openFromComponent(SnackbarComponent, {
        data: { message, snackType: icon },
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
  }

  downloadFreeModel(model) {
    let isLogged = localStorage.getItem("userInfo");
    if (isLogged !== null) {
      this._authService.CheckFreeModelsPerDay().subscribe((r) => {
        let todaysModels = JSON.parse(JSON.stringify(r)).count;
        if (todaysModels >= 3) {
          const message = 'Lo sentimos, has excedido el límite de descargas gratuitas por hoy (3 modelos por día)';
          const icon = 'sentiment_dissatisfied';
          this.matSnackBar.openFromComponent(SnackbarComponent, {
            data: { message, snackType: icon },
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          })
        } else {
          this.download(model);
        }
      }, error => {
        let dataError: ErrorResponse = error.error;
        console.log(dataError);
      })
    } else {
      const message = 'Por favor inicia sesión';
      const icon = 'login';
      this.matSnackBar.openFromComponent(SnackbarComponent, {
        data: { message, snackType: icon },
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
  }

  download(model) {
    this.downloadFile(model).subscribe(response => {
      let blob: any = new Blob([response], { type: 'application/x-zip-compressed' });
      const url = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = model.name;
      link.click();
      link.remove();
      this._authService.SaveFreeModel(model.id).subscribe((r) => {
        console.log(r)
      }, error => {
        let dataError: ErrorResponse = error.error;
        console.log(dataError);
      })
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  downloadFile(model): any {
    const headers = new HttpHeaders()
    headers.set('responseType', 'blob');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Request-Method', '*');

    return this.http.get(model.zipPath, { headers: headers, responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

}
