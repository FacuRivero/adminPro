import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ModalUloadService } from 'src/app/components/modal-upload/modal-uload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  desde: number = 0;
  totalRegistros:number = 0;
  cargando: boolean = true;
  Swal: any;

  constructor(public usuarioService: UsuarioService,
              public modalUpload: ModalUloadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUpload.notificacion.subscribe(
      resp => this.cargarUsuarios() )
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;

      this.cargando = false;
    })
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if( desde >= this.totalRegistros) {
      return;
    }

    if(desde< 0) {
      return;
    }

    this.desde = desde ;
    this.cargarUsuarios();
  }

  buscarUsuario ( termino: string) {

    if(termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuarios( termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }

  borrarUsuario( usuario: Usuario) {
    if ( usuario._id === this.usuarioService.usuario._id ) {
      Swal.fire('Error al borrar usuario','No se puede borrar a si mismo', 'error')
      return
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
      // confirmButtonText: 'Yes, delete it!'
    }).then((borrar) => {
        if (borrar.value === true) {
          this.usuarioService.borrarUsuario(usuario._id).subscribe(
            borrado => {
              this.cargarUsuarios();
            }
          )
      }
    })

  }

  guardarUsuario( usuario: Usuario) {

    this.usuarioService.actualizarUsuario(usuario).subscribe();

  }

  mostrarModal(id: string) {
    this.modalUpload.mostrarModal( 'usuarios', id);
  }

}
