import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  form: FormGroup;
  entidades: any;
  idEdit: number = 0;
  url: any;
  paises: any;
  itemData: any;

  reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };

  public selectedOption: any;
  public selectedOptions: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPaises()
    this.getEntidades()
    this.createForm()
    this.initial()
    const dataJson = sessionStorage.getItem('companiaC');
    if (dataJson != null) {
      const data = JSON.parse(dataJson);
      this.idEdit = data.a;

      this.reaseguroData.c = data.a2;
      this.reaseguroData.na = data.c;
      this.reaseguroData.nt = data.r2;
      this.reaseguroData.te = data.c2;
      this.reaseguroData.dr = data.o;
      this.reaseguroData.c = data.n;
      this.reaseguroData.cc = data.pc;
      this.reaseguroData.r = data.l;
      this.reaseguroData.rg = data.s2;
      this.itemData = data;

    }
  }
  getPaises() {
    this.authService.getCountries().then((obj) => {
      console.log('paises: ', obj);
      this.paises = obj
    })
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
    });

  }
  getEntidades() {
    this.authService.getEntities().then((res: any) => {
      console.log('esta son las entidades, ', res)
      this.entidades = res
    })
  }
  initial() {
    console.log('2 exist')
    const data = JSON.parse(sessionStorage.getItem('companiaC'));
    if (data != null) {
      this.idEdit = data.a;
      console.log('1 exist')
      //Trae datos formulario
      this.form.controls.entidad.setValue(data.nc);
      this.form.controls.razonSocial.setValue(data.a2);
      this.form.controls.nombreAbreviado.setValue(data.c);
      this.form.controls.nit.setValue(data.r2);
      //this.form.controls.cod.setValue(cnt.o);
      this.form.controls.telefono.setValue(data.c2);
      this.form.controls.direccion.setValue(data.o);
      this.form.controls.contacto.setValue(data.n);
      this.form.controls.paisOrigen.setValue(data.pc);
      this.form.controls.estado.setValue(data.l);
      this.form.controls.region.setValue(data.s2);

      this.url = this.idEdit
    } else {
      this.url = "/corredores";
    }
  }
  create(item) {
    if (this.form.valid) {
      if (this.idEdit < 1) {
        item = {
          item: {
            "con": item.razonSocial,
            "d": item.direccion,
            "e": item.entidad,
            "es": 1,
            "na": item.nombreAbreviado,
            "ni": item.nit,
            "p": this.valorEncontrado,
            "r": item.contacto,
            "rg": item.region,
            "t": item.telefono,
            "u": item.estado,
          }
        }
        this.authService.postEditCorredores(item, this.url).then((res: any) => {
          this.alert.success('Ok', 'El corredor fue editado')
        }).catch((err) => {
          console.log(err);
          this.alert.error('Error', 'error en el servidor')
        });
      } else {
        const dataEdit = {
          "e": this.idEdit,
          "r": this.itemData['a2'],
          "na": item.nombreAbreviado,
          "ni": item.nit,
          "rg": item.region,
          "t": item.telefono,
          "te": item.telefono,
          "d": item.direccion,
          "con": item.razonSocial,
          "p": this.itemData['r'],
          "es": 1,
          "u": item.estado,
        }
        this.authService.putCorredor(this.idEdit, dataEdit).then((res: any) => {
          console.log('>>> 1',res);
          
          this.alert.success('Ok', 'En hora buena has editado el corredor')
          this.navigate('home/companias/corredor')

        }, err => {
          this.alert.error('Error', 'Error en el servidor')
        })

      }

    } else {
      this.alert.error('Error', 'Algo salio mal revisa todos los campos')
    }
  }
  navigate(item: string) {
    this.router.navigate([item])
  }
}
