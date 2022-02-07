import { Component, Inject, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _router: Subscription;

  constructor(private renderer: Renderer2, private router: Router, @Inject(DOCUMENT) private document: any, private element: ElementRef, public location: Location,
  private firestoreService : FirestoreService) {
  }

  @HostListener('window:scroll')
  hasScrolled() {
    var st = window.pageYOffset;
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    var navbar = document.getElementsByTagName('nav')[0];

    // If they scrolled down and are past the navbar, add class .headroom--unpinned.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      if (navbar.classList.contains('headroom--pinned')) {
        navbar.classList.remove('headroom--pinned');
        navbar.classList.add('headroom--unpinned');
      }
      // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
    } else {
      // Scroll Up
      //  $(window).height()
      if (st + window.innerHeight < document.body.scrollHeight) {
        // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
        if (navbar.classList.contains('headroom--unpinned')) {
          navbar.classList.remove('headroom--unpinned');
          navbar.classList.add('headroom--pinned');
        }
      }
    }

    lastScrollTop = st;
  };

  ngOnInit() {
    let data = {
      nombre: "prueba",
      url: "prueba"
    }
    this.firestoreService.createUser(data);
    var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
      }
      this.renderer.listen('window', 'scroll', (event) => {
        const number = window.scrollY;
        if (number > 150 || window.pageYOffset > 150) {
          // add logic
          navbar.classList.add('headroom--not-top');
        } else {
          // remove logic
          navbar.classList.remove('headroom--not-top');
        }
      });
    });
    this.hasScrolled();

    this.SetStyleFields(); //THIS HAS TO BE FIXED :S
  }

  //ESTO SE DEBE UBICAR EN OTRO LADO CUANDO YA ESTE PINTADO LOS CAMPOS ES PARA QUE AL HACER FOCUS EL BORDER DEL FIELD CAMBIE TAMBIEN :s
  private SetStyleFields(): void {
    let input_group = document.getElementsByClassName('input-group');

    for (let i = 0; i < input_group.length; i++) {

      input_group[i].children[1].addEventListener('focus', function () {
        input_group[i].classList.add('input-group-focus');
      });

      input_group[i].children[1].addEventListener('blur', function () {
        input_group[i].classList.remove('input-group-focus');
      });

    }
  }
}
