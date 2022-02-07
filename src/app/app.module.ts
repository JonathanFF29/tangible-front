import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatButtonModule} from '@angular/material/button';

//shared
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
//import { ServicesComponent } from './components/services/services.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CartComponent } from './pages/cart/cart.component';

import { ArchitectureComponent } from './pages/services/architecture/architecture.component';
import { RepresentationComponent } from './pages/services/representation/representation.component';
import { ExperienceDesignComponent } from './pages/services/experience-design/experience-design.component';
import { SectionImageComponent } from './components/section-image/section-image.component';
import { HomeSectionArchitectureComponent } from './pages/home/sections/home-section-architecture/home-section-architecture.component';
import { HomeSectionRepresentationComponent } from './pages/home/sections/home-section-representation/home-section-representation.component';
import { HomeSectionSearchingComponent } from './pages/home/sections/home-section-searching/home-section-searching.component';
import { HomeSectionBlogsComponent } from './pages/home/sections/home-section-blogs/home-section-blogs.component';
import { HomeSectionStoreComponent } from './pages/home/sections/home-section-store/home-section-store.component';
import { HomeSectionTeamComponent } from './pages/home/sections/home-section-team/home-section-team.component';
import { LoginPopupComponent } from './popups/login-popup/login-popup.component';
import { WorkingComponent } from './shared/working/working.component';
import { HomeSectionCarouselComponent } from './pages/home/sections/home-section-carousel/home-section-carousel.component';
import { TagsPopupComponent } from './popups/tags-popup/tags-popup.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticacionService } from 'src/app/services/firebase/authenticacion.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserHomeComponent } from './pages/User/user-home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModelPopupComponent } from './popups/model-popup/model-popup.component';
import { MatCardModule } from '@angular/material/card';
import { UserMenuPopupComponent } from './popups/user-menu-popup/user-menu-popup.component';
import { MatIconModule, MatListModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirestorageService } from 'src/app/services/firebase/firestorage.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxPaginationModule } from 'ngx-pagination';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    //ServicesComponent,
    LaboratoryComponent,
    BlogComponent,
    AboutUsComponent,
    CartComponent,
    ArchitectureComponent,
    RepresentationComponent,
    ExperienceDesignComponent,
    SectionImageComponent,
    HomeSectionArchitectureComponent,
    HomeSectionRepresentationComponent,
    HomeSectionSearchingComponent,
    HomeSectionBlogsComponent,
    HomeSectionStoreComponent,
    HomeSectionTeamComponent,
    LoginPopupComponent,
    WorkingComponent,
    ModelPopupComponent,

    HomeSectionCarouselComponent,
    TagsPopupComponent,
    UserMenuPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NoopAnimationsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    MatMenuModule,
    NgxPaginationModule,

  ],
  providers: [AngularFirestore, AuthenticacionService, FirestorageService],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginPopupComponent,
    ModelPopupComponent,
    TagsPopupComponent,
    UserMenuPopupComponent,
    SnackbarComponent,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
