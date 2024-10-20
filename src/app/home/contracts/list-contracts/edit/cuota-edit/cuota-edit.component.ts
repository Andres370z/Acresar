import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Procentajes } from "src/app/home/commos/porcentajes";
import { SessionUser } from "src/app/home/global/sessionUser";
import { Menssage } from "src/app/models/router";
import { AlertService } from "src/app/service/alert.service";
import { AuthService } from "src/app/service/auth.service";
import { PercentageService } from "src/app/service/percentage.service";

interface NgbDateStruct {
  year: number;

  month: number;

  day: number;
}
@Component({
  selector: "app-cuota-edit",
  templateUrl: "./cuota-edit.component.html",
  styleUrls: ["./cuota-edit.component.css"],
})
export class CuotaEditComponent implements OnInit {

  dataShow = {
    error: false,
    mensaje: []
  };
  resulta: any;
  idagregar: String;
  listEdit = [];
  List: any;
  cod = '';
  modulo = 'cuota parte edit';
  cuotaParteForm: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  item = { c: '', e: '', r: '' };
  currency: Observable<any>;
  fecha1: NgbDateStruct = { day: 0, month: 0, year: 0 }
  fecha2: NgbDateStruct = { day: 0, month: 0, year: 0 }
  dataEdicion: any;
  listareasu2: any;
  moneda: any;
  ctb = {
    tb1: "+",
    tb2: "+",
    tb3: "+"
  }
  private _pct = new Procentajes();
  listNominas: any;
  reasegurador: any;
  corredorList: any;
  statefinal: boolean;

  form: any = {
    idnomina: "",
    cartera: "",
    depositoRetenido: '',
    comision: "",
    corredor: "",
    dtbrok: "",
    deposito: {
      iddeposito: "",
      moneda: "",
      periodoR: "",
      periodoT: "",
      PorcentajeI: "",
      PorcentajeR: "",
      reservaAsumida: ""
    },
    traspasoCartera: {
      idtraspaso: "",
      Cuenta: '',
      traspaso: ''
    },
    ModelComision: {
      idcomision: "",
      sobrecomisionMaxCheck: false,
      sobrecomisionMaxVal: "",
      sobrecomisionMinCheck: false,
      sobrecomisionMinVal: "",
      siniestralidadMaxCheck: false,
      siniestralidadMaxVal: "",
      siniestralidadMinCheck: false,
      siniestralidadMinVal: "",
      valueFija: "",
      ComVal: "",
      SinVal: ""
    }
  };
  horainicio: any;
  horafin: any;
  formItem: any;
  newNomina: any;
  verNomina = false;
  formCount = [];
  user: any;
  renovacion: any;
  userfinal: any;
  part: number;
  constructor(
    private _ls: AuthService,
    private router: Router,
    private Alertservice: AlertService
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    this.dataEdicion = 'ok';
  }

