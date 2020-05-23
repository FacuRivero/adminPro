import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUloadService } from 'src/app/components/modal-upload/modal-uload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  totalRegistros: number = 0;
  desde: number = 0;

  constructor( public hospitalService: HospitalService,
                public modalUpload: ModalUloadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalUpload.notificacion.subscribe(
      resp => this.cargarHospitales())
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  mostrarModal(id: string) {
    this.modalUpload.mostrarModal('hospitales', id);
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = desde;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    })
  }

  borrarHospital(hospital: Hospital) {

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
      // confirmButtonText: 'Yes, delete it!'
    }).then((borrar) => {
      if (borrar.value === true) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(
          borrado => {
            this.cargarHospitales();
          }
        )
      }
    })

  }

  guardarHospital(hospital: Hospital, nombre: string) {


    hospital.nombre = nombre;
    console.log(hospital);

    this.hospitalService.actualizarHospital(hospital).subscribe();

  }

  crearHospital() {
    Swal.fire({
      title: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,

    }).then((result) => {
      if (result.value === '') {
        Swal.fire('Error al crear hospital', 'Debe ingresar el nombre', 'error');
        return;
      }
      if (result.dismiss) {
        return;
      }

      this.hospitalService.crearHospital(result.value).subscribe();
      this.cargarHospitales();
    })
  }

}
