import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {

  constructor(private sqlite: SQLite, private database: SQLiteObject) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db
      this.crearTablas();
      console.log('base de datos iniciada') 
    }).catch(e => console.log(JSON.stringify(e)));
  }

  crearTablas(){
    this.database.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(NOMBRE VARHCAR(50), CLAVE VARCHAR(50))')
    .then(() => console.log('tabla creada'))
    .catch(e => alert(JSON.stringify(e)));
  }
 
}
