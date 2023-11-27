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

      this.firebaseSvc.singIn(this.formulario.value as usuario).then(respuesta => {

        this.getUSerInfo(respuesta.user.uid);
        
        this.formulario.reset();

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

  async getUSerInfo(id: string){

    const loading = await this.utilsSvc.loading();
    await loading.present();
    
    let path = `users/${id}`;

    this.firebaseSvc.getDocument(path).then((user: usuario) => {

      localStorage.setItem('usuario',JSON.stringify(user)); 
      localStorage.setItem('ingresado', 'true');       
      this.router.navigate(['/inicio']);
      
    }).finally(()=>{
      loading.dismiss();
    })
    this.formulario.reset();
  }

}