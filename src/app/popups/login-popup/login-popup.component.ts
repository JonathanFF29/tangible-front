import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GENDERS, CAREERS, DEFAULT_COUNTRY, DEFAULT_CITY } from 'src/app/data/shared.data';
import COUNTRIES from 'src/app/JSON/world-countries-cities.min.json';
import { regex_email } from 'src/app/data/regex.data';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/models/shared.model';
import { AuthenticacionService } from 'src/app/services/firebase/authenticacion.service';
import { UtilService } from 'src/app/shared/services/util.service';

const maxYears: number = 90;
const messageErrorForm: string = "No has ingresado correctamente todos los campos";
const messageLoading: string = "Cargando...";
const messageSuccess: string = "Se ha enviado un correo de confirmación a tu dirección de correo electrónico.";
const messageError: string = "Lo sentimos. Ha ocurrido un error al intentar registrarte";
const messageAlreadyRegistered: string = "Ya te has registrado en nuestra base de datos. Se ha enviado un correo de confirmación a tu dirección de correo electrónico.";

interface Alert {
  type: string;
  message: string;
  button: boolean;
}

const ALERT1: Alert = {
  type: 'danger',
  message: 'Este usuario no existe.',
  button: false
}
const ALERT2: Alert = {
  type: 'danger',
  message: 'Contraseña incorrecta.',
  button: false
}
const ALERT3: Alert = {
  type: 'info',
  message: 'La cuenta no ha sido confirmada.',
  button: false
}
const ALERT4: Alert = {
  type: 'success',
  message: 'Correo de confirmación enviado.',
  button: false
}
const ALERT5: Alert = {
  type: 'info',
  message: 'Se ha enviado un correo a la dirección suministrada para restablecer tu contraseña',
  button: false
}
const ALERT6: Alert = {
  type: 'info',
  message: 'Este usuario está registrado con Gmail',
  button: false
}
const ALERT7: Alert = {
  type: 'info',
  message: 'Este usuario está registrado con Facebook',
  button: false
}

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  @Input() isSignup: boolean = false;

  alerts: Alert[];

  genders: Array<string>;
  careers: Array<string>;
  countries;

  formLogin: FormGroup;
  formSignup: FormGroup;

  minDate: NgbDateStruct;
  todayDate: NgbDateStruct;

  message: string;

  success: boolean;
  messageSuccess: string;
  datosUsuario: any;

  constructor(private _fb: FormBuilder, private _authService: AuthService,
    private _activeModal: NgbActiveModal, private _calendar: NgbCalendar,
    private utilService: UtilService, private authenticacionService: AuthenticacionService) {
    this.SetDates();

    this.alerts = [];

    this.formLogin = _fb.group({
      email: ['', [Validators.required, Validators.pattern(regex_email)]],
      password: ['', [Validators.required]]
    })

    this.formSignup = _fb.group({
      email: ['', [Validators.required, Validators.pattern(regex_email)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required,]], //verify
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: [''],
      birthdate: [''],
      country: [''],
      city: [''],
      profession: ['']
    }, { validator: this.ValidatePassword });
  }

  private SetDates(): void {
    this.todayDate = this._calendar.getToday();
    this.minDate = this._calendar.getToday();
    this.minDate.year -= maxYears;
  }

  ngOnInit() {
    this.success = false;
    this.messageSuccess = messageSuccess;

    if (this.isSignup)
      this.GoToSignup();
    else
      this.GoToLogin();

    this.genders = GENDERS;
    this.countries = COUNTRIES;
    this.careers = CAREERS;
  }

  Login(): void {
    if (this.formLogin.valid) {
      this.message = messageLoading;

      this._authService.Login(this.formLogin.value).subscribe((r) => {
        console.log(r);
        this.success = true;
        sessionStorage.setItem("accessToken", JSON.parse(JSON.stringify(r)).accessToken);
        this.getUserInfo();
        this.Close();
      }, error => {
        let dataError: ErrorResponse = error.error;

        this.message = (dataError.errno == 1062) ?
          messageAlreadyRegistered : messageError;

        console.log(dataError);
        if (JSON.parse(JSON.stringify(dataError)) === "The user doesn't exists") {
          this.alerts = [];
          this.showAlert(ALERT1);
        }
        if (JSON.parse(JSON.stringify(dataError)).message === "Incorrect password") {
          this.alerts = [];
          this.showAlert(ALERT2);
        }
        if (JSON.parse(JSON.stringify(dataError)) === "The user hasn't been confirmed") {
          this.alerts = [];
          this.showAlert(ALERT3);
        }
      })
    }
    else {
      this.message = messageErrorForm;
    }
  }

  getUserInfo(): void {
    this._authService.getUserInfo().subscribe((r) => {
      this.datosUsuario = r;
      localStorage.setItem("userInfo", JSON.stringify(r));
      this.utilService.changeData({name: this.datosUsuario.name});
      this.signinWithEmail();
    }, error => {
      let dataError: ErrorResponse = error.error;

      this.message = (dataError.errno == 1062) ?
        messageAlreadyRegistered : messageError;
    })
  }

  Signup(): void {
    if (this.formSignup.valid) {
      this.message = messageLoading;

      this._authService.Signup(this.formSignup.value).subscribe((r) => {
        //this.success = true;
        sessionStorage.setItem("accessToken", JSON.parse(JSON.stringify(r)).accessToken);
        localStorage.setItem("userInfo", JSON.stringify(this.formSignup.value));
        this.signUpFirebaseEmailGenerico();
        this.utilService.changeData({name: this.formSignup.controls['name'].value});
        //this.loading = false;
        this.message = messageSuccess;
      }, error => {
        let dataError: ErrorResponse = error.error;

        this.message = (dataError.errno == 1062) ?
          messageAlreadyRegistered : messageError;

        console.log(dataError);
      })
    } else {
      this.message = messageErrorForm;
    }
  }

  RecoverPassword(): void {
    const email = this.formLogin.controls['email'].value;

    this._authService.VeifyUserSN(email).subscribe((r) => {
      let socialNetworks = JSON.parse(JSON.stringify(r)).socialNetworks;
      if (socialNetworks.isGoogle == 1) {
        this.alerts = [];
        return this.showAlert(ALERT6);
      }
      if (socialNetworks.isFacebook == 1) {
        this.alerts = [];
        return this.showAlert(ALERT7);
      }
      this.alerts = [];
      this.showAlert(ALERT5);
      this.authenticacionService.SendEmailResetPwd(email);
    }, error => {
      let dataError = error.error;
      if (dataError.message == "The user doesn't exists") {
        this.alerts = [];
        this.showAlert(ALERT1);
      }
    })
  }

  ChangedCountry(country: string): void {
    this.ControlSG('city').setValue(this.countries[country][0]);
  }

  GoToSignup(): void {
    this.isSignup = true;
  }

  GoToLogin(): void {
    this.isSignup = false;
  }

  ResendEmail(): void {
    if (this.ControlLG("email")) {
      this.message = messageLoading;

      let formResendEmail = this._fb.group({
        email: [this.ControlLG("email").value, [Validators.required, Validators.pattern(regex_email)]]
      });

      this._authService.ResendConfirmationEmail(formResendEmail.value).subscribe((r) => {
        console.log(r);
        if (JSON.parse(JSON.stringify(r.message)) === "Email sent successfully") 
          this.showAlert(ALERT4);
      }, error => {
        let dataError: ErrorResponse = error.error;

        this.message = (dataError.errno == 1062) ?
          messageAlreadyRegistered : messageError;

        console.log(dataError);
        if (JSON.parse(JSON.stringify(dataError)) === "The user doesn't exists")
          this.showAlert(ALERT1);
        if (JSON.parse(JSON.stringify(dataError)).message === "Incorrect password")
          this.showAlert(ALERT2);
        if (JSON.parse(JSON.stringify(dataError)) === "The user hasn't been confirmed")
          this.showAlert(ALERT3);
      })
    }
    else {
      this.message = messageErrorForm;
    }
  }

  Close(): void {
    this._activeModal.dismiss('Dismiss');
  }

  InvalidControlSG(name: string): boolean {
    return this.ControlSG(name).invalid && this.ControlSG(name).touched;
  }

  ControlLG(name: string) {
    return this.formLogin.get(name);
  }

  ControlSG(name: string) {
    return this.formSignup.get(name);
  }

  private ValidatePassword(group: FormGroup) {
    let pass1 = group.get("password");
    let pass2 = group.get("password2");
    let error = { invalidPass: true };

    if (pass1.value != pass2.value) {
      pass2.setErrors(error);
      return error; //error
    }

    return null;
  }

  signUpFirebaseEmailGenerico() {
    this.authenticacionService.SignUp(this.formSignup.controls['email'].value, this.formSignup.controls['password'].value);
  }

  signinWithEmail() {
    this.authenticacionService.SignIn(this.formLogin.controls['email'].value, this.formLogin.controls['password'].value);
  }

  signUpFirebaseGoogle() {
    this.authenticacionService.SigninWithGoogle();
    this._activeModal.dismiss('Dismiss');
  }

  signUpFirebaseFacebook() {
    this.authenticacionService.FacebookAuth();
    this._activeModal.dismiss('Dismiss');
  }

  showAlert(alert: Alert) {
    this.alerts = [];
    this.alerts.push(alert);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
