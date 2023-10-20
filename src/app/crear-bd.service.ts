import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CrearBDService {

  constructor(private platform: Platform, private sqlite: SQLite, private database: SQLiteObject) { }

  crearBD(){
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'database.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        alert('base de datos iniciada');      
        this.crearTablas();
      }).catch(e => alert(JSON.stringify(e)));
    })
  }

  crearTablas(){
    this.database.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(NOMBRE VARHCAR(50), CLAVE VARCHAR(50))')
    .then((result) => alert('table created'))
    .catch(e => alert(JSON.stringify(e)));
  }
}
