import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/services/base/base.service';
import { SignupRequest, SignupFormValue, LoginRequest, LoginFormValue, UpdateUserInfoRequest, UpdateUserInfoFormValue, ResendEmailRequest, ResendEmailFormValue, LoginSocialNetworkFormValue, LoginSocialNetworkRequest } from '../models/auth.model';
import { DefaultResponse, FileData } from '../models/shared.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signupURL: string = "user/signup";
  private loginURL: string = "user/login";
  private userInfoURL: string = "user/getUserInfo";
  private updateUserInfoURL: string = "user/updateUserInfo";
  private resendConfiramtionEmailURL: string = "resendConfirmationEmail";
  private tagsURL: string = "user/getTags";
  private userTagsURL: string = "user/getUserTags";
  private addUserTagsURL: string = "user/addUserTags";
  private passwordRecoveryURL: string = "user/passwordRecovery";
  private verifyUserSNURL: string = "user/verifyUserSN";
  private verifyUserActiveURL: string = "user/verifyUserActive";
  private getCategoriesURL: string = "category";
  private get3dModelsURL: string = "3d-model/getModelsBySubcategoryId";
  private get3dModelInfoURL: string = "3d-model/getModelInfo";
  private getCompaniesURL: string = "3d-model/getCompanies";
  private getStylesURL: string = "3d-model/getTags";
  private getFormatsURL: string = "3d-model/getFormats";
  private saveModelLikeURL: string = "3d-model/saveLike";
  private getUserLikedModelsURL: string = "3d-model/getLikedModels";
  private saveModelURL: string = "3d-model/saveFavorite";
  private getUserSavedModelsURL: string = "3d-model/getSavedModels";
  private getFavoriteModelsURL: string = "3d-model/getFavoriteModels";
  private savePurchasedModelsURL: string = "3d-model/savePurchasedModels";
  private getPurchasedModelsURL: string = "3d-model/getPurchasedModels";
  private checkFreeModelsPerDayURL: string = "3d-model/checkFreeModelsPerDay";
  private saveFreeModelURL: string = "3d-model/saveFreeModel";

  constructor(private _http: BaseService, private _fb: FormBuilder) { }

  public Signup(data: SignupFormValue) {
    let request: SignupRequest = new SignupRequest(data);

    //let file: FileData = new FileData(); //acá vendría la imagen de perfil
    return this._http.PostFormData<SignupRequest, DefaultResponse>(this.signupURL, request, 0, false);
  }

  public Login(data: LoginFormValue) {
    let request: LoginRequest = new LoginRequest(data);

    //let file: FileData = new FileData(); //acá vendría la imagen de perfil
    return this._http.PostFormData<LoginRequest, DefaultResponse>(this.loginURL, request, 0, false);
  }

  public LoginSocialNetwork(data: LoginSocialNetworkFormValue) {
    let request: LoginSocialNetworkRequest = new LoginSocialNetworkRequest(data);

    //let file: FileData = new FileData(); //acá vendría la imagen de perfil
    return this._http.PostFormData<LoginSocialNetworkRequest, DefaultResponse>(this.loginURL, request, 0, false);
  }

  public getUserInfo() {
    return this._http.Get<DefaultResponse>(this.userInfoURL, 0, true);
  }

  public ResendConfirmationEmail(data: ResendEmailFormValue) {
    let request: ResendEmailRequest = new ResendEmailRequest(data);

    return this._http.PostFormData<ResendEmailRequest, DefaultResponse>(this.resendConfiramtionEmailURL, request, 0, false);
  }

  public updatedUserInfo(data: UpdateUserInfoFormValue) {
    let request: UpdateUserInfoRequest = new UpdateUserInfoRequest(data);

    //let file: FileData = new FileData(); //acá vendría la imagen de perfil
    return this._http.PostFormData<UpdateUserInfoRequest, DefaultResponse>(this.updateUserInfoURL, request, 0, true);
  }

  public getTags() {
    return this._http.Get<DefaultResponse>(this.tagsURL, 0, true);
  }

  public GetUserTags() {
    return this._http.Get<DefaultResponse>(this.userTagsURL, 0, true);
  }

  public AddUserTags(data: Array<number>) {
    let request = {
      tags: data
    };

    return this._http.Post<Object, DefaultResponse>(this.addUserTagsURL, request, 0, true);
  }

  public PasswordRecovery(email: string, pwd: string) {
    let request = {
      email,
      newPass: pwd
    }
    return this._http.Post<Object, DefaultResponse>(this.passwordRecoveryURL, request, 0, false);
  }

  public VeifyUserSN(email: string) {
    let request = {
      email
    }
    return this._http.Post<Object, DefaultResponse>(this.verifyUserSNURL, request, 0, false);
  }

  public VeifyUserActive(email: string) {
    let request = {
      email
    }
    return this._http.Post<Object, DefaultResponse>(this.verifyUserActiveURL, request, 0, false);
  }

  public GetCategories() {
    return this._http.Get<DefaultResponse>(this.getCategoriesURL, 0, false);
  }

  public Get3DModelsBySubcategoryId(categoryId: number) {
    let request = {
      categoryId
    }
    return this._http.Post<Object, DefaultResponse>(this.get3dModelsURL, request, 0, false);
  }

  public Get3DModelInfo(index: number) {
    let request = {
      index
    }
    return this._http.Post<Object, DefaultResponse>(this.get3dModelInfoURL, request, 0, false);
  }

  public GetCompanies() {
    return this._http.Get<DefaultResponse>(this.getCompaniesURL, 0, false);
  }

  public GetStyles() {
    return this._http.Get<DefaultResponse>(this.getStylesURL, 0, false);
  }

  public GetFormats() {
    return this._http.Get<DefaultResponse>(this.getFormatsURL, 0, false);
  }

  public SaveModelLike(modelId: number) {
    let request = {
      modelId
    }
    return this._http.Post<Object, DefaultResponse>(this.saveModelLikeURL, request, 0, true);
  }

  public GetUserLikedModels() {
    return this._http.Get<DefaultResponse>(this.getUserLikedModelsURL, 0, true);
  }

  public SaveModel(modelId: number) {
    let request = {
      modelId
    }
    return this._http.Post<Object, DefaultResponse>(this.saveModelURL, request, 0, true);
  }

  public GetUserSavedModels() {
    return this._http.Get<DefaultResponse>(this.getUserSavedModelsURL, 0, true);
  }

  public GetFavoriteModels() {
    return this._http.Get<DefaultResponse>(this.getFavoriteModelsURL, 0, true);
  }
  
  public SavePurchasedModels(modelIds: Array<number>) {
    let request = {
      modelIds
    }
    return this._http.Post<Object, DefaultResponse>(this.savePurchasedModelsURL, request, 0, true);
  }

  public GetPurchasedModels() {
    return this._http.Get<DefaultResponse>(this.getPurchasedModelsURL, 0, true);
  }

  public CheckFreeModelsPerDay() {
    return this._http.Get<DefaultResponse>(this.checkFreeModelsPerDayURL, 0, true);
  }

  public SaveFreeModel(modelId: number) {
    let request = {
      modelId
    }
    return this._http.Post<Object, DefaultResponse>(this.saveFreeModelURL, request, 0, true);
  }
}



