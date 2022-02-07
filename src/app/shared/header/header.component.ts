import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

import { ROUTES, ROUTES_NAVIGATION } from 'src/app/data/routes.data';
import { Routes } from 'src/app/models/routes.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/popups/login-popup/login-popup.component';
import { AuthenticacionService } from 'src/app/services/firebase/authenticacion.service';
import { UserMenuPopupComponent } from 'src/app/popups/user-menu-popup/user-menu-popup.component';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/models/shared.model';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  datosUsuario: any;
  isactive: any;

  routesNavigation: Array<string>;
  routes: Routes;

  constructor(public location: Location, private router: Router, private _modalService: NgbModal, public authenticacionService: AuthenticacionService, private _authService: AuthService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.authenticacionService.userData.subscribe(res => {
      //console.log("firebase authState", res)
      if (res !== null) {
        this._authService.VeifyUserActive(JSON.parse(localStorage.getItem("userInfo")).email).subscribe((r) => {
          this.isactive = JSON.parse(JSON.stringify(r)).isActive;
          if (this.isactive === 1) {
            this.datosUsuario = JSON.parse(localStorage.getItem("userInfo")).name;
            this.authenticacionService.OpenTagsPopup();
          } else {
            this.datosUsuario = "recuerde activar su cuenta"
          }
        }, error => {
          let dataError: ErrorResponse = error.error;
          console.log(dataError);
        })
      } else {
        this.datosUsuario = 'Bienvenido(a)';
      }
    })

    this.routesNavigation = ROUTES_NAVIGATION;
    this.routes = ROUTES;

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.utilService.currentData.subscribe(data => this.datosUsuario = data);
  }

  OpenLoginPopup(): void {
    const modalRef = this._modalService.open(LoginPopupComponent);
    //const modalRef = this._modalService.open(TagsPopupComponent, { size: 'lg' });

    // CUANDO ESTE REALIZADO EL LOGIN MANDAR EN FALSE PARA QUE MUESTRE PRIMERO LOGIN Y LUEGO REGISTRO
    modalRef.componentInstance.isSignup = false;
  }

  OpenMenuUserPopup(): void {
    const modalRef = this._modalService.open(UserMenuPopupComponent, { size: 'sm', windowClass: 'myCustomModalClass' });
  }

  OpenUserMenu() {
    this.router.navigate(['user-home/usuario']);
  }
}