  ngOnInit() {
    this.renovacion = JSON.parse(sessionStorage.getItem('new'));
    if (this.renovacion !== null) {
      this.modulo = 'cuota parte Renovación';
    }
    this.userfinal = this.user.authUser
    const idsForm = sessionStorage.getItem('formCount');
    this._ls.getCurrency().then((res: any) => {
      this.currency = res
    });
    this.createForm();
    this.createFormreasegurador();
    const id = JSON.parse(sessionStorage.getItem('cp'));

    this._ls.getReinsurer().then(
      res => {
        this.reasegurador = res;
      }
    );

    this._ls.getCorredor().then(res => { this.corredorList = res; });
    this.Alertservice.loading();
    this._ls.getDtaForm(id.a)
      .then(
        res => {
          this.cuotaParteForm.reset();

          this.dataEdicion = res.cnt;
          const cnt = res.cnt;
          const cps = res.cps;
          const fIni = cnt.r.split('-');
          const fFin = cnt.e.split('-');
          this.fecha1 = { year: fIni[0], month: fIni[1], day: fIni[2] };
          this.fecha2 = { year: fFin[0], month: fFin[1], day: fFin[2] };
          this.horainicio = cnt.hrn;
          this.horafin = cnt.hrf;

          this.cuotaParteForm.controls.horainicio.setValue(this.horainicio);
          this.cuotaParteForm.controls.horafin.setValue(this.horafin);
          this.cuotaParteForm.controls.fechaInicio.setValue(this.fecha1);
          this.cuotaParteForm.controls.fechaFin.setValue(this.fecha2);
          this.cuotaParteForm.controls.descripcion.setValue(cnt.c);
          this.cuotaParteForm.controls.epiContrato.setValue(cnt.epi);
          this.cuotaParteForm.controls.observacion.setValue(cnt.r2);
          this.cuotaParteForm.controls.siniestroContrato.setValue(this.desimal(this.removerSiniestro(cnt.sin_con)));
          this.item.c = cnt.o;
          this.cod = cnt.o;
          this.Alertservice.messagefin();
          this.cuotaParteForm.controls.codigocontrato.setValue(cnt.o);
          this._ls.getCurrency().then(res => {
            for (let i = 0; i < res.length; i++) {
              const element = res[i];
              if (element.c == cnt.mn) {
                this.moneda = element.a;
              }

            }
          })
          this.formItem = this.cuotaParteForm.value;
          if (cnt.pro_id) {
            this._ls.getDtaRamos(cnt.pro_id).then(
              res => {
                this.listareasu2 = res;

                console.log(this.listareasu2);
              },
              err => {
                console.log(err);
              }
            );
          }


        },
        err => {
          console.log(err);
        }
      );
  }


  createForm() {
    this.cuotaParteForm = new FormGroup({
      codigocontrato: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      epiContrato: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      siniestroContrato: new FormControl('', Validators.required),
      observacion: new FormControl('', Validators.required),
      horainicio: new FormControl('', Validators.required),
      horafin: new FormControl('', Validators.required)
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      codigo: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      secion: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      ramos: new FormControl('', Validators.required),
      reas: new FormControl('', Validators.required),
      codigo0: new FormControl('', Validators.required),
      sumaLimite0: new FormControl({ value: '', disabled: true }, Validators.required),
      secion0: new FormControl({ value: '', disabled: true }, Validators.required),
      id0: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo1: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite1: new FormControl({ value: '', disabled: true }, Validators.required),
      secion1: new FormControl({ value: '', disabled: true }, Validators.required),
      id1: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo2: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite2: new FormControl({ value: '', disabled: true }, Validators.required),
      secion2: new FormControl({ value: '', disabled: true }, Validators.required),
      id2: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo3: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite3: new FormControl({ value: '', disabled: true }, Validators.required),
      secion3: new FormControl({ value: '', disabled: true }, Validators.required),
      id3: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo4: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite4: new FormControl({ value: '', disabled: true }, Validators.required),
      secion4: new FormControl({ value: '', disabled: true }, Validators.required),
      id4: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo5: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite5: new FormControl({ value: '', disabled: true }, Validators.required),
      secion5: new FormControl({ value: '', disabled: true }, Validators.required),
      id5: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo6: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite6: new FormControl({ value: '', disabled: true }, Validators.required),
      secion6: new FormControl({ value: '', disabled: true }, Validators.required),
      id6: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo7: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite7: new FormControl({ value: '', disabled: true }, Validators.required),
      secion7: new FormControl({ value: '', disabled: true }, Validators.required),
      id7: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo8: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite8: new FormControl({ value: '', disabled: true }, Validators.required),
      secion8: new FormControl({ value: '', disabled: true }, Validators.required),
      id8: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo9: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite9: new FormControl({ value: '', disabled: true }, Validators.required),
      secion9: new FormControl({ value: '', disabled: true }, Validators.required),
      id9: new FormControl({ value: '', disabled: true }, Validators.required),
      codigo10: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite10: new FormControl({ value: '', disabled: true }, Validators.required),
      secion10: new FormControl({ value: '', disabled: true }, Validators.required),
      id10: new FormControl({ value: '', disabled: true }, Validators.required),
    })
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }


