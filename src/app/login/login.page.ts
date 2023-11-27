import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { usuario } from '../models/user.model';
import { UtilsService } from '../utils.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  tipo: string ="password";
  hide: boolean = true;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })  

  constructor(public Alert: AlertController,public navCtrl: NavController,private router: Router) {}

  ngOnInit() {}

  async ingresar(){
    if(this.form.controls.email.errors?.['required'] || this.form.controls.password.errors?.['required']){
      this.AlertaVacio();
    }
    else if(this.form.controls.email.errors?.['email'] ){
      this.AlertaEmail();
    }
    else {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.singIn(this.form.value as usuario).then(respuesta => {

        this.getUSerInfo(respuesta.user.uid);
        
        this.form.reset();

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

  ojito(){
    this.hide = !this.hide;
    if (this.hide)
      this.tipo = 'password';
    else
    this.tipo = 'text';
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
    this.form.reset();
  }

}