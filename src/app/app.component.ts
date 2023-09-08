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
    { title: 'QR', url: 'qr', icon: 'qr-code' },
    { title: 'Ajustes', url: 'ajustes', icon: 'settings' },
  ];
  public labels = ['Reminders'];
  constructor() {}
}
