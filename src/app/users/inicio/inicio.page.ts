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

  usuario:any;
  data:any;

  constructor(private router: Router, private res: ApiService, public navCtrl: NavController,private alertController: AlertController) { 

  }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
    }


    this.res.getPosts().subscribe((apirest:any)=>{this.data=apirest});
    // Recupera los datos del estado (state) de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const datos = navigation.extras.state;
      if (datos['variableAEnviar']) {
        this.usuario = datos['variableAEnviar'];
      }
    }
  }

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
            window.location.reload();
            this.router.navigate(['/login']);            
          },
        }        
      ]
    });
    await alert.present();
  }


}
