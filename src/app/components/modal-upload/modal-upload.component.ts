import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUloadService } from './modal-uload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUloadService) { }

  ngOnInit(): void {
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      return;
    }

    console.log(archivo);
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
    console.log(this.imagenTemp);
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUploadService.ocultarModal()
  }


  subirArchivo() {
    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( resp => {
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
        console.log(resp);
      })
      .catch( err => {
        console.log("Error en la carga");
      })
  }

}
