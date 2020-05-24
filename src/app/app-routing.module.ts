import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { MedicoComponent } from './pages/medicos/medico.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { AdminGuard } from './services/guards/admin.guard';
import { VerificaTokenGuard } from './services/guards/verifica-token.guard';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerificaTokenGuard],
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'graficas1',
        component: Graficas1Component,
        data: { titulo: 'Graficas' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajuste del Tema' },
      },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
