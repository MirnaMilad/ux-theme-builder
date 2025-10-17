import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'builder',
    pathMatch: 'full',
  },
  {
    path: 'builder',
    loadComponent: () =>
      import('./features/builder/builder.component').then(
        (m: typeof import('./features/builder/builder.component')) => m.BuilderComponent
      ),
  },
  {
    path: 'preview',
    loadComponent: () =>
      import('./features/preview/preview.component').then(
        (m: typeof import('./features/preview/preview.component')) => m.PreviewComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'builder',
  },
];
