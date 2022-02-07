import { Component, OnInit } from '@angular/core';
import { AuthenticacionService } from 'src/app/services/firebase/authenticacion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu-popup',
  templateUrl: './user-menu-popup.component.html',
  styleUrls: ['./user-menu-popup.component.scss']
})
export class UserMenuPopupComponent implements OnInit {
  datosUsuario: any;
  constructor(private authenticacionService: AuthenticacionService, private activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit() {
    this.datosUsuario = JSON.parse(localStorage.getItem("userInfo"));
  }

  cerrarSesion() {
    this.authenticacionService.SignOut();
    localStorage.clear();
    sessionStorage.clear();
    this.activeModal.dismiss('Dismiss');
    this.router.navigate(['inicio']);
  }

  Close(): void {
    this.activeModal.dismiss('Dismiss');
  }

}
