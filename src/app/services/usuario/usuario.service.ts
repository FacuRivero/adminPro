import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  id: string;
  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient,
              public router: Router,
              public subirArchivo: SubirArchivoService) {
    this.cargarStorage();
   }

  estaLogueado() {
    return (this.token.length > 5 )? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe( map( (resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    )
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {
     const url = URL_SERVICIOS + '/login/google';
     return this.http.post(url, {token}).pipe(
       map((resp: any) => {
         this.guardarStorage(resp.id, resp.token, resp.usuario);
         return true;
       })
     );
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if(recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe( map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    })
    )
  }

  actualizarUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe( map( (resp: any) => {

        Swal.fire('Usuario actualziado', usuario.nombre, 'success');
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);

        return true;
      })
    )
  }

  cambiarImagen( archivo: File, id: string) {
    this.subirArchivo.subirArchivo( archivo, 'usuarios', id)
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;

      Swal.fire('Imagen Actualziada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch( resp=> {
      console.log(resp);
    })

  }


}
