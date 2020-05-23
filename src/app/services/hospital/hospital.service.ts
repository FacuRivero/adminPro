import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  obtenerHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe( map( (resp:any) => {
      return resp.hospital;
    }))
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url).pipe(map(resp => {
      Swal.fire('Hospital borrado', 'El Hospital a sido eliminado correctamente', 'success');
      return true;
    }))
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, hospital).pipe(map((resp: any) => {

      Swal.fire('Hospital actualziado', hospital.nombre, 'success');
      return true;
     })
    )
  }

  crearHospital(nombre: string) {

    let hospital = new Hospital(nombre);

    let url = URL_SERVICIOS + '/hospital?token=' + this.usuarioService.token;

    return this.http.post(url, hospital).pipe( map( (resp: any) =>{
      Swal.fire('Hospital Creado', resp.nombre, 'success');
    }))

  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.hospitales;
    }))
  }






}
