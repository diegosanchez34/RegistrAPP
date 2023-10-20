import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario:any;
  data:any;

  constructor(private router: Router, private res: ApiService) { 

  }

  ngOnInit() {
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

  

}
