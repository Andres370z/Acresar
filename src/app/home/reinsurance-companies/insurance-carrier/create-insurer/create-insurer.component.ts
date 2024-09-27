import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public selectedOption: any;
  razonSocial: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getEntidades()
    this.createForm()
    //this.initial()


    let jsonData = sessionStorage.getItem('companiaR');
    if (jsonData != null) {
      console.log('ENTRÉ');
      
      const item = JSON.parse(jsonData);
      this.authService.getReaseguradoras(item['a'])
        .then((res: any) => {
          res = res[0];
          jsonData = res;

          this.dataRes = res;
          this.reaseguroData.nc = res.r2;
          this.reaseguroData.r2 = res.o2;
          this.reaseguroData.s = res.n;
          this.reaseguroData.ct = res.nc;
          this.reaseguroData.dr = res.c2;
          this.reaseguroData.ca = res.e;
          this.reaseguroData.nb = res.s;
          this.reaseguroData.e = res.e;
          this.reaseguroData.a2 = res.a2;
          this.reaseguroData.ct = res.r2;
          this.reaseguroData.rg = res.s2;
          this.reaseguroData.c = item.ac;
          this.reaseguroData.e = res.c;

          this.authService.getCountries().then((obj) => {
            for (let i = 0; i < obj.length; i++) {
              const p = obj[i];
              if (res.o == p.a) {
                console.log('ENTRA 1',);
                
                this.reaseguroData.pc = p.c;
                console.log('ENTRA 2', this.reaseguroData.pc)
              }

            }
          })
        }, err => {
          console.log(err);
        })
      console.log(">>>", this.reaseguroData);

    }
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
          "ag": 5,
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
          "p": this.reaseguroData.pc,
          "r": items.razonSocial,
          "rg": items.region,
        }
      };

      console.log('Objeto a enviar:', item);

      this.authService.RegisterForm(item).then((res: any) => {
        console.log('Respuesta del servidor:', res);
        this.alert.success('Ok', 'El corredor fue editado');
      }).catch((err) => {
        console.log('Error al enviar:', err);
        this.alert.error('Error', 'Error en el servidor');
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
    setTimeout(() => {
      this.exist = false;
    }, 0.5);  // Retraza el cambio en exist al siguiente ciclo
  }
}
