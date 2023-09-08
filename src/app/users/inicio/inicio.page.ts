import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario:any;
  constructor(private router: Router) { 

  }

  ngOnInit() {
    // Recupera los datos del estado (state) de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const datos = navigation.extras.state;
      if (datos['variableAEnviar']) {
        this.usuario = datos['variableAEnviar'];
      }
    }
  }

}
