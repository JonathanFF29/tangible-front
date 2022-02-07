import { Component, OnInit } from '@angular/core';
import { FooterData } from 'src/app/models/footer.model';
import { FOOTER } from 'src/app/data/footer.data';
import { ALL_ROUTES } from 'src/app/data/routes.data';
import { Routes } from 'src/app/models/routes.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerData: FooterData;
  routes;

  constructor() { }

  ngOnInit() {
    this.footerData = FOOTER;
    this.routes = ALL_ROUTES;
  }

}
