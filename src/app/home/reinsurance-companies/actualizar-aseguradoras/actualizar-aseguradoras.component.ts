import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-actualizar-aseguradoras',
  templateUrl: './actualizar-aseguradoras.component.html',
  styleUrls: ['./actualizar-aseguradoras.component.css']
})
export class ActualizarAseguradorasComponent implements OnInit {
  form: FormGroup;
  entidades: any;
  idEdit: number = 0;
  url: any;
  type = "";
  itemData = { c: '', pc: '', s: '', ca: '', sa: '', cxa: '', ra: '', e: '', cc: '', r: '' };
  reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
  paises: any
  selectedOptions: any

  public selectedOption: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEntidades();
    this.createForm();
    this.getPaises()

    this.initial();

    let dataJson = sessionStorage.getItem('companiaA');
    if (dataJson != null) {
      dataJson = JSON.parse(dataJson);
      if (dataJson['e'] == 1) {
        this.itemData.e = '1';
        this.type = "Seguros generales"
      }
      if (dataJson['e'] == 2) {
        this.itemData.e = '2';
        this.type = "Seguros de vida"
      }
      if (dataJson['e'] == 3) {
        this.itemData.e = '3';
        this.type = "Cooperativas"
      }
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

  getPaises() {
    this.authService.getCountries().then((obj) => {
      console.log('paises: ', obj);
      this.paises = obj
    })
  }

  getEntidades() {
    this.authService.getEntities().then((res: any) => {
      console.log('esta son las entidades, ', res)
      this.entidades = res
    })
  }

  initial() {
    const data = JSON.parse(sessionStorage.getItem('companiaA'));
    if (data != null) {
      this.idEdit = data.a;
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
      this.url = "/aseguradoras";
    }
  }
  create(items) {
    this.buscarPais(items.paisOrigen)
    if (this.form.valid) {
      const item = {
          "con": items.contacto, 
          "d": items.direccion,
          "e": this.itemData.e,
          "es": items.estado,
          "na": items.nombreAbreviado,
          "ni": items.nit,
          "p": this.valorEncontrado,
          "r": items.razonSocial,
          "rg": items.region,
          "te": items.telefono,
      }

      this.authService.putAse(this.idEdit, item).then((res: any) => {
        console.log(res);
        this.alert.success('Ok', 'En hora buena has editado la Aseguradora');
        this.navigate('home/companias/insurance-carrier')
        
        sessionStorage.clear();
      }).catch((err) => {
        console.log(err);
        this.alert.error('Error', 'error en el servidor')
      });
    } else {
      this.alert.error('Error', 'Algo salio mal, por favor revisa los campos')
    }
  }
  navigate(item: string){
    this.router.navigate([item])
  }
}
