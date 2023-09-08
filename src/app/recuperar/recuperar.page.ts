import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  usuario = '';
  clave = '';

  constructor(private alertController: AlertController,private router: Router) { }

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
      this.irLogin();
    }
    else {
      this.Alerta();
    }    
  }
  irLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
