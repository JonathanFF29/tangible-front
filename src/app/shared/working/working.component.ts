import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/popups/login-popup/login-popup.component';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.scss']
})
export class WorkingComponent implements OnInit {

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

  OpenSignUpPopup(): void {
    const modalRef = this._modalService.open(LoginPopupComponent);

    modalRef.componentInstance.isSignup = true;
  }

}
