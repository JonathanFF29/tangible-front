import { Component, OnInit, Input } from '@angular/core';
import { HomeSection } from 'src/app/models/home.model';

@Component({
  selector: 'app-section-image',
  templateUrl: './section-image.component.html',
  styleUrls: ['./section-image.component.scss']
})
export class SectionImageComponent implements OnInit {
  @Input() homeSection: HomeSection;

  constructor() { }

  ngOnInit() {

  }

  OpenLink(url: string){
      window.open(url, "_blank");
  }


}
