import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar',
  templateUrl: './cambiar.page.html',
  styleUrls: ['./cambiar.page.scss'],
})
export class CambiarPage implements OnInit {

  constructor(private router: Router,public Alert: AlertController) { }

  ngOnInit() {
  }

  actualizar(){
    this.mostrarAlerta();
  }

  async mostrarAlerta() {
    const alert = await this.Alert.create({
      header: 'Contraseña actualizada',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/ajustes']);
          }
        }
      ]
    });

    await alert.present();
  }

}
