import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AlertController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario:any = JSON.parse(localStorage.getItem('usuario'));

  constructor(private router: Router, private res: ApiService, public navCtrl: NavController,private alertController: AlertController) { 

  }

  ngOnInit() {}

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que desea derrar su sesión?',
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
            localStorage.setItem('ingresado', 'false');
            this.router.navigate(['/login']);            
          },
        }        
      ]
    });
    await alert.present();
  }
}
