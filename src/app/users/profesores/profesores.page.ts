import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {
  data:any;
  
  constructor(private res: ApiService) { 
    this.res.getPosts().subscribe((apirest:any)=>{this.data=apirest});
  }

  ngOnInit() {
    
  }

}
