import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, withComponentInputBinding } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'details',
        loadChildren: () =>
          import('./details/details.module').then((m) => m.DetailsPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'details/:id', // <-- Add the :id parameter
        loadChildren: () => import('./details/details.module').then((m) => m.DetailsPageModule),
      },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
