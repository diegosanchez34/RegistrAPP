import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  async irCambiar() {
    this.router.navigate(['/cambiar']);
  }
}
