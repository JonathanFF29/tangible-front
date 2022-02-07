import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorResponse } from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  models;

  constructor(private _authService: AuthService) { }

  getSavedModels() {
    this._authService.GetFavoriteModels().subscribe((r) => {
      this.models = JSON.parse(JSON.stringify(r)).models;
      this.models.forEach(obj => {
        obj.like = false;
        obj.saved = false;
      });

      let isLogged = localStorage.getItem("userInfo");
      if (isLogged !== null)
        this.fillLikedAndSavedModels();
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }
  
  getModelsBySubcategoryId(subcategorySelected) {
    this._authService.Get3DModelsBySubcategoryId(subcategorySelected).subscribe((r) => {
      this.models = JSON.parse(JSON.stringify(r)).models;
      this.models.forEach(obj => {
        obj.like = false;
        obj.saved = false;
      });

      let isLogged = localStorage.getItem("userInfo");
      if (isLogged !== null)
        this.fillLikedAndSavedModels();
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  fillLikedAndSavedModels() {
    let likedModels = JSON.parse(localStorage.getItem("userInfo")).likedModels;
    let savedModels = JSON.parse(localStorage.getItem("userInfo")).savedModels;

    likedModels.forEach(modelId => {
      let modelObj = this.models.find(element => element.id === modelId);
      if (modelObj) modelObj.like = true;
    });

    savedModels.forEach(modelId => {
      let modelObj = this.models.find(element => element.id === modelId);
      if (modelObj) modelObj.saved = true;
    });
  }

  onLike(modelId) {
    let isLogged = localStorage.getItem("userInfo");
      if (isLogged !== null) {
        this._authService.SaveModelLike(modelId).subscribe(r => {
          let msg = JSON.parse(JSON.stringify(r)).message;

          let model = this.models.find(obj => obj.id === modelId)
          if(msg === "Like saved successfully") {
            model.like = true;
            //Update localstroage
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            userInfo.likedModels.push(model.id);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          } else if(msg === "Like deleted successfully") {
            model.like = false;
            //Update localstroage
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const index = userInfo.likedModels.indexOf(model.id);
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
        alert("Por favor inicie sesión");
      }
  }

  onSave(modelId) {
    let isLogged = localStorage.getItem("userInfo");
      if (isLogged !== null) {
        this._authService.SaveModel(modelId).subscribe(r => {
          let msg = JSON.parse(JSON.stringify(r)).message;

          let model = this.models.find(obj => obj.id === modelId)
          if(msg === "Favorite saved successfully") {
            model.saved = true;
            //Update localstroage
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            userInfo.savedModels.push(model.id);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          } else if(msg === "Favorite deleted successfully") {
            model.saved = false;
            //Update localstroage
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const index = userInfo.savedModels.indexOf(model.id);
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
        alert("Por favor inicie sesión");
      }
  }
}
