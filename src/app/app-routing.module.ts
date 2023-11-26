import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { NotFoundPage } from './not-found/not-found.page';

//rutas entre páginas
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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./users/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'micuenta',
    loadChildren: () => import('./users/micuenta/micuenta.module').then( m => m.MicuentaPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'qr',
    loadChildren: () => import('./users/qr/qr.module').then( m => m.QrPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./users/ajustes/ajustes.module').then( m => m.AjustesPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'profesores',
    loadChildren: () => import('./users/profesores/profesores.module').then( m => m.ProfesoresPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'cambiar',
    loadChildren: () => import('./cambiar/cambiar.module').then( m => m.CambiarPageModule)
  },
  {
    path: '**',
    component: NotFoundPage,
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
