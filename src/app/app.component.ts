import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Mi cuenta', url: 'micuenta', icon: 'person' },
    { title: 'Escanear QR', url: 'qr', icon: 'qr-code' },
    { title: 'Profesores', url: 'profesores', icon: 'people' },
    { title: 'Ajustes', url: 'ajustes', icon: 'settings' },
  ];
  public labels = ['Reminders'];
  constructor(private router: Router,private alertController: AlertController) {}

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que desea cerrar su sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('El usuario canceló');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/login']); 
            localStorage.setItem('ingresado', 'false'); 
          },
        }        
      ]
    });
    await alert.present();
  }
}
