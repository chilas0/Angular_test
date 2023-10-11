import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    loadComponent:async() => 
    (await import("./pages/home-page/home-page.component")).HomePageComponent
  },
  {
    path: 'view-recipe/:id',
    loadComponent:async() => 
    (await import("./pages/view-recipe/view-recipe.component")).ViewRecipeComponent
  },
  {
    path: '**', pathMatch: "full", redirectTo: "/"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
