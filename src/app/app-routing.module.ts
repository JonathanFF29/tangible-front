import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from 'src/app/data/routes.data';

import { HomeComponent } from './pages/home/home.component';
import { LaboratoryComponent } from './pages/laboratory/laboratory.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CartComponent } from './pages/cart/cart.component';

import { ArchitectureComponent } from './pages/services/architecture/architecture.component';
import { RepresentationComponent } from './pages/services/representation/representation.component';
import { ExperienceDesignComponent } from './pages/services/experience-design/experience-design.component';
import { UserHomeComponent } from './pages/User/user-home.component';


const routes: Routes = [
  { path: '', redirectTo: ROUTES.home.path, pathMatch: 'full' },

  { path: ROUTES.home.path, component: HomeComponent },
  { path: ROUTES.laboratory.path, component: LaboratoryComponent },
  //{ path: ROUTES.store.path, component: ModelsDownloadComponent},
  { path: ROUTES.store.path, loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule)},
  { path: ROUTES.blog.path, component: BlogComponent },
  { path: ROUTES.aboutUs.path, component: AboutUsComponent },
  { path: ROUTES.cart.path, component: CartComponent },
  { path: ROUTES.userHome.path, loadChildren: () => import('./pages/User/user-home.module').then(m => m.UserHomeModule)},
  { path: ROUTES.payments.path, loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule)},
  { path: ROUTES.store.path, loadChildren: () => import('./pages/store/store.module').then(m => m.StoreModule)},


  {
    path: ROUTES.services.path, children: [
      { path: '', redirectTo: ROUTES.services.children.architecture.path, pathMatch: 'full' },
      { path: ROUTES.services.children.architecture.path, component: ArchitectureComponent },
      { path: ROUTES.services.children.representation.path, component: RepresentationComponent },
      { path: ROUTES.services.children.experienceDesign.path, component: ExperienceDesignComponent },
    ]
  },
  { path: ROUTES.services.children.architecture.path, redirectTo: ROUTES.services.path +"/"+ ROUTES.services.children.architecture.path },
  { path: ROUTES.services.children.representation.path, redirectTo: ROUTES.services.path +"/"+ ROUTES.services.children.representation.path },
  { path: ROUTES.services.children.experienceDesign.path, redirectTo: ROUTES.services.path +"/"+ ROUTES.services.children.experienceDesign.path },
  { path: '**', redirectTo: ROUTES.home.path, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
