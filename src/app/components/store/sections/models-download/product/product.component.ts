import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/models/shared.model';
import { LoadCategoriesService } from '../../../services/load-categories.service';
import { PaymentsService } from 'src/app/pages/payments/service/payments.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { ModelsService } from 'src/app/services/models.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface ModelInfo {
  id: string,
  name: string,
  description: string,
  sketchfabCode: string,
  zipPath: string,
  imagePath1: string,
  imagePath2: string,
  imagePath3: string
  price: number,
  likes: number,
  saved: number,
  shared: number,
  formats: Array<string>,
  tags: Array<string>,
  creator: string,
  companyDescription: string
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  index: number;
  modelInfo: ModelInfo;
  renderDiv;

  showRender: boolean = true;
  activeImage: string;

  modelsId: number;

  isFree: boolean;

  constructor(private route: ActivatedRoute, private _authService: AuthService, public _loadCtg: LoadCategoriesService,
    public paymentsService: PaymentsService, private matSnackBar: MatSnackBar,
    public modelsSvc: ModelsService, private http: HttpClient) { }

  ngOnInit() {
    document.getElementById("view").scrollIntoView();
    this.index = this.route.snapshot.params['id'];
    this.modelsId = this.modelsSvc.models.findIndex(obj => obj.id == this.index);

    this._authService.Get3DModelInfo(this.index).subscribe((r) => {
      let modelInfoResponse = JSON.parse(JSON.stringify(r)).modelInfo[0];
      let formatsResponse = JSON.parse(JSON.stringify(r)).formats;
      let tagsResponse = JSON.parse(JSON.stringify(r)).tags;

      this.modelInfo = {
        id: modelInfoResponse.id,
        name: modelInfoResponse.name,
        description: modelInfoResponse.description,
        sketchfabCode: modelInfoResponse.sketchfabCode,
        zipPath: modelInfoResponse.zipPath,
        imagePath1: modelInfoResponse.imagePath1,
        imagePath2: modelInfoResponse.imagePath2,
        imagePath3: modelInfoResponse.imagePath3,
        price: modelInfoResponse.price,
        likes: modelInfoResponse.likes,
        saved: modelInfoResponse.saved,
        shared: modelInfoResponse.shared,
        formats: [],
        tags: [],
        creator: modelInfoResponse.creator,
        companyDescription: modelInfoResponse.companyDescription
      }
      formatsResponse.forEach(element => {
        this.modelInfo.formats.push(element.format)
      });
      tagsResponse.forEach(element => {
        this.modelInfo.tags.push(element.name)
      });
      if(this.modelInfo.price > 0)
        this.isFree = false;
      else
        this.isFree = true;

      if (this.modelInfo.sketchfabCode) {
        this.renderSkfbCode();
      } else {
        this.showRender = false;
        this.activeImage = this.modelInfo.imagePath1;
      }
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  renderSkfbCode() {
    this.renderDiv = document.getElementById('modelRender');
    this.renderDiv.innerHTML = this.modelInfo.sketchfabCode;
    document.getElementsByTagName("iframe")[0].style.width = "100%";
  }

  loadMedia(media, image) {
    if (media === 'render') {
      this.showRender = true;
    }
    else {
      this.showRender = false;
      this.activeImage = eval('this.modelInfo.imagePath' + image);
    }
  }


  onLike() {
    let isLogged = localStorage.getItem("userInfo");
    if (isLogged !== null) {
      this._authService.SaveModelLike(this.index).subscribe(r => {
        let msg = JSON.parse(JSON.stringify(r)).message;

        if (msg === "Like saved successfully") {
          this.modelsSvc.models[this.modelsId].like = true;
          this.modelInfo['likes'] += 1;
          //Update localstroage
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          userInfo.likedModels.push(this.modelsSvc.models[this.modelsId].id);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else if (msg === "Like deleted successfully") {
          this.modelsSvc.models[this.modelsId].like = false;
          this.modelInfo['likes'] -= 1;
          //Update localstroage
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const index = userInfo.likedModels.indexOf(this.modelsSvc.models[this.modelsId].id);
          if (index > -1) {
            userInfo.likedModels.splice(index, 1);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          }
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

  onSave() {
    let isLogged = localStorage.getItem("userInfo");
    if (isLogged !== null) {
      this._authService.SaveModel(this.index).subscribe(r => {
        let msg = JSON.parse(JSON.stringify(r)).message;

        if (msg === "Favorite saved successfully") {
          this.modelsSvc.models[this.modelsId].saved = true;
          this.modelInfo['saved'] += 1;
          //Update localstroage
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          userInfo.savedModels.push(this.modelsSvc.models[this.modelsId].id);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else if (msg === "Favorite deleted successfully") {
          this.modelsSvc.models[this.modelsId].saved = false;
          this.modelInfo['saved'] -= 1;
          //Update localstroage
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const index = userInfo.savedModels.indexOf(this.modelsSvc.models[this.modelsId].id);
          if (index > -1) {
            userInfo.savedModels.splice(index, 1);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          }
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

  addCartList() {
    this.saveToCarList();
  }

  saveToCarList() {
    let isLogged = localStorage.getItem("userInfo");
    if (isLogged !== null) {
      this._authService.GetPurchasedModels().subscribe((r) => {
        let myModels = JSON.parse(JSON.stringify(r)).purchasedModels;
        const found = myModels.find(element => element.id == this.index);
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
          this.paymentsService.addCartlist(this.modelInfo);
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
        this.paymentsService.addCartlist(this.modelInfo);
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

  downloadFreeModel() {
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
          this.download();
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

  download() {
    this.downloadFile().subscribe(response => {
      let blob: any = new Blob([response], { type: 'application/x-zip-compressed' });
      const url = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = this.modelInfo.name;
      link.click();
      link.remove();
      this._authService.SaveFreeModel(this.index).subscribe((r) => {
        console.log(r)
      }, error => {
        let dataError: ErrorResponse = error.error;
        console.log(dataError);
      })
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  downloadFile(): any {
    const headers = new HttpHeaders()
    headers.set('responseType', 'blob');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Request-Method', '*');

    return this.http.get(this.modelInfo.zipPath, { headers: headers, responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
}
