import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { Procentajes } from 'src/app/service/commos/porcentajes.service';
import { PercentageService } from 'src/app/service/percentage.service';

interface NgbDateStruct {
  year: number;

  month: number;

  day: number;
}
@Component({
  selector: 'app-facultativo-edit',
  templateUrl: './facultativo-edit.component.html',
  styleUrls: ['./facultativo-edit.component.css']
})
export class FacultativoEditComponent implements OnInit {
  displayedColumns: string[] = [
    "contrato",
    "sumaLimite",
    "cesion",
    "nomina",
    "reas",
  ];
  idagregar: String;
  List: any;
  public dataSource: MatTableDataSource<any>;
  fecha1: NgbDateStruct = { day: 0, month: 0, year: 0 };
  fecha2: NgbDateStruct = { day: 0, month: 0, year: 0 };
  fechaAlmacenda: any;
  fechaAlmacendaFin: any;
  listNominas: any;
  form: FormGroup;
  currency: Observable<any>;
  cuotaParteForm: FormGroup;
  newNomina: any;
  cuotaParteFormreasegurador: FormGroup;
  dataEdicion: any;
  listareasu2: any;
  reasegurador: any;
  cuota: any;
  ramos: any;
  horainicio: any;
  horafin: any;
  resulta: any;
  cod: any;
  fechaOne: any;
  fechaTwo: any;
  corredorList: any;
  statefinal: boolean;
  user: any;
  ctb1: any; 
  part: number; 
  public selectedOption: any;
  public money: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private _pct: Procentajes
  ) { 
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
  }


  ngOnInit(): void {
    this.createForm()
    this.initial()
    this.ctb1 = '+';
  }
  initial() {
    this.getMoney();
    this.authService.getRamos().then(
      (res: any) => {
        this.ramos = res;
      }
    );
    const idsForm = sessionStorage.getItem('formCount');
    this.authService.getCurrency().then((data:any)=>{
      this.currency = data
    });
    this.createForm();
    const id = JSON.parse(sessionStorage.getItem('cp'));
    console.log(id);
    this.authService.getReinsurer().then(
      (res: any) => {
        this.reasegurador = res;
      }
    );

    this.authService.getCorredor().then((res: any) => { this.corredorList = res; });
    this.alert.loading();
    this.authService.getDtaFormFacultativo(id.a).then(
      (res:any) => {
        this.List = res;
        this.form.reset();
        let cnt = res.cnt;
        this.dataEdicion = res.cnt;
        const fIni = cnt.r.split("-");
        const fFin = cnt.e.split("-");
        this.fecha1 = { year: fIni[0], month: fIni[1], day: fIni[2] };
        this.fecha2 = { year: fFin[0], month: fFin[1], day: fFin[2] };
        this.cuota = cnt.o;
        this.horainicio = cnt.hrn; 
        this.horafin = cnt.hrf;
        this.cod = cnt.o;
        this.fechaOne = this.getFecha(this.fecha1)
        this.fechaTwo = this.getFecha(this.fecha2)
        //Trae datos formulario
        this.form.controls.hour.setValue(this.horainicio);
        this.form.controls.hourTwo.setValue(this.horafin);
        this.form.controls.descripcion.setValue(cnt.c);
        this.form.controls.observacion.setValue(cnt.r2);
        this.form.controls.codigoContrato.setValue(cnt.o);
        this.form.controls.starDate.setValue(this.fechaOne);
        this.form.controls.endDate.setValue(this.fechaTwo);
        this.form.controls.siniestros.setValue(this.desimal(this.removerSiniestro(cnt.sin_con)));
        if (cnt.pro_id) {
          this.authService.getDtaRamos(cnt.pro_id).then(
            (res) => {
              this.listareasu2 = res;
            },
            (err) => {
              console.log("en efecto se dañó", err);
            }
          );
        };
      }
    )
  }
  
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      codigoContrato: [Menssage.empty, Validators.compose([Validators.required])],
      descripcion: [Menssage.empty, Validators.compose([Validators.required])],
      starDate: [Menssage.empty, Validators.compose([Validators.required])],
      endDate: [Menssage.empty, Validators.compose([Validators.required])],
      hour: [Menssage.empty, Validators.compose([Validators.required])],
      currency: [Menssage.empty, Validators.compose([Validators.required])],
      hourTwo: [Menssage.empty, Validators.compose([Validators.required])],
      siniestros: [Menssage.empty, Validators.compose([Validators.required])],
      observacion: [Menssage.empty, Validators.compose([Validators.required])],
    });
    this.cuotaParteFormreasegurador = this.myFormBuilder.group({
      codigo: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite: [Menssage.empty, Validators.compose([Validators.required])],
      secion: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      reas: [Menssage.empty, Validators.compose([Validators.required])],
      codigo0: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite0: [Menssage.empty, Validators.compose([Validators.required])],
      secion0: [Menssage.empty, Validators.compose([Validators.required])],
      id0: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo1: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite1: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion1: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id1: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo2: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite2: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion2: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id2: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo3: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite3: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion3: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id3: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo4: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite4: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion4: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id4: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo5: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite5: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion5: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id5: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo6: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite6: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion6: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id6: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo7: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite7: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion7: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id7: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo8: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite8: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion8: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id8: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo9: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite9: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion9: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id9: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      codigo10: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      sumaLimite10: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      secion10: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
      id10: [{name: Menssage.empty, disabled:true}, Validators.compose([Validators.required])],
    });
  }
  create() {
    let fechaInicio = this.form.controls.starDate.value;
    fechaInicio = new Date(fechaInicio)
    let fechaFin = this.form.controls.endDate.value;
    fechaFin = new Date(fechaFin)
    if (fechaInicio) {
      const day = fechaInicio.getDate();
      const month = fechaInicio.getMonth() + 1;
      const year = fechaInicio.getFullYear();
      this.fechaAlmacenda = { day, month, year };
    }
    if (fechaFin) {
      const day = fechaFin.getDate();
      const month = fechaFin.getMonth() + 1;
      const year = fechaFin.getFullYear();
      this.fechaAlmacendaFin = { day, month, year };
    }
    if (!this.statefinal) {
      const form = this.form.value;
      sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));

      if (this.form.invalid) {
        this.alert.error('Error', 'Formulario Invalido')
      } else if (form2) {
        const data = {
          idusers: this.user.authUser.id,
          id: this.dataEdicion.a,
          codigocontrato: this.cod,
          descripcion: form2['descripcion'],
          fechaInicio: this.fechaAlmacenda,
          fechaFin: this.fechaAlmacendaFin,
          moneda: form2['currency'],
          siniestroContrato: this.porcentajes.removerDesimal(form2['siniestros']),
          observacion: form2['observacion'],
          horainicio: form2['hour'],
          horafin: form2['hourTwo']
        };
        this.alert.loading();
        this.authService.postEditContratoFacultativo(data).then(
          res => {
            this.statefinal = true;
            console.log('res create -> ', res)
            this.alert.success('Ok', `${this.cod} fue actualizado con exito`);
            this.router.navigate(["home/contracts"]);
          },
          err => {
            console.log(err)
            this.alert.messagefin()
            this.alert.error('Error', 'No se pudo realizar la solicitud')
          }
        )
      }
    }else{
      console.log('No')
    }
  }
  submitForm() {
    this.alert.success('Ok', `${this.cod} fue actualizado`)
    sessionStorage.clear();
    this.router.navigate(["home/contracts"]);
}
  getMoney() {
    this.authService
      .getCurrency()
      .then((resulta: any) => {
        this.money = resulta;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getFecha(date: any): string {
    const year = date["year"];
    const month = date["month"];
    const day = date["day"];

    return `${year}-${month}-${day}`;
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  procentaje(item: any) {
    if (item != null && item != '') {
      const e = parseFloat(item);
      return e + "%";
    }
  }
  miles(form: string, key: any) {
    if (form === "form") {
      let value = this.form.controls[key].value;
      if (value.split(".").length > 2) {
        value = this.porcentajes.removerDesimal(this.form.controls[key].value);
      }
      const val = this.porcentajes.desimalDeMiles(value);
      this.form[key].setValue(val.toString());
    }
    if (form == "tabel") {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    } else {
      const myPorcentaje = this.procentaje(key);
      return myPorcentaje;
    }
  }

  porcentaje2(form: string, key: any) {
    if (!!form) {
      const value = this.form.controls[key].value
      this.form.controls[key].setValue(
        this.procentaje(value)
      )
    }
  }
  removerSiniestro(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split('.');

        return a[0];
      }
    } else {
      return '';
    }
  }
  agregarnomina() {
    const form1 = this.cuotaParteFormreasegurador.value;
    console.log(this.listareasu2.length)
    const data = {
      idusers: this.user.authUser.id,
      codigo: form1['codigo'],
      secion: this._pct.removerDesimal(this._pct.removerPor(form1['secion'])),
      sumaLimite: this._pct.removerDesimal(form1['sumaLimite']),
      contrato: 0,
      reas: this._pct.removerDesimal(this._pct.removerPor(form1['reas'])),
      id: this.List.a,
    };
    console.log(data);
    this.alert.loading();
    this.authService.postFacultativoContratb(data).then(
      (res: any) => {
        console.log(res)
        sessionStorage.setItem('idcrear', JSON.stringify(res));
        this.router.navigate(['/home/contracts/Facultativos/edit/detalle']);
        this.alert.messagefin()
      });
  }
  nominasfinales(id: string, from: any, part: string){
    sessionStorage.setItem('idramos', id);
    this.idagregar = id;
    this.part = this.cortarDesimales(part);
    console.log(this.part)
    const seccion = 'secion'+from;
    this.editramos(id, seccion);
    this.alert.loading();
    if (id) {;
      this.authService.getLoadRamos(id).then(
        (res: any) => {
          this.alert.messagefin()
          this.listNominas = res;
          console.log(this.listNominas);
          this.updateramos()
        },
        err => {
          console.log(err);
        }
      );
      
    }
    
  }
  editramos(item: string, from: any) {
    //console.log(from)
    if (this.cuotaParteFormreasegurador.controls[from].value == "") {
      //this.messegeInfofinal('No se pudo editar este ramo');
      return false;
      
    } else {
      this.resulta = this.cuotaParteFormreasegurador.controls[from].value;
      //console.log(this.resulta )
      ///console.log(this.listareasu2.length )
      if (this.resulta  != ' ') {
        const data = {
          idusers: this.user.authUser.id,
          id: item,
          secion: this.removeProsentaje(this.resulta),
        };
        console.log(data)
        //this.messageloading('Espera por favor');
        this.authService.editRamos(data).then(
          res => {
            console.log(res);
            //Swal.close()
          },
          err => {
            console.log(err);
          });
       } else{
        this.alert.info('Erro','No se pudo editar este ramo');
      }
    }
  }
  updateramos(){
    this.cuotaParteFormreasegurador.value;
    console.log(this.cuotaParteFormreasegurador.value)
  }
  removeProsentaje(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split("%");
        return a[0];
      }
    }
  }
}
