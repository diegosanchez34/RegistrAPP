import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  usuario = '';
  clave = '';

  constructor(private alertController: AlertController, private router: Router) { }

  async Alerta() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Nombre de usuario invalido',
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

  verificar(){
    if (this.usuario.length >= 3 && this.usuario.length  <= 8) {
      this.irHome();
    }
    else {
      this.Alerta();
    }    
  }

  irHome(){
    const variableAEnviar = this.usuario;
    // Navega a la página de destino con el estado (state)
    this.router.navigate(['/inicio'], {
      state: {
        variableAEnviar: variableAEnviar,
      },
    });
  }

  ngOnInit() {


    
  }

}
