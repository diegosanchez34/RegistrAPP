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

  usuario:any = JSON.parse(localStorage.getItem('usuario'));

  constructor(private router: Router, private res: ApiService, public navCtrl: NavController,private alertController: AlertController) { 

  }

  ngOnInit() {}
}
