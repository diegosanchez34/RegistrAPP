import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Mi cuenta', url: 'micuenta', icon: 'person' },
    { title: 'QR', url: 'qr', icon: 'phone-landscape' },
    { title: 'Configuraciones', url: 'ajustes', icon: 'build' },
    
  ];
  public labels = ['Reminders'];
  constructor() {}
}
