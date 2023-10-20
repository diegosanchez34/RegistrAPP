import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasededatosService } from '../basededatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
    localStorage.setItem('ingresado', 'false');
  }

  ngOnInit() {
    
  }

  async ingresar() {
    if (this.formularioLogin.valid) {
      var f = this.formularioLogin.value;
      var usuarioString = localStorage.getItem('usuario');

      if (usuarioString !== null) {
        var usuario = JSON.parse(usuarioString);

        if (usuario.nombre == f.nombre && usuario.password == f.password) {
          console.log('Ingresado');
          localStorage.setItem('ingresado', 'true');
          this.router.navigate(['/inicio']); // Redirigir a la página de inicio
        } else {
          const alert = await this.alertController.create({
            header: 'Datos incorrectos',
            message: 'Los datos que ingresaste son incorrectos.',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      } else {
        // Manejo de caso cuando no se encuentra el valor en localStorage
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
            message: 'Los datos ingresados son incorrectos.',
            buttons: ['Aceptar'],
        });
        await alert.present();
      }
    }
    else{
      const alert = await this.alertController.create({
        header: 'Ingrese datos',
        message: 'Ingrese sus credenciales para iniciar sesión',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

}