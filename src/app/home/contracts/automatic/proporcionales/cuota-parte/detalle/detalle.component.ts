import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';
import { ModalComponent } from './modal/modal.component';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  datajsonNominas: any = [];
  formarrastrePerdidaTempo = 'hasta extinsion'
  rsltncr: Observable<any>;
  rsltnrsgr: Observable<any>;
  cmsn: JQuery;
  currency: Observable<any>;
  _ls_trasp_tip: any;
  _ls_trasp_cuen: any;
  listareasu: any;
  frmValues = {
    dtcr: "",
    dtrsg: "",
    dtpp: "",
    dtcu: "",
    dtpcm: "",
    dtgst: "",
    dtipc: "",
    dtir: "",
    dtap: "",
    dtcts: "",
    dtbrok: "",
    dtmdfj: "",
    dtmdcmsl: "",
    dtmdprmxcm1: "",
    dtmdprmncm1: "",
    dtmdprmxsn1: "",
    dtmdprmnsn1: "",
    dtmdcmslsc: "",
    dtmdsccm1: "",
    dtmdscsn1: "",
    dtmd2mn: "",
    dtmd2prd: "",
    dtmd2pt: "",
    dtmd2prtd: "",
    dtmd2pild: "",
    dtmd2rsv: "",
    dttps: "",
    dtmdtrsp: "",
    dtmdtrspcnts: ""
  };
  modulo: string = "Detalle por Reasegurador - Cuota Parte";
  public form: any = {
    cartera: "",
    depositoRetenido: '',
    comision: "",
    corredor: "",
    dtbrok: "",
    deposito: {
      moneda: "",
      periodoR: "",
      periodoT: "",
      PorcentajeI: "",
      PorcentajeR: "",
      reservaAsumida: ""
    },
    traspasoCartera: {
      Cuenta: '',
      traspaso: ''
    },
    ModelComision: {
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
      ComCheck: false,
      SinVal: "",
      SinChech: false
    }
  };
  observableData: any;
  private valorComision: string;
  public user: any;
  comisionArray = { fija: false, provisional: false, escalonada: false };
  validData: any;
  memoria: any;
  errores = {
    error: false,
    mensaje: []
  };

  constructor(
    public router: Router,
    private _service: AuthService,
    private AlertService: AlertService,
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    _service.getCorredor().then((res: any) => { this.rsltncr = res });
    _service.getReinsurer().then((res: any) => { this.rsltnrsgr = res });
     _service.getCurrency().then((res: any)=> {this.currency = res});
     _service.getTraspasoCarteratipo().then((res: any)=> {this._ls_trasp_tip = res});
     _service.getTraspasocarteraCuenta().then((res: any)=> {this._ls_trasp_cuen = res});

    _service.getTraspasoCarteratipo().then(
      res => {
        this.validData = res;
      }
    );

    if (sessionStorage.getItem("dtcntrcp") === null) {
      this.frmValues = {
        dtcr: "",
        dtrsg: "",
        dtpp: "",
        dtpcm: "",
        dtcu: "",
        dtgst: "",
        dtipc: "",
        dtir: "",
        dtap: "",
        dtcts: "",
        dtbrok: "",
        dtmdfj: "",
        dtmdcmsl: "",
        dtmdprmxcm1: "",
        dtmdprmncm1: "",
        dtmdprmxsn1: "",
        dtmdprmnsn1: "",
        dtmdcmslsc: "",
        dtmdsccm1: "",
        dtmdscsn1: "",
        dtmd2mn: "",
        dtmd2prd: "",
        dtmd2pt: "",
        dtmd2prtd: "",
        dtmd2pild: "",
        dtmd2rsv: "",
        dttps: "",
        dtmdtrsp: "",
        dtmdtrspcnts: ""
      };
    } else {
      this.frmValues = JSON.parse(sessionStorage.getItem("dtcntrcp"));
    }
  }

  regresar() {
    //if(confirm('Antes de salir recuerde guardar los cambios.')){history.go(-1);}else{return false;}

    this.AlertService.info('Hey','Antes de salir recuerde guardar los cambios.');
    this.router.navigate(['home/contracts/Automaticos/proporcionales/cuota-parte']);

  }
  ngOnInit() {
    this.form.arrastrePerdida = '10'
    sessionStorage.setItem('fecha', "hola");
    sessionStorage.setItem('comision', '');
    this.frmValues.dtcr = "";
    this.cmsn = $("input[name=dtmdcmsl]").on("click", function () {
      $("#dtmdfj")
        .val($("#" + $(this).val()).val())
        .change()
        .trigger("input");
      $("#dtpcm")
        .val($("#dtmdfj").val())
        .change()
        .trigger("input");
    });

    
  }

  sendModalCom() {
    console.log(this.form.ModelComision);
    if (this.form.ModelComision.sobrecomisionMaxCheck == true) {
      this.form.comision = this.form.ModelComision.sobrecomisionMaxVal;
    }
    if (this.form.ModelComision.sobrecomisionMinCheck == true) {
      this.form.comision = this.form.ModelComision.sobrecomisionMinVal;
    }
    if (this.form.ModelComision.siniestralidadMaxCheck == true) {
      this.form.comision = this.form.ModelComision.siniestralidadMaxVal;
    }
    if (this.form.ModelComision.siniestralidadMinCheck == true) {
      this.form.comision = this.form.ModelComision.siniestralidadMinVal;
    }

    if (this.form.ModelComision.ComCheck == true) {
      this.form.comision = this.form.ModelComision.ComVal;
    }
    if (this.form.ModelComision.SinChech == true) {
      this.form.comision = this.form.ModelComision.SinVal;
    }

    if (this.valorComision == "fija") {
      this.form.comision = this.form.ModelComision.valueFija;
    }
    this.form.comision = this.desimalPor(this.form.comision);
  }
  sendModalborker() {
    console.log(this.form.ModelComision);
    if (this.form.ModelComision.sobrecomisionMaxCheck == true) {
      this.form.dtbrok = this.form.ModelComision.sobrecomisionMaxVal;
    }
    if (this.form.ModelComision.sobrecomisionMinCheck == true) {
      this.form.dtbrok = this.form.ModelComision.sobrecomisionMinVal;
    }
    if (this.form.ModelComision.siniestralidadMaxCheck == true) {
      this.form.dtbrok = this.form.ModelComision.siniestralidadMaxVal;
    }
    if (this.form.ModelComision.siniestralidadMinCheck == true) {
      this.form.dtbrok = this.form.ModelComision.siniestralidadMinVal;
    }

    if (this.form.ModelComision.ComCheck == true) {
      this.form.dtbrok = this.form.ModelComision.ComVal;
    }
    if (this.form.ModelComision.SinChech == true) {
      this.form.dtbrok = this.form.ModelComision.SinVal;
    }

    if (this.valorComision == 'fija') {
      this.form.dtbrok = this.form.ModelComision.valueFijados;
    }
    this.form.dtbrok = this.desimalPor(this.form.dtbrok);
  }

  onClickComision(key: any) {
    this.valorComision = key;
    let data = Object.keys(this.comisionArray);
    data.forEach(element => {
      if (element == key) {
        this.comisionArray[element] = true;
      } else {
        this.comisionArray[element] = false;
      }
    });
  }

  sendModalDep(item) {
    if (this.form.deposito.reservaAsumida == true) {
      this.reservaAsumida()
    } else {
      this.form.depositoRetenido = this.form.deposito.PorcentajeR;
    }
  }

  sendModalTra() {
    this.form.cartera = this.form.traspasoCartera.traspaso;
  }

  reservaAsumida() {
    this.form.depositoRetenido = 0;
    this.porcentaje("depositoRetenido");
  }


  //agregar
  addComision() {
    this.form.depositoRetenido = this.removeProsentaje(this.form.depositoRetenido);
    this.form.comision = this.removeProsentaje(this.form.comision);
    this.form.comisionUtilidad = this.removeProsentaje(this.form.comisionUtilidad);
    this.form.gasto = this.removeProsentaje(this.form.gasto);
    this.form.participacion = this.removeProsentaje(this.form.participacion);
    this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
    this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
    this.form.arrastrePerdida = this.removerDesimal(this.form.arrastrePerdida);

    if (this.form.deposito.reservaAsumida != true) {
      this.form.deposito.PorcentajeR = this.removeProsentaje(this.form.deposito.PorcentajeR);
      this.form.deposito.PorcentajeI = this.removeProsentaje(this.form.deposito.PorcentajeI);
    }

    this.datajsonNominas.push(this.form);

    this.form = {
      cartera: "",
      depositoRetenido: '',
      comision: "",
      corredor: "",
      dtbrok: "",
      deposito: {
        moneda: "",
        periodoR: "",
        periodoT: "",
        PorcentajeI: "",
        PorcentajeR: "",
        reservaAsumida: ""
      },
      traspasoCartera: {
        Cuenta: '',
        traspaso: ''
      },
      ModelComision: {
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
  }

  valiarParticipacion() {
    let suma = 0;
    let item = this.form.participacion;
    if (item != 100) {
      this.porcentaje('participacion');
      item = this.form.participacion;
    }
    if (this.datajsonNominas != null) {
      for (let i = 0; i <= Object.keys(this.datajsonNominas).length - 1; i++) {
        let item = this.datajsonNominas[i];
        suma = suma + parseFloat(item['participacion']);

        if (suma === 100) {
          this.AlertService.error('Hey',"Participacion debe ser  igual al 100% ");
        }
      }
    }

    item = this.formateaValor(item);
    if (parseInt(item) > 100) {
      this.AlertService.error('Hey',"Participacion debe ser menor o igual al 100% ");
    } else {
      if (parseFloat(item) >= 101) {
        if (suma === 0) {
          this.AlertService.error('Hey',"Participacion debe ser menor o igual al 100% ");
        } else {
          const ei = this.form.participacion + suma;
          if (suma > 100) {
            this.AlertService.error('Hey','Partición entre comisionistas no puede ser superior al 100%');
          }
        }
      } else {
        if (item == 100) {
          this.form.participacion = item + "%";
        }
      }
    }


  }

  porcentaje(key: string) {
    if (key != '') {
      this.form[key] = this.desimalPor(this.form[key]);
    }
  }

  porcentajeR(key: string) {
    if (key != '') {
      this.form.deposito[key] = this.desimalPor(this.form.deposito[key]);
    }
  }

  removeProsentaje(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split("%");
        return a[0];
      }
    }
  }

  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  removerDesimal(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split('.');
        let res = '';
        for (let i = 0; i < a.length - 1; i++) {
          res = res + a[i];
        }
        return res;
      }
    }
  }
  guardar() {
    //console.log(this.form);
    this.form.depositoRetenido = this.removeProsentaje(this.form.depositoRetenido);
    this.form.comision = this.removeProsentaje(this.form.comision);
    this.form.comisionUtilidad = this.removeProsentaje(this.form.comisionUtilidad);
    this.form.gasto = this.removeProsentaje(this.form.gasto);
    this.form.participacion = this.removeProsentaje(this.form.participacion);
    this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
    this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
    this.form.arrastrePerdida = this.form.arrastrePerdida;
    var n = this.form.participacion.replace(",", ".");
    var x = this.form.comision.replace(",", ".");
    this.form.participacion = n;
    this.form.comision = x;
    console.log(n)
    this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
    this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
    if (this.form.deposito.reservaAsumida != true) {
      this.form.deposito.PorcentajeR = this.removeProsentaje(this.form.deposito.PorcentajeR);
      this.form.deposito.PorcentajeI = this.removeProsentaje(this.form.deposito.PorcentajeI);
      var q = this.form.deposito.PorcentajeR.replace(",", ".");
      this.form.inpuestoRenta = q;
      var i = this.form.deposito.PorcentajeI.replace(",", ".");
      this.form.inpuestoRenta = i;
    }

    var p = this.form.inpuestoRenta.replace(",", ".");
    this.form.inpuestoRenta = p;
    var r = this.form.inpuestoRenta.replace(",", ".");
    this.form.inpuestoRenta = r;
    if (this.form.corredor == '') {
      this.form.dtbrok = '';
    } else {
      this.form.dtbrok = this.removeProsentaje(this.form.dtbrok);
    }
    if (this.form.cartera == 'Sin traspaso') {
      this.form.traspasoCartera.Cuenta = 6;
    }

    if (this.errores.error == false) {

      if (this.form.participacion != null && this.form.participacion <= 100) {
        let idfinal = '';
        if (JSON.parse(sessionStorage.getItem('id'))) {
          idfinal = JSON.parse(sessionStorage.getItem('id'))
          console.log(idfinal);
        } else {
          let final = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
          idfinal = final.a;
          console.log(idfinal);
        }
        this.form.idusers = this.user.authUser.id,
          this.form.id = idfinal;
        this.datajsonNominas.push(this.form);
        //console.log(this.form);
        localStorage.setItem('comision', JSON.stringify(this.datajsonNominas));

        let data = JSON.parse(localStorage.getItem('comision'));
        console.log(data);
        this.AlertService.loading();
        const contra = JSON.parse(localStorage.getItem('idcontrato'));
        this._service.getDtaRamos(contra.a).then(
          res => {
            this.listareasu = res;
            console.log(res);
            console.log(idfinal);
            var parti: Number;
            for (let index = 0; index < this.listareasu.length; index++) {
              if (this.listareasu[index].a == idfinal) {
                parti = this.cortarDesimales(this.listareasu[index].part);
              }

            }
            var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
            var suma = Number(parti) + Number(por);
            console.log(suma);
            if (suma > 100) {

            }
            else {
              this._service.postCuotaparteNomina(JSON.parse(localStorage.getItem('comision'))).then(
                res => {
                  data = null;
                  console.log(res);
                  localStorage.removeItem("comision");
                  if (localStorage.getItem('idcontrato')) {
                    const contra = JSON.parse(localStorage.getItem('idcontrato'));
                    this._service.getDtaRamos(contra.a).then(
                      res => {
                        this.listareasu = res;
                        console.log(this.listareasu)
                        var parti: number;
                        for (let index = 0; index < this.listareasu.length; index++) {
                          if (this.listareasu[index].a == idfinal) {
                            parti = this.cortarDesimales(this.listareasu[index].part);
                          }

                        }

                        var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
                        var suma = Number(parti) + Number(por);
                        console.log(parti);
                        if (parti > 100) {
                          sessionStorage.removeItem('editarC');
                          sessionStorage.removeItem('v');
                          sessionStorage.removeItem('idcrearfinal');
                          sessionStorage.removeItem('id');
                          sessionStorage.removeItem('idramos');
                          sessionStorage.removeItem('idcontratoreasegurador');
                          console.log(this.listareasu.part);
                          console.log('Ok hasta aqui llegas');
                          
                          this.router.navigate(['home/contracts/Automaticos/proporcionales/cuota-parte']);
                        } else {
                          this.AlertService.info('Hey','Quieres seguir agregando nomina');
                        }
                        console.log(res);
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  }

                },
                err => {
                  console.log(err);
                })
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        this._service.getDtaRamos( contra.a).then(
          res => {
            this.listareasu = res;
            console.log(res);
            console.log(idfinal);
            var parti: Number;
            for (let index = 0; index < this.listareasu.length; index++) {
              if (this.listareasu[index].a == idfinal) {
                parti = this.cortarDesimales(this.listareasu[index].part);
              }

            }
            var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
            var suma = Number(parti) + Number(por);
            console.log(suma);
            if (suma > 100) {
              this.AlertService.error('Hey','El total de la participanción de las nominas supera el 100%');
            }
            else {
              console.log('------- 2423');
              
              this.AlertService.loading();
              this._service.postCuotaparteNomina(JSON.parse(localStorage.getItem('comision'))).then(
                res => {
                  data = null;
                  console.log(res);
                  localStorage.removeItem("comision");
                  this.eliminarform();
                  if (localStorage.getItem('idcontrato')) {
                    const contra = JSON.parse(localStorage.getItem('idcontrato'));
                    this._service.getDtaRamos(contra.a).then(
                      res => {
                        this.listareasu = res;
                        console.log(this.listareasu)
                        var parti: number;
                        for (let index = 0; index < this.listareasu.length; index++) {
                          if (this.listareasu[index].a == idfinal) {
                            parti = this.cortarDesimales(this.listareasu[index].part);
                          }

                        }

                        var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
                        var suma = Number(parti) + Number(por);
                        console.log(parti);
                        if (parti > 100) {
                          sessionStorage.removeItem('editarC');
                          sessionStorage.removeItem('v');
                          sessionStorage.removeItem('idcrearfinal');
                          sessionStorage.removeItem('id');
                          sessionStorage.removeItem('idramos');
                          sessionStorage.removeItem('idcontratoreasegurador');
                          console.log(this.listareasu.part);
                          this.AlertService.success('Ok','Haz complertado el 100% de participanción');
                          this.router.navigate(['home/contracts/Automaticos/proporcionales/cuota-parte']);
                        } else {
                          this.AlertService.info('Quieres seguir agregando nomina', '');
                        }
                        console.log(res);
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  }

                },
                err => {
                  console.log(err);
                })
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );

      } else {
        this.router.navigate([
          '/admin/contratos/automaticos/proporcionales/cuota-aparte'
        ]);
      }
    }
  }
  miles(form: string, key: any) {
    if (form == 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    }

  }
  //guardar
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  eliminarform() {
    this.form.depositoRetenido = ""; //this.removeProsentaje(this.form.depositoRetenido);
    this.form.comision = "";
    this.form.comisionUtilidad = ""; // this.removeProsentaje(this.form.comisionUtilidad);
    this.form.gasto = ""; // this.removeProsentaje(this.form.gasto);
    this.form.participacion = "";
    this.form.inpuestoPrimaCedidas = "";
    this.form.inpuestoRenta = "";
    this.form.deposito.reservaAsumida = "";
    this.form.deposito.PorcentajeR = "";
    this.form.deposito.PorcentajeI = "";
    this.form.corredor == '';
    this.form.dtbrok = '';
    this.form.cartera == '';
    this.form.traspasoCartera.Cuenta = '';
    this.datajsonNominas = [];
  }
  traspaso(item: any) {
    //const json = this._ls_trasp_tip.getPromise();/admin/contratos/automaticos/proporcionales/cuota-aparte
    for (let i = 0; i <= Object.keys(this.validData).length - 1; i++) {
      if (this.validData[i].a == parseInt(item)) {
        this.memoria = this.validData[i];
        this.form.cartera = this.validData[i].c;
      }
    }
  }
  desimalPor(key: any) {
    let e = key
    return e + '%';
  }
  desimalPork(key: any) {
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

  create(item) {
    if (confirm("Esta seguro de guardar los cambios?")) {
      sessionStorage.setItem("dtcntrcp", JSON.stringify(item));
      // this.router.navigate(['admin/contratos/automaticos/proporcionales/cuota-aparte']);
    } else {
      return false;
    }
  }

  validarForm(item: any) {
    this.errores.error = false;
    this.errores.mensaje = [];
    for (let index in item) {
      if (item[index] == undefined || item[index] == "") {
        if (index != "corredor") {
          if (index != "idnomina") {
            if (index == "dtbrok") {
              if (item.corredor != "") {
                this.errores.error = true;
                this.errores.mensaje.push("el campo " + index + " es requerido");
              }
            } else {
              this.errores.error = true;
              this.errores.mensaje.push("el campo " + index + " es requerido");
            }
          }
        }
      }
    }
  }
  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2) + '%';
  }
}
