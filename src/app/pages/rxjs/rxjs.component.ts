import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {
    
    // this.regresaObservable()  
    // .subscribe(numero => { console.log(numero); },
    //     error => { console.log(error); },
    //     () => { console.log("termino"); }
    //   );

  }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<number> {
    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador += 1;

      const salida = {
        valor: contador
      }

        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

      }, 1000);

    }).pipe(
      map( resp => resp.valor )
    )
  }

}
