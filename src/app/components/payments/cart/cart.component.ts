import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/pages/payments/service/payments.service';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { ErrorResponse } from 'src/app/models/shared.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [Md5]
})
export class CartComponent implements OnInit {
  listaProductos: any = [];
  total: number;
  fileDescargar: any;
  datosUsuario: any;
  referenceCode: any;
  signatureNormal: any;

  constructor(public paymentService: PaymentsService, private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar, private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.total = 0;
    this.listaProductos = this.paymentService.listaProductos;
    if (this.listaProductos.length > 0) {
      this.listaProductos.forEach(element => {
        this.total = this.total + element.price
      });
      sessionStorage.setItem('productoComprar', JSON.stringify(this.listaProductos));
    } else {
      this.listaProductos = JSON.parse(sessionStorage.getItem('productoComprar'));
      if (!this.listaProductos)
        this.listaProductos = this.paymentService.listaProductos
      else {
        this.paymentService.listaProductos = this.listaProductos;
        this.listaProductos.forEach(element => {
          this.total = this.total + element.price
          sessionStorage.setItem('productoComprar', JSON.stringify(this.listaProductos));
        });
      }

    }

    this.activatedRoute.queryParams.subscribe(params => {
      const messagep = params['message'];
      if (messagep === 'APPROVED') {
        this.saveModels();
      }
    })
  }

  saveModels() {
    let modelsToSave = [];
    this.listaProductos.forEach(element => {
      modelsToSave.push(element.id);
    });
    this._authService.SavePurchasedModels(modelsToSave).subscribe((r) => {
      console.log(r)
      const message = 'Gracias por tu compra, ya puedes descargar tus modelos';
      const icon = 'insert_emoticon';
      this.matSnackBar.openFromComponent(SnackbarComponent, {
        data: { message, snackType: icon },
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      })
      this.listaProductos.forEach(element => {
        this.deleteModel(element);
      });
      this.router.navigate(['/user-home/usuario']);
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  deleteModel(product) {
    this.paymentService.deleteModelList(product);
    this.total = 0;
    this.listaProductos = this.paymentService.listaProductos;
    this.listaProductos.forEach(element => {
      this.total = this.total + element.price
    });
    sessionStorage.setItem('productoComprar', JSON.stringify(this.listaProductos));
  }

  paymentvalues() {
    sessionStorage.setItem('productoComprar', JSON.stringify(this.listaProductos));
    const date = new Date();
    const formatDate = date.toISOString();
    this.referenceCode = 'tangible' + formatDate + '/' + Math.floor(Math.random() * 100000000);
    const signatureNor = 'ut33G8HO4g1sU5IS9z7eyrP5uE' + '~' + '893354' + '~' + this.referenceCode + '~' + this.total + '~' + 'COP'; // test apikey  == 4Vj8eK4rloUd272L48hsrarnUA
    const hash2 = Md5.hashStr(signatureNor);
    this.signatureNormal = hash2.toString();
    this.datosUsuario = JSON.parse(localStorage.getItem('userInfo'));
    if (this.datosUsuario === null){
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

  buy() {
    this.paymentvalues();
    if (this.referenceCode && this.signatureNormal && this.datosUsuario && this.listaProductos.length > 0) {
      setTimeout(function () {
        var comprar = document.getElementById('idcomprar');
        comprar.click();
      }, 500);
    }
  }

}
