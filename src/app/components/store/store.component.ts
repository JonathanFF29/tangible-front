import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/models/shared.model';
import { LoadCategoriesService } from './services/load-categories.service';
import { Router } from '@angular/router';
import { AuthenticacionService } from 'src/app/services/firebase/authenticacion.service';
import { ModelsService } from 'src/app/services/models.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  categoryArrays: Array<Array<object>>;

  constructor(private _authService: AuthService, public _loadCtg: LoadCategoriesService, private router: Router,
    private authenticacionService: AuthenticacionService,
    public modelsSvc: ModelsService) { }

  ngOnInit() {
    this.getCategories();
    this.router.navigate(['/tienda/descarga-de-modelos']);    
  }

  getCategories() {
    this._authService.GetCategories().subscribe((r) => {
      let categoriesResponse = JSON.parse(JSON.stringify(r)).categories;
      categoriesResponse.forEach(obj => obj.imageToShow = obj.imagePath);

      this._loadCtg.categorySelected["id"] = categoriesResponse[0]["id"];
      this._loadCtg.categorySelected["name"] = categoriesResponse[0]["name"];
      categoriesResponse[0]["imageToShow"] = categoriesResponse[0]["colorlessImagePath"];
      this._loadCtg.subcategorySelected["id"] = categoriesResponse[0]["subcategories"][0]["id"];
      this._loadCtg.subcategorySelected["name"] = categoriesResponse[0]["subcategories"][0]["name"];

      this.modelsSvc.getModelsBySubcategoryId(this._loadCtg.subcategorySelected["id"]);

      // https://flaviocopes.com/how-to-divide-array-js/ (lógica utilizada)
      const n = 7; // Categorías por slide
      this.categoryArrays = new Array(Math.ceil(categoriesResponse.length / n))
        .fill(0)
        .map(_ => categoriesResponse.splice(0, n))
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  onCategory(i, ctgId) {
    this.categoryArrays.forEach(array => {
      array.forEach(obj => {
        if (obj["id"] !== this._loadCtg.categorySelected["id"] && obj["imageToShow"] === obj["colorlessImagePath"])
          obj["imageToShow"] = obj["imagePath"];
      })
    })
    let category = this.categoryArrays[i].find(e => e["id"] === ctgId);
    category["imageToShow"] = category["colorlessImagePath"];
  }

  onMouseOutCategory(i, ctgId) {
    let category = this.categoryArrays[i].find(e => e["id"] === ctgId);
    if (category["id"] !== this._loadCtg.categorySelected["id"])
      category["imageToShow"] = category["imagePath"];
  }

  selectSubCategory(categoryId, categoryName, subcategoryId, subcategoryName) {
    let category = {
      id: categoryId,
      name: categoryName
    }
    let subCategory = {
      id: subcategoryId,
      name: subcategoryName
    }
    this._loadCtg.p = 1;
    this._loadCtg.categorySelected = category;
    this._loadCtg.subcategorySelected = subCategory;
    this.modelsSvc.getModelsBySubcategoryId(this._loadCtg.subcategorySelected["id"]);
    this.router.navigate(['/tienda/descarga-de-modelos']);
  }

}
