import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario' ): unknown {
    
    let url = URL_SERVICIOS + '/img';
    if (!img) {
    return url + '/usuarios/xx';
  }
    if (img.includes('google')) {
      // console.log(img);
      // img = img.replace('//https://', '');
      // console.log(img);
      return img;
    }
    switch (tipo) {
    case 'usuario':
      url += '/usuarios/' + img;
      break;

    case 'medico':
      url += '/medicos/' + img;
      break;

    case 'hospital':
      url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo imagen no existe, usuario,medico,hospital');
        url += '/usuarios/xx';
  }
    return url;
  }

}
