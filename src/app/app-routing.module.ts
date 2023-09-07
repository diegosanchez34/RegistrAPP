import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./users/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'micuenta',
    loadChildren: () => import('./users/micuenta/micuenta.module').then( m => m.MicuentaPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./users/qr/qr.module').then( m => m.QrPageModule)
  },  {
    path: 'ajustes',
    loadChildren: () => import('./users/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