  deleteItemList(item: any) {
    console.log(item)
    if (item != null || item != undefined) {
      let tb = sessionStorage.getItem('tbE');
      let data = sessionStorage.getItem('list_' + tb);

      if (data != null) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          console.log(e == item);
          console.log(data.indexOf(item));
        }
      }
    }
  }

  procentajeNomina(item: any) {
    console.log(item);
    item.forEach(element => {
      console.log(item);
    });
  }

  onchangedecimal(key: any) {
    if (key == "siniestroContrato") {
      const inp = this.cuotaParteForm.controls[key].value
      const e = this.desimal(inp);
      this.cuotaParteForm.controls[key].setValue(e.toString());
    }

    if (key == "sumaLimite") {
      let data = this.cuotaParteForm.controls.tb1;
      data = data.value;
      const e = this.desimal(this.removerDesimal(data[key]));
      data[key] = e;
      this.cuotaParteForm.controls.tb1.setValue(data);
    }
    if (key == "sumaLimite2") {
      let data = this.cuotaParteForm.controls.tb2;
      data = data.value;
      console.log(data);
      const e = this.desimal(data[key]);
      data[key] = e;
      this.cuotaParteForm.controls.tb2.setValue(data);
    }
    if (key == "sumaLimite3") {
      let data = this.cuotaParteForm.controls.tb3;
      data = data.value;
      const e = this.desimal(data[key]);
      data[key] = e;
      this.cuotaParteForm.controls.tb3.setValue(data);
    }

  }
  miles(form: string, key: any) {
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteFormreasegurador.controls[key].value;
      if (value.split('.').length > 2) {
        value = this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls[key].value);
      }
      const val = this._pct.desimalDeMiles(value);
      this.cuotaParteFormreasegurador.controls[key].setValue(val.toString());
    }
    if (form == 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    }

  }
  desimalPor(key: any) {
    let e = key
    if (e != undefined) {
      e = e.split("");
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1
        rst = e[i] + rst;
        if (count == 2) {
          if (e[i - 1] != undefined) {
            rst = '.' + rst
          }
          count = 0;
        }
      }
      return rst + "%";
    }
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  desimaldo(key: any) {
    let e = key
    if (e != undefined) {
      e = e.split("");
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1
        rst = e[i] + rst;
        if (count == 3) {
          if (e[i - 1] != undefined) {
            rst = '.' + rst
          }
          count = 0;
        }
      }
      return rst;
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
  removerDesimal(e: any) {

    if (e != "") {
      if (typeof e == "string") {
        const a = e.split('.');
        let res = '';
        for (let i = 0; i < a.length; i++) {
          res = res + a[i];
        }
        return res == "" ? e : res;
      }
    } else {
      return '';
    }
  }

  removerPor(data: any) {
    if (data != undefined) {
      let e = data.split("%");
      return e[0];
    }
  }

  removerReas() {
    let tb1 = this.cuotaParteForm.controls.tb1;
    let tb2 = this.cuotaParteForm.controls.tb2;
    let tb3 = this.cuotaParteForm.controls.tb3;

    this.cuotaParteForm.controls.siniestroContrato.setValue(this.removerDesimal(this.cuotaParteForm.controls.siniestroContrato.value));
    tb1 = tb1.value;
    tb2 = tb2.value;
    tb3 = tb3.value;

    tb1['reas'] = this.removerPor(tb1['reas']);
    tb2['reas2'] = this.removerPor(tb2['reas2']);
    tb3['reas3'] = this.removerPor(tb3['reas3']);
    tb1['secion'] = this.removerPor(tb1['secion']);
    tb2['secion2'] = this.removerPor(tb2['secion2']);
    tb3['secion3'] = this.removerPor(tb3['secion3']);

    tb1["sumaLimite"] = this.removerDesimal(tb1["sumaLimite"]);
    tb2["sumaLimite2"] = this.removerDesimal(tb2["sumaLimite2"]);
    tb3["sumaLimite3"] = this.removerDesimal(tb3["sumaLimite3"]);

    this.cuotaParteForm.controls.tb1.setValue(tb1);
    this.cuotaParteForm.controls.tb2.setValue(tb2);
    this.cuotaParteForm.controls.tb3.setValue(tb3)

  }

  Add(cp: string) {
    this.formItem = this.cuotaParteForm.value;
    sessionStorage.setItem('add', '1');
    $("#myModal").click();
    this.router.navigate(['home/contracts']);
    sessionStorage.setItem('actForm', JSON.stringify(this.formItem))
  }

  editar(item: any, vl: any, cp: string) {
    this.formItem = this.cuotaParteForm.value;
    $("#myModal").click();
    if (vl == 0) {
      if (item != '') {
        sessionStorage.setItem('v', "0");
        sessionStorage.setItem('editarC', JSON.stringify(item));
        $("#myModal").click();
        this.router.navigate(['home/contracts']);
      }
    } else if (vl == 1) {
      sessionStorage.setItem('editarC', JSON.stringify(item));
      sessionStorage.setItem('v', "1");
      $("#myModal").click();
      this.router.navigate(['home/contracts']);
    }
    sessionStorage.setItem('actForm', JSON.stringify(this.formItem))
  }

  regresar() {
    this.router.navigate(['home/contractss']);
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



  submitForm() {

    this.trasformarJson(this.cuotaParteForm.value);
    const id = JSON.parse(sessionStorage.getItem('cp'));
    this.validarForm();
    if (this.dataShow.error == false) {
      let data = this.cuotaParteForm.value;

      data['siniestroContrato'] = this.removerDesimal(data['siniestroContrato']);
      if (data['tb1']['sumaLimite'] != null) {
        data['tb1']['sumaLimite'] = this.removerDesimal(data['tb1']['sumaLimite']);
        data['tb1']['secion'] = this.removerPor(data['tb1']['secion']);
        data['tb1']['reas'] = this.removerPor(data['tb1']['reas']);
      }

      if (data['tb2']['sumaLimite2'] != null) {
        data['tb2']['sumaLimite2'] = this.removerDesimal(data['tb2']['sumaLimite2']);
        data['tb2']['secion2'] = this.removerPor(data['tb2']['secion2']);
        data['tb2']['reas2'] = this.removerPor(data['tb2']['reas2']);
      }

      if (data['tb3']['sumaLimite3'] != null) {
        data['tb3']['sumaLimite3'] = this.removerDesimal(data['tb3']['sumaLimite3']);
        data['tb3']['secion3'] = this.removerPor(data['tb3']['secion3']);
        data['tb3']['reas3'] = this.removerPor(data['tb3']['reas3']);
      }


      this._ls.putCuotaAparte(id.a, data)
        .then(
          res => {
            //sessionStorage.clear();
            this.Alertservice.success('Ok',res.mensaje);
            sessionStorage.clear();
            this.router.navigate(["home/contracts/"]);
          },
          err => {
            console.log(err);
          }
        )
    }
  }



  trasformarJson(item: any) {
    let addJson = [];

    const cps = [
      item.tb1,
      item.tb2,
      item.tb3
    ];

    /*
     *trasformar objeto de datos a las claves requeridas
     */

    for (let i = 0; i < cps.length; i++) {
      const tb = i + 1;
      const element = tb == 1 ? cps[i]['consiliacion'] : cps[i]['consiliacion' + tb];
      console.log(element);

      if (element != null) {
        for (let j = 0; j < element.length; j++) {
          let c = true;
          const nm = element[j];
          if (nm.info != undefined && nm.deposito[0] != undefined) {
            const i = nm.info;
            const t = nm.traspaso.length > 0 ? nm.traspaso[0] : [];
            const c = nm.comision.length > 0 ? nm.comision[0] : [];
            const d = nm.deposito.length > 0 ? nm.deposito[0] : [];
            if (d != undefined && c != undefined && t != undefined && i != undefined) {
              this.form = {
                cartera: t.tipo,
                depositoRetenido: d.a2,
                comision: c.e,
                corredor: i.c,
                dtbrok: i.l,
                idnomina: i.a,
                reseasegurador: i.r,
                participacion: i.s,
                comisionUtilidad: i.a2,
                gasto: i.r2,
                inpuestoPrimaCedidas: i.c2,
                inpuestoRenta: i.o,
                arrastrePerdida: i.n,
                cuenta: i.s2,
                deposito: {
                  iddeposito: d.a,
                  moneda: d.r,
                  periodoR: d.e,
                  periodoT: d.s,
                  PorcentajeI: d.e,
                  PorcentajeR: d.a2,
                  reservaAsumida: d.o == "0" ? false : true
                },
                traspasoCartera: {
                  idtraspaso: t.a,
                  Cuenta: t.e,
                  traspaso: t.r
                },
                ModelComision: {
                  idcomision: c.a,
                  sobrecomisionMaxCheck: c.s,
                  sobrecomisionMaxVal: c.a2,
                  sobrecomisionMinCheck: c.r2,
                  sobrecomisionMinVal: c.c2,
                  siniestralidadMaxCheck: c.o,
                  siniestralidadMaxVal: c.n,
                  siniestralidadMinCheck: c.s2,
                  siniestralidadMinVal: c.u,
                  valueFija: c.e,
                  ComVal: c.l,
                  SinVal: c.t
                }
              };
              addJson.push(this.form);
            }
          } else {
            addJson.push(nm);
          }
          console.log(addJson);

          if (tb > 0) {
            let tbRes = this.cuotaParteForm.controls['tb' + tb];
            let data = tbRes.value;
            if (tb == 1) {
              data.consiliacion = addJson;
            }
            if (tb == 2) {
              data.consiliacion2 = addJson;
            }
            if (tb == 3) {
              data.consiliacion3 = addJson;
            }
            tbRes.setValue(data);

          }
        }
        addJson = [];
      }

    }

  }



  validarForm() {

    this.dataShow.error = false;
    this.dataShow.mensaje = [];
    const data = this.cuotaParteForm.value;
    const tb1 = data.tb1;
    const tb2 = data.tb2;
    const tb3 = data.tb3;

    if (data.codigocontrato == undefined && data.codigocontrato == "") {
      this.dataShow.error = true;
      this.dataShow.mensaje.push("Codigo contrato es requerido");
    }
    if (data.descripcion == undefined || data.descripcion == "") {
      this.dataShow.error = true;
      this.dataShow.mensaje.push("la descripcion es requerida");
    }
    if (data.moneda == undefined || data.model == "") {
      this.dataShow.error = true;
      this.dataShow.mensaje.push("selecione una moneda campo requerido");
    }
    if (data.observacion == "" || data.observacion == undefined) {
      this.dataShow.error = true;
      this.dataShow.mensaje.push("la observacion es requerida");
    }
    if (data.siniestroContrato == "" || data.siniestroContrato == undefined) {
      this.dataShow.error = true;
      this.dataShow.mensaje.push("el campo siniestro contrato es requerido")
    }
    if (tb1.secion != "" || tb1.reas != "" || tb1.sumaLimite != "" || tb1.consiliacion.length > 0) {
      if (tb1.secion == "") {
        this.dataShow.error = true;
        this.dataShow.mensaje.push("valor de secion es obligatorio en la capa 1");
      }
      if (tb1.reas == "") {
        this.dataShow.error = true;
        this.dataShow.mensaje.push("valor de reas es obligatorio en la capa 1")
      }

    }
    if (tb2.secion2 != "" || tb2.reas2 != "" || tb2.sumaLimite2 != "" || tb2.consiliacion2.length > 0) {
      if (tb1.secion2 == "") {
        this.dataShow.error = true;
        this.dataShow.mensaje.push("valor de secion es obligatorio en la capa 2");
      }
      if (tb1.reas2 == "") {
        this.dataShow.error = true;
        this.dataShow.mensaje.push("valor de reas es obligatorio en la capa 2")
      }

    }
    if (tb3.secion3 != "" || tb3.reas3 != "" || tb3.sumaLimite3 != "" || tb3.consiliacion3.length > 0) {
      if (tb1.secion3 == "") {
        this.dataShow.error = true;
        this.dataShow.mensaje.push("valor de secion es obligatorio en la capa 3");
      }
      if (tb1.reas3 == "") {
        this.dataShow.error = true;
        this.dataShow.mensaje.push("valor de reas es obligatorio en la capa 3")
      }
    }
  }
  porcentaje(key: any, form?) {
    //console.log(key, form);
    if (!!form) {
      const value = this.cuotaParteFormreasegurador.controls[key].value;
      this.cuotaParteFormreasegurador.controls[key].setValue(
        this.procentaje(value)
      );
    } else {
      const porcentaje = this.procentaje(key);
      return porcentaje;
    }

  }
  procentaje(item: any) {
    if (item != null && item != '') {
      const e = parseFloat(item);
      return e + "%";
    }
  }
  nominasfinales(id: string, from: any, part: string) {
    sessionStorage.setItem('idramos', id);
    this.idagregar = id;
    this.part = this.cortarDesimales(part);
    console.log(this.idagregar)
    const seccion = 'secion' + from;
    this.editramos(id, seccion);
    if (id) {
      ;
      this._ls.getLoadRamos(id).then(
        res => {
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

    if (this.cuotaParteFormreasegurador.controls[from].value == "") {
      return false;
    } else {
      this.resulta = this.cuotaParteFormreasegurador.controls[from].value;
      if (this.listareasu2.length == 1) {
        const data = {
          idusers: this.user.authUser.id,
          id: item,
          secion: this.removeProsentaje(this.resulta),
        };
        console.log(data)
        //this.Alertservice.loading();
        this._ls.editRamos(data).then(
          res => {
            console.log(res);
            //Swal.close()
          },
          err => {
            console.log(err);
          });
      }
    }
  }
  updateramos() {
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
  create() {
    if (this.renovacion.length !== 0) {
      const form = this.cuotaParteForm.value;
      sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      // tslint:disable-next-line:no-debugger
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));
      const formfinal = this.cuotaParteForm.value;
      if (formfinal.codigocontrato === undefined && formfinal.codigocontrato === '') {
        this.Alertservice.messageInfo('Hey','Campo del codigo del contrato es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.descripcion === undefined || formfinal.descripcion === '') {
        this.Alertservice.messageInfo('Hey','Campo descripción es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.fechaInicio === undefined || formfinal.fechaInicio === '') {
        this.Alertservice.messageInfo('Hey','Campo fecha de inicio es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.horainicio === undefined || formfinal.horainicio === '') {
        this.Alertservice.messageInfo('Hey','Campo hra inicial es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.fechaFin === undefined || formfinal.fechaFin === '') {
        this.Alertservice.messageInfo('Hey','Campo fecha final  es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.horafin === undefined || formfinal.horafin === '') {
        this.Alertservice.messageInfo('Hey','Campo  hora final es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.moneda === undefined || formfinal.model === '') {
        this.Alertservice.messageInfo('Hey','Campo moneda es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.observacion === '' || formfinal.observacion === undefined) {
        this.Alertservice.messageInfo('Hey','Campo observación es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.siniestroContrato === '' || formfinal.siniestroContrato === undefined) {
        this.Alertservice.messageInfo('Hey','Campo siniestro es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (form2) {
        const data = {
          idusers: this.user.authUser.id,
          id: this.dataEdicion.a,
          codigocontrato: this.cod,
          descripcion: form2['descripcion'],
          fechaInicio: form2['fechaInicio'],
          fechaFin: form2['fechaFin'],
          moneda: form2['moneda'],
          siniestroContrato: this._pct.removerDesimal(form2['siniestroContrato']),
          observacion: form2['observacion'],
          horainicio: form2['horainicio'],
          horafin: form2['horafin']
        };
        this.Alertservice.loading();
        this._ls.postContratoCuotaAparte(data).then(
          res => {
            this.statefinal = true;
            this.List = res;
            console.log(res);
          },
          err => {
            console.log(err);
          });
      }

    } else {
      //console.log(this.dataEdicion.cnt['a'])
      if (!this.statefinal) {
        const form = this.cuotaParteForm.value;
        sessionStorage.setItem('formCuotaP', JSON.stringify(form));
        // tslint:disable-next-line:no-debugger
        const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));
        const formfinal = this.cuotaParteForm.value;
        if (formfinal.codigocontrato === undefined && formfinal.codigocontrato === '') {
          this.Alertservice.messageInfo('Hey','Campo del codigo del contrato es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.descripcion === undefined || formfinal.descripcion === '') {
          this.Alertservice.messageInfo('Hey','Campo descripción es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.fechaInicio === undefined || formfinal.fechaInicio === '') {
          this.Alertservice.messageInfo('Hey','Campo fecha de inicio es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.horainicio === undefined || formfinal.horainicio === '') {
          this.Alertservice.messageInfo('Hey','Campo hra inicial es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.fechaFin === undefined || formfinal.fechaFin === '') {
          this.Alertservice.messageInfo('Hey','Campo fecha final  es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.horafin === undefined || formfinal.horafin === '') {
          this.Alertservice.messageInfo('Hey','Campo  hora final es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.moneda === undefined || formfinal.model === '') {
          this.Alertservice.messageInfo('Hey','Campo moneda es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.observacion === '' || formfinal.observacion === undefined) {
          this.Alertservice.messageInfo('Hey','Campo observación es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (formfinal.siniestroContrato === '' || formfinal.siniestroContrato === undefined) {
          this.Alertservice.messageInfo('Hey','Campo siniestro es obligatorio');
        }
        // tslint:disable-next-line:one-line
        else if (form2) {
          const data = {
            idusers: this.user.authUser.id,
            id: this.dataEdicion.a,
            codigocontrato: this.cod,
            descripcion: form2['descripcion'],
            fechaInicio: form2['fechaInicio'],
            fechaFin: form2['fechaFin'],
            moneda: form2['moneda'],
            siniestroContrato: this._pct.removerDesimal(form2['siniestroContrato']),
            observacion: form2['observacion'],
            horainicio: form2['horainicio'],
            horafin: form2['horafin']
          };
          this.Alertservice.loading();
          this._ls.postEditContrato(data).then(
            res => {
              this.statefinal = true;
              this.List = res;
              console.log(res);
            },
            err => {
              console.log(err);
            });
        }
      } else {
        this.statefinal = true;
      }
    }
  }
  verificar() {
    localStorage.removeItem('idcontrato')
    sessionStorage.clear();
    this.cod = '';
    this.cuotaParteForm.reset();
    // tslint:disable-next-line:prefer-const
    let res = 'Contrato creado exitosamente';
    this.Alertservice.success('Ok',res);
    this.router.navigate(['home/contracs']);
    // tslint:disable-next-line:one-line

  }
  agregarnomina(item: String, part: String) {
    const parti = this.cortarDesimales(part);
    console.log(`>> ${parti}`);
    if (parti >= 100) {
      this.Alertservice.error('UPS','Participacion igual al 100% ya no puedes seguir agregando mas nomina');
    } else {
      sessionStorage.setItem('id', JSON.stringify(item));
      this.router.navigate(['home/contracts']);
    }
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.List);
    if (this.List) {
      const form1 = this.cuotaParteFormreasegurador.value;

      sessionStorage.setItem('formCuotaP1', JSON.stringify(form1));
      console.log(form1);
      if (form1) {
        this.goDetail();
      }
    }

  }
  goDetail() {
    this.Alertservice.loading();
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'));
    // tslint:disable-next-line:prefer-const
    let contar = + 1;
    const data = {
      idusers: this.user.authUser.id,
      secion: this._pct.removerDesimal(this._pct.removerPor(form1['secion'])),
      sumaLimite: this._pct.removerDesimal(form1['sumaLimite']),
      contrato: contar,
      id: this.List.a,
    };

    console.log(data);
    this._ls.getDtaRamos(data).then(
      res => {
        this.Alertservice.messagefin();
        sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
        this.router.navigate(['home/contracts']);
        this.reasegurador = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      });
  }

}
