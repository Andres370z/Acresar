import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-insurer',
  templateUrl: './create-insurer.component.html',
  styleUrls: ['./create-insurer.component.css']
})
export class CreateInsurerComponent implements OnInit {
  exist: boolean = false
  form: FormGroup;
  entidades: any;
  oficinas: any;
  idEdit: number = 0;
  url: any;
  reaseguroData = { a2: "", rg: "", ag: "", e: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
  dataRes: any;
  paises: any

  public selectedOption: any;
  razonSocial: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    
    this.getEntidades()
    this.createForm()
    this.getPaises()



  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      entidad: [Menssage.empty, Validators.compose([Validators.required])],
      razonSocial: [Menssage.empty, Validators.compose([Validators.required])],
      nombreAbreviado: [Menssage.empty, Validators.compose([Validators.required])],
      nit: [Menssage.empty, Validators.compose([Validators.required])],
      cod: [Menssage.empty, Validators.compose([Validators.required])],
      telefono: [Menssage.empty, Validators.compose([Validators.required])],
      direccion: [Menssage.empty, Validators.compose([Validators.required])],
      contacto: [Menssage.empty, Validators.compose([Validators.required])],
      paisOrigen: [Menssage.empty, Validators.compose([Validators.required])],
      estado: [Menssage.empty, Validators.compose([Validators.required])],
      region: [Menssage.empty, Validators.compose([Validators.required])],
      oficinaRepresentacion: [Menssage.empty, Validators.compose([Validators.required])],
      agenciaCalificadora: [Menssage.empty, Validators.compose([Validators.required])],
      calificacion: [Menssage.empty, Validators.compose([Validators.required])],
    });

  }
  valorEncontrado: number | null = null; // Variable para almacenar el valor encontrado

  buscarPais(pais: string) {
    const paisEncontrado = this.paises.find(p => p.c.toLowerCase() === pais.toLowerCase());

    if (paisEncontrado) {
      this.valorEncontrado = paisEncontrado.a; // Asigna el valor de 'a' si el país fue encontrado
      console.log(this.valorEncontrado);

    } else {
      this.valorEncontrado = null; // Si no lo encuentra, asigna null
      console.log('null', this.valorEncontrado);

    }
  }
  getEntidades() {
    this.authService.getEntities().then((res: any) => {
      console.log('esta son las entidades, ', res)
      this.entidades = res
    })
    const res = [
      { a: 1, c: 'SI' },
      { a: 1, c: 'NO' }
    ]
    this.oficinas = res
  }
  getPaises() {
    this.authService.getCountries().then((obj) => {
      console.log('paises: ', obj);
      this.paises = obj
    })
  }

  consulta(json) {
    this.alert.loading()
    console.log('LISTEN');
    const item = {
      item: {
        'module': 'reaseguradores',
        'razon': json,
      }

    };
    console.log('ITEM', item);
    this.authService.postRazonsocial(item).then((res: any) => {
      this.exist = true
      console.log('ESTE ES: ', this.exist);

      this.reaseguroData = res
      this.alert.messagefin()
    },
      err => {
        this.alert.error('Error en la consulta ', 'No se han podido cargar los datos prueba con otro...')
        console.log(err)
      }
    )
  }

  create(items) {
    console.log('Formulario:', this.form.value); // Verifica los datos del formulario
    console.log(this.reaseguroData.pc, 'DATA');

    if (this.form.valid) {
      const item = {
        "item": {
          "act": items.estado,
          "ag": 2,
          "c": "",
          "cl": items.calificacion,
          "cn": items.contacto,
          "cod": items.cod,
          "d": items.direccion,
          "e": items.entidad,
          "es": items.estado,
          "na": items.nombreAbreviado,
          "ni": items.nit,
          "of": items.oficinaRepresentacion,
          "p": this.valorEncontrado,
          "r": items.razonSocial,
          "rg": items.region,
        }
      };

      console.log('Objeto a enviar:', item);

      this.authService.RegisterForm(item).then((res: any) => {
        console.log('Respuesta del servidor:', res);
        this.alert.success('Ok', 'Nueva compañia creada');
        this.navigate('home/companias/reinsurer')
      }).catch((err) => {
        console.log('Error al enviar:', err);
        this.alert.success('Ok', 'Nueva compañia creada');
        this.navigate('home/companias/reinsurer')
         /**COREGIR RESPUESTA- CREA EL OBJETO PERO ARROJJA ERROR 500 */
        //this.alert.error('Error', 'Error en el servidor');
        
      });
    } else {
      this.alert.error('Error', 'Algo salió mal, verifica los campos');
    }
  }

  cargar(item: any) {
    this.form.controls.razonSocial.setValue(item.ca);
    this.form.controls.paisOrigen.setValue(item.pc);
    this.form.controls.estado.setValue(item.r2);
    this.form.controls.calificacion.setValue(item.s);
    this.form.controls.agenciaCalificadora.setValue(item.c);
    this.buscarPais(this.form.value.paisOrigen)

    setTimeout(() => {
      this.exist = false;
    }, 0.5);  // Retraza el cambio en exist al siguiente ciclo
  }
  navigate(item: string){
    this.router.navigate([item])
  }
}
