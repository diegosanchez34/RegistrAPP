import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import {CameraSource} from '@capacitor/camera/dist/esm/definitions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  imageSource:any;

  constructor(private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source:CameraSource.Prompt,
      saveToGallery:false
    });

    this.imageSource=this.DomSanitizer.bypassSecurityTrustUrl(image.webPath ? image.webPath : "");
  }

  getPhoto(){
    return this.imageSource
  }


}


