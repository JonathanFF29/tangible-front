import { Injectable } from '@angular/core';
import { ErrorResponse } from 'src/app/models/shared.model';
import { AuthService } from 'src/app/services/auth.service';

interface FilterModel {
  type: string,
  value: any,
  checked: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoadCategoriesService {
  filterPost = '';
  filterOptions: Array<FilterModel> = [];

  filterCompanies = [];
  filterPrices = [];
  filterStyles = [];
  filterFormats = [];

  categorySelected: object = {
    id: null,
    name: "...",
  };
  subcategorySelected: object = {
    id: null,
    name: "...",
  };

  models;
  public p: number;

  constructor(private _authService: AuthService) { }

}
