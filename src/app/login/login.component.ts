import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  auth2: any;

  constructor(private router: Router,
            public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '824180926110-f2is3ovvpb7slt7favp07ec049s7f85d.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log(token);
  
      this.usuarioService.loginGoogle(token).subscribe( () => {
        window.location.href = '/dashboard';
      })

    });
  }

  ingresar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    let usuario = new Usuario( null, form.value.email, form.value.password );

    this.usuarioService.login(usuario, form.value.recuerdame)
    .subscribe( resp => {
      this.router.navigate(['/dashboard']);
    }, (err: any) => {
      console.log(err);
      Swal.fire('Error en el login', err.error.mensaje, 'error');
      return Observable.throw(err);
    })
  }
}
