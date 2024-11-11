import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
declare var $: any;
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
  probando: FormArray;
  gaugeTitleForm:FormGroup;
  gaugeTitles:FormArray;
  dataEdicion: any;
  listareasu2: any [] = [];
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
    private formBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private _pct: Procentajes
  ) { 
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
  }


  ngOnInit(): void {
    this.createForm()
    this.createFormreasegurador()
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
    
    this.authService.getReinsurer().then(
      (res: any) => {
        this.reasegurador = res;
      }
    );

    this.authService.getCorredor().then((res: any) => { this.corredorList = res; });
    this.alert.loading();
    this.authService.getDtaFormFacultativo(id.a).then(
      (res:any) => {
        console.log("result",res)
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
        //this.form.controls['currency'].setValue(parseInt(cnt.s));
        this.form.controls.currency.setValue(parseInt(cnt.s))
        this.selectedOption = parseInt(cnt.s)
        this.form.controls.hour.setValue(this.horainicio);
        this.form.controls.hourTwo.setValue(this.horafin);
        this.form.controls.descripcion.setValue(cnt.c);
        this.form.controls.observacion.setValue(cnt.r2);
        this.form.controls.codigoContrato.setValue(cnt.o);
        this.form.controls.starDate.setValue(this.fechaOne);
        this.form.controls.endDate.setValue(this.fechaTwo);
        this.form.controls.siniestros.setValue(this.desimal(this.removerSiniestro(cnt.sin_con)));
    
        if (cnt.pro_id) {
          this.authService.getFacultativoContrato(cnt.pro_id).then(
            (res) => {
              
              this.listareasu2 = res;
              this.alert.messagefin();
            }
          );
        };
      }
    )
    
  }
  createItem(){
    return this.myFormBuilder.group({
      codigo: [Menssage.empty, Validators.required],
      sumaLimite: [Menssage.empty, Validators.required],
      secion: [Menssage.empty, Validators.required],
      id: [Menssage.empty, Validators.required],
      ramos: [Menssage.empty, Validators.required],
      reas: [Menssage.empty, Validators.required],
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = this.myFormBuilder.group({
      codigo: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite: [Menssage.empty, Validators.compose([Validators.required])],
      secion: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      reas: [Menssage.empty, Validators.compose([Validators.required])],
      codigo0: [Menssage.empty],
      sumaLimite0: [Menssage.empty],
      secion0: [Menssage.empty],
      id0: [Menssage.empty],
      codigo1: [Menssage.empty],
      sumaLimite1: [Menssage.empty],
      secion1: [Menssage.empty],
      id1: [Menssage.empty],
      codigo2: [Menssage.empty],
      sumaLimite2: [Menssage.empty],
      secion2: [Menssage.empty],
      id2: [Menssage.empty],
      codigo3: [Menssage.empty],
      sumaLimite3: [Menssage.empty],
      secion3: [Menssage.empty],
      id3: [Menssage.empty],
      codigo4: [Menssage.empty],
      sumaLimite4: [Menssage.empty],
      secion4: [Menssage.empty],
      id4: [Menssage.empty],
      codigo5: [Menssage.empty],
      sumaLimite5: [Menssage.empty],
      secion5: [Menssage.empty],
      id5: [Menssage.empty],
      codigo6: [Menssage.empty],
      sumaLimite6: [Menssage.empty],
      secion6: [Menssage.empty],
      id6: [Menssage.empty],
      codigo7: [Menssage.empty],
      sumaLimite7: [Menssage.empty],
      secion7: [Menssage.empty],
      id7: [Menssage.empty],
      codigo8: [Menssage.empty],
      sumaLimite8: [Menssage.empty],
      secion8: [Menssage.empty],
      id8: [Menssage.empty],
      codigo9: [Menssage.empty],
      sumaLimite9: [Menssage.empty],
      secion9: [Menssage.empty],
      id9: [Menssage.empty],
      codigo10: [Menssage.empty],
      sumaLimite10: [Menssage.empty],
      secion10: [Menssage.empty],
      id10: [Menssage.empty],
    })
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
   
    this.gaugeTitleForm = this.formBuilder.group({
      gaugeTitles: this.formBuilder.array([this.createItem()])
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
            
            this.alert.success('Ok', `${this.cod} fue actualizado con exito`);
            //this.router.navigate(["home/contracts"]);
          },
          err => {
            (err)
            this.alert.messagefin()
            this.alert.error('Error', 'No se pudo realizar la solicitud')
          }
        )
      }
    }else{
      ('No')
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
  miles(form: string, key: string) {
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
    (this.listareasu2.length)
    const data = {
      idusers: this.user.authUser.id,
      codigo: form1['codigo'],
      secion: this._pct.removerDesimal(this._pct.removerPor(form1['secion'])),
      sumaLimite: this._pct.removerDesimal(form1['sumaLimite']),
      contrato: 0,
      reas: this._pct.removerDesimal(this._pct.removerPor(form1['reas'])),
      id: this.List.a,
    };
    (data);
    this.alert.loading();
    this.authService.postFacultativoContratb(data).then(
      (res: any) => {
        (res)
        sessionStorage.setItem('idcrear', JSON.stringify(res));
        this.router.navigate(['/home/contracts/Facultativos/edit/detalle']);
        this.alert.messagefin()
      });
  }
  nominasfinales(id: string, from: any, part: string){
    sessionStorage.setItem('idramos', id);
    this.idagregar = id;
    this.part = this.cortarDesimales(part);
    (this.part)
    const seccion = 'secion'+from;
    this.editramos(id, seccion);
    this.alert.loading();
    if (id) {;
      this.authService.getLoadRamos(id).then(
        (res: any) => {
          this.alert.messagefin()
          this.listNominas = res;
          (this.listNominas);
          this.updateramos()
        },
        err => {
          (err);
        }
      );
      
    }
    
  }
  editramos(item: string, from: any) {
    //(from)
    if (this.cuotaParteFormreasegurador.controls[from].value == "") {
      //this.messegeInfofinal('No se pudo editar este ramo');
      return false;
      
    } else {
      this.resulta = this.cuotaParteFormreasegurador.controls[from].value;
      //(this.resulta )
      ///(this.listareasu2.length )
      if (this.resulta  != ' ') {
        const data = {
          idusers: this.user.authUser.id,
          id: item,
          secion: this.removeProsentaje(this.resulta),
        };
        (data)
        //this.messageloading('Espera por favor');
        this.authService.editRamos(data).then(
          res => {
            (res);
            //Swal.close()
          },
          err => {
            (err);
          });
       } else{
        this.alert.info('Erro','No se pudo editar este ramo');
      }
    }
  }
  updateramos(){
    this.cuotaParteFormreasegurador.value;
    (this.cuotaParteFormreasegurador.value)
  }
  removeProsentaje(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split("%");
        return a[0];
      }
    }
    
  }
  porcentaje(key: any, form?){
    if (form) {
      const value = this.cuotaParteFormreasegurador.controls[form].value;
      this.cuotaParteFormreasegurador.controls[form].setValue(
        this.procentaje(key)
      );
    } else {
      const porcentaje = this.procentaje(key);
      return porcentaje;
    }
    
  }
  idReasegurador(id: number) {
    if (this.reasegurador != undefined) {
      if (id > 0 && id != null) {
        for (let i = 0; i <= this.reasegurador.length; i++) {
          const e = this.reasegurador[i];
          if (id == e.a) {
            return e.e
          }
        }
      }
    }
  }

  idCorredor(id: number) {

    if (id > 0 && id != null) {
      for (let i = 0; i <= this.corredorList.length; i++) {
        const e = this.corredorList[i];
        if (id == e.a) {
          return e.a2;
        }
      }
      return ""
    }
  }
  editar(item: any, vl: any, cp: string) {
    (item);
    $("#myModal").click();
    if (vl == 0) {
      if (item != '') {
        sessionStorage.setItem('v', "0");
        sessionStorage.setItem('editarC', JSON.stringify(item));
        
        $("#myModal").click();
         this.router.navigate(['/home/contracts/Facultativos/edit/detalle']);
      }
    } else if (vl == 1) {
      sessionStorage.setItem('editarC', JSON.stringify(item));
      sessionStorage.setItem('v', "1");
      $("#myModal").click();
       this.router.navigate(['/home/contracts/Facultativos/edit/detalle']);
    }

  }
  evenRamos(key: string) {
    if (!!key) {
      if (key === 'ramos') {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.codigo.setValue(val);
      } else {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.ramos.setValue(val);
      }
    }
  }
}
