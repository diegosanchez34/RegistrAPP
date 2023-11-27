import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { usuario } from '../models/user.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})

export class RestablecerPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })  

  constructor(public Alert: AlertController,public navCtrl: NavController,private router: Router) {}

  ngOnInit() {}

  async recuperar(){
    if(this.formulario.controls.email.errors?.['required']){
      this.AlertaVacio();
    }
    else if(this.formulario.controls.email.errors?.['email'] ){
      this.AlertaEmail();
    }
    else {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.formulario.value.email).then(respuesta => {
       
        this.formulario.reset();
        this.CorreoEnviado();

      }).catch(error => {
        console.log(error);
        this.AlertaError(error.message);
      }).finally(()=>{
        loading.dismiss();
      })
    }  
  }

  async AlertaVacio() {
    const alert = await this.Alert.create({
      header: 'Campos vacios',
      message: 'Ingrese todos los datos de usuario',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async AlertaEmail() {
    const alert = await this.Alert.create({
      header: 'Correo invalido',
      message: 'Ingrese una direccion de correo valida',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async AlertaError(mensaje: any) {
    const alert = await this.Alert.create({
      header: 'Credenciales Incorrectas',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async CorreoEnviado() {
    const alert = await this.Alert.create({
      header: 'Correo enviado',
      message: 'Te hemos enviado un correo con las instrucciones que debes seguir para cambiar tu contraseña',
      buttons: ['Aceptar']
    });
    await alert.present();    
    await this.router.navigate(['/login']);
  }

}