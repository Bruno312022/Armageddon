import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'user-form',
    loadChildren: () => import('./Components/user-form/user-form.module').then(m => m.UserFormPageModule)
  },
  {
    path: 'user-form/:id',
    loadChildren: () => import('./Components/user-form/user-form.module').then(m => m.UserFormPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./Components/user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'evento-form',
    loadChildren: () => import('./Components/evento-form/evento-form.module').then( m => m.EventoFormPageModule)
  },
  {
    path: 'evento-form/:id',
    loadChildren: () => import('./Components/evento-form/evento-form.module').then( m => m.EventoFormPageModule)
  },
  {
    path: 'evento-list',
    loadChildren: () => import('./Components/evento-list/evento-list.module').then( m => m.EventoListPageModule)
  },
  {
    path: 'score',
    loadChildren: () => import('./Components/score/score.module').then( m => m.ScorePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
