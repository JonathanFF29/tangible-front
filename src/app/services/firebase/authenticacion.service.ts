import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorResponse } from 'src/app/models/shared.model';
import { TagsPopupComponent } from 'src/app/popups/tags-popup/tags-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModelsService } from '../models.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticacionService {
  userData: Observable<firebase.User>;

  likedModels: Array<number>;

  constructor(private angularFireAuth: AngularFireAuth, private _fb: FormBuilder, private _authService: AuthService, private _modalService: NgbModal,
    private router: Router, private modelsSvc: ModelsService) {
    this.userData = angularFireAuth.authState;
  }

  public ResetPwd(code, email, password) {
    let result: boolean = false;
    this.angularFireAuth
      .confirmPasswordReset(code, password)
      .then(() => {
        this._authService.PasswordRecovery(email, password).subscribe((r) => {
          alert("La contraseña ha sido cambiada")
        }, error => {
          console.log(error);
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  public SendEmailResetPwd(email: string) {
    this.angularFireAuth.sendPasswordResetEmail(email).then(
      () => {
        console.log("Se ha enviado un correo para restablecer contraseña");
      },
      err => {
        console.log(err);
      }
    );
  }

  /* Sign up */
  public SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  public SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        this.getUserInfo();
        return res;
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
        return err;
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .signOut();
  }

  SigninWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider(), "isGoogle")
      .then(res => {
        console.log('Successfully logged in!', res);
      }).catch(error => {
        console.log(error)
      });
  }

  OAuthProvider(provider, socialNetwork: string) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((res) => {
        console.log("login google", res.additionalUserInfo.profile);
        localStorage.setItem('userInfo', JSON.stringify(res.additionalUserInfo.profile));

        let formSocialNetworks = this._fb.group({
          email: [JSON.parse(JSON.stringify(res.additionalUserInfo.profile)).email],
          password: ['password'],
          name: [JSON.parse(JSON.stringify(res.additionalUserInfo.profile)).name],
          socialNetwork: [socialNetwork]
        });

        this._authService.LoginSocialNetwork(formSocialNetworks.value).subscribe((r) => {
          sessionStorage.setItem("accessToken", JSON.parse(JSON.stringify(r)).accessToken);
          this.getUserInfo();
        }, error => {
          let dataError: ErrorResponse = error.error;
          console.log(dataError);
        })

      }).catch((error) => {
        window.alert(error)
      })
  }

  FacebookAuth() {
    return this.OAuthProvider(new auth.FacebookAuthProvider(), "isFacebook")
      .then(res => {
        console.log('Successfully logged in!', res)
      }).catch(error => {
        console.log(error)
      });
  }

  getUserInfo() {
    this._authService.getUserInfo().subscribe(async (r) => {
      let userInfo = JSON.parse(JSON.stringify(r));

      let p1 = new Promise((resolve, reject) => {
        this._authService.GetUserLikedModels().subscribe(r => {
          resolve(JSON.parse(JSON.stringify(r)).likedModels);
        }, error => {
          let dataError: ErrorResponse = error.error;
          console.log(dataError);
        })
      })
      let p2 = new Promise((resolve, reject) => {
        this._authService.GetUserSavedModels().subscribe(r => {
          resolve(JSON.parse(JSON.stringify(r)).savedModels);
        }, error => {
          let dataError: ErrorResponse = error.error;
          console.log(dataError);
        })
      })

      await Promise.all([p1, p2]).then(values => { 
        userInfo.likedModels = values[0];
        userInfo.savedModels = values[1];
      });

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      //this.getUserLikedModels();
      if(this.router.url.includes("/tienda/descarga-de-modelos")) 
        this.modelsSvc.fillLikedAndSavedModels();
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })

    
  }

  OpenTagsPopup() {
    this._authService.GetUserTags().subscribe((r) => {
      let responseUserTags = JSON.parse(JSON.stringify(r)).tags;
      if (responseUserTags.length === 0)
        this._modalService.open(TagsPopupComponent, { size: 'lg' });
    })
  }

  /*getUserLikedModels() {
    this._authService.GetUserLikedModels().subscribe(r => {
      this.likedModels = JSON.parse(JSON.stringify(r)).likedModels;
      if(this.router.url === "/tienda/descarga-de-modelos" || this.router.url === "descarga-de-modelos/:id") {
        this.likedModels.forEach(modelId => {
          let modelObj = this._loadCtg.models.find(element => element.id === modelId);
          modelObj.like = true;
        })
      }
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  getUserSavedModels() {
    this._authService.GetUserSavedModels().subscribe(r => {
      JSON.parse(JSON.stringify(r)).savedModels;
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }*/
}
