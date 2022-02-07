import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.scss']
})
export class ModelPopupComponent implements OnInit {
  @Input() modelProperty: string;
  constructor() { }

  ngOnInit() {
  }

}
