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

  ancho = screen.width;
  decodedText: string = '';
  codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader();

  imageSource:any;

  constructor(private DomSanitizer: DomSanitizer) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.codeReader.reset();
  }

  scan() {
    this.codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result: Result) => {
    console.log('Decoded Text:', result.getText());
    this.decodedText = result.getText();
  })
  .catch((err) => {
    console.error('Error decoding:', err);
  });

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

  mostrarImagenGenerada: boolean = false;

  mostrarImagen() {
    this.mostrarImagenGenerada = !this.mostrarImagenGenerada;
  }

}


