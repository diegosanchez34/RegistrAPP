import { Component, OnInit, OnDestroy} from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import {CameraSource} from '@capacitor/camera/dist/esm/definitions';
import { DomSanitizer } from '@angular/platform-browser';      
import { BrowserMultiFormatReader, Result } from '@zxing/library';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit, OnDestroy {

  asignatura: any;
  ancho = screen.width;
  decodedText: string = '';
  mostrarTexto: boolean = false;  
  mostrarCamara: boolean = false; 
  codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader();

  imageSource:any;

  constructor(private DomSanitizer: DomSanitizer) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.codeReader.reset();
  }
  

  scan() {
    this.mostrarCamara = !this.mostrarCamara;
    this.mostrarTexto = false;
    if(this.mostrarCamara){
      this.codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result: Result) => {
        console.log('Decoded Text:', result.getText());
        this.asignatura = JSON.parse(result.getText());
        this.mostrarTexto = true;
        this.mostrarCamara = false;
      })
      .catch((err) => {
        console.error('Error decoding:', err);
      });
    }   

     // this.takePicture();
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


