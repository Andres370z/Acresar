import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-detalle-edit',
  templateUrl: './detalle-edit.component.html',
  styleUrls: ['./detalle-edit.component.css']
})
export class DetalleEditComponent implements OnInit {
  datajsonNominas: any = [];
  rsltncr: Observable<any>;
  rsltnrsgr: Observable<any>;
  cmsn: JQuery;
  currency: Observable<any>;
  _ls_trasp_tip: any;
  _ls_trasp_cuen: any;
  jsonDatafinal: any;
  jsonDatafinal2: any;
  active: boolean = false;
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
    reseasegurador: "",
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
  listareasu: any;
  agregarramos: string;
  observableData: any;
  private valorComision: string;
  comisionArray = { fija: false, provisional: false, escalonada: false };
  validData: any;
  memoria: any;
  errores = {
    error: false,
    mensaje: []
  };
  datoEditc: any;
  userfinal: any;
  //EDITAR CLAVES
  traspasoEdit = { e: '', r: '' };
  posicionIndex: number;
  public user: any;
  constructor(
    private router: Router,
    private _service: AuthService,
    private AlertService: AlertService
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    this.userfinal = this.user.authUser;
    _service.getCorredor().then((res: any) => { this.rsltncr = res });
    _service.getReinsurer().then((res: any) => { this.rsltnrsgr = res });
    _service.getCurrency().then((res: any) => { this.currency = res });
    _service.getTraspasoCarteratipo().then((res: any) => { this._ls_trasp_tip = res })
    _service.getTraspasocarteraCuenta().then((res: any) => { this._ls_trasp_cuen = res });
    if (this.userfinal.id_rol == '1' || this.userfinal.id_rol == '2') {
      this.active = false;
      console.log("lista" + this.userfinal.id_rol)
    } else {
      this.active = true;
      console.log("lista1")
    }
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

  ngOnInit() {

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

    const formKey = sessionStorage.getItem('formCount');
    const jsonData = sessionStorage.getItem('editarC');
    const act = sessionStorage.getItem('add');
    if (jsonData != null) {
      this.datoEditc = JSON.parse(jsonData);
    }
    //console.log(formKey,jsonData,act);
    if (formKey != null) {
      const keys = JSON.parse(formKey);
      for (let i = 0; i <= keys.length; i++) {
        const e = sessionStorage.getItem('list_' + keys[i]);
        console.log(e);
        if (e != null) {
          const d = JSON.parse(e);
          console.log(d);
          for (let j = 0; j < d.length; j++) {
            const element = d[j];
            this.datajsonNominas.push(element);
            const jsonEdit = JSON.parse(jsonData);
            console.log(element, d.indexOf(jsonEdit));
          }
        }
      }
    }

    if (jsonData != "1") {
      this.cargarFormulario(jsonData, sessionStorage.getItem('v'));
    }
  }

  cargarFormulario(jsonData: any, v: any) {
    if (jsonData != undefined || jsonData != null) {
      const dataForm = JSON.parse(jsonData)
      console.log(dataForm);
      if (v == 0) {
        const i = dataForm;

        this.form.idnomina = i.a;
        this.form.corredor = i.c;
        this.form.reseasegurador = i.r;
        this.form.cuenta = i.s2;
        this.form.comision = this.formateaValor(i.a2);
        this.form.dtbrok = this.formateaValor(i.l)
        this.form.ModelComision.ComVal = this.formateaValor(i.a2);
        this.form.comisionUtilidad = this.formateaValor(i.g);
        this.form.comisionUtilidadtesto = i.pm;
        this.form.participacion = this.formateaValor(i.s);
        this.form.gasto = this.formateaValor(i.r2);
        this.form.inpuestoPrimaCedidas = this.formateaValor(i.c2);
        this.form.inpuestoRenta = this.formateaValor(i.o);
        this.form.arrastrePerdida = this.decimal(i.n);
        if (i.a) {
          this._service.getAutomaticoComision(i.a).then(
            res => {
              const formlario = res["cps"]["nominas"];
              const formlariofinal = res["cps"]["nominas"]["deposito"];
              if (formlariofinal.length != 0) {
                this.form.depositoRetenido = this.formateaValor(formlariofinal[0].a2);
                this.form.deposito.iddeposito = formlariofinal[0].a
                this.form.deposito.moneda = formlariofinal[0].r;
                this.form.deposito.periodoR = this.cortarDesimalesfinal(formlariofinal[0].e);
                this.form.deposito.periodoT = formlariofinal[0].s;
                this.form.deposito.PorcentajeR = this.formateaValor(formlariofinal[0].a2);
                this.form.deposito.PorcentajeI = this.formateaValor(formlariofinal[0].r2);
                this.form.deposito.reservaAsumida = formlariofinal[0].o == "" || formlariofinal[0].o == 0 || formlariofinal[0].o == false ? false : true;
              } else {
                this.form.deposito.reservaAsumida = true;
                this.form.depositoRetenido = this.formateaValor(0);
                this.form.deposito.periodoR = 0;
                this.form.deposito.periodoT = null;
                this.form.deposito.PorcentajeR = this.formateaValor(0);
                this.form.deposito.PorcentajeI = this.formateaValor(0);
              }


              if (formlario["traspaso"][''] != null) {
                this.form.traspasoCartera.idtraspaso = formlario["traspaso"][0].a;
                this.form.traspasoCartera.traspaso = formlario["traspaso"][0].r;
                this.form.traspasoCartera.Cuenta = formlario["traspaso"][0].e;
                this.form.cartera = formlario["traspaso"][0].tipo;
              }
              if (formlario["comision"][''] != null) {

                this.form.ModelComision.idcomision = formlario["comision"][0].a;
                if (formlario["comision"][0].r == 1) {
                  this.form.ModelComision.ComVal = formlario["comision"][0].e;
                }
                if (formlario["comision"][0].r == 2) {
                  this.form.ModelComision.sobrecomisionMaxCheck = formlario["comision"][0].s;
                  this.form.ModelComision.sobrecomisionMaxVal = formlario["comision"][0].a2;
                  this.form.ModelComision.sobrecomisionMinCheck = formlario["comision"][0].r2;
                  this.form.ModelComision.sobrecomisionMinVal = formlario["comision"][0].c2;
                  this.form.ModelComision.siniestralidadMaxCheck = formlario["comision"][0].o;
                  this.form.ModelComision.siniestralidadMaxVal = formlario["comision"][0].n;
                  this.form.ModelComision.siniestralidadMinCheck = formlario["comision"][0].s2;
                  this.form.ModelComision.siniestralidadMinVal = formlario["comision"][0].u;
                }
                if (formlario["comision"][0].r == 3) {
                  this.form.ModelComision.ComVal = formlario["comision"][0].i;
                  this.form.ModelComision.SinVal = formlario["comision"][0].t;
                }
              }

              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
        }
      }
    }
  }

  decimal(item: any) {

    item = item.toString();
    return item.split('.')[0];
  }

  porcentajeAjuste(item: any) {
    if (item != null) {
      return item.split('.')[0] + '%';
    } else {
      return "";
    }
  }

  sendModalCom() {
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

    if (this.valorComision == "fija") {
      this.form.dtbrok = this.form.ModelComision.valueFijados;
    }
    this.form.dtbrok = this.desimalPor(this.form.comision);
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
  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2) + '%';
  }
  regresar() {
    //if(confirm('Antes de salir recuerde guardar los cambios.')){history.go(-1);}else{return false;}
    sessionStorage.removeItem('editarC');
    this.AlertService.messageInfo('Antes de salir recuerde guardar los cambios.', 'home/contracts/cuota-aparte-edit');

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

  participacionfinal() {
    let suma = 0;
    this.porcentaje('participacion');
    if (this.datajsonNominas != null) {
      for (let i = 0; i <= Object.keys(this.datajsonNominas).length - 1; i++) {
        let item = this.datajsonNominas[i];
        suma = suma + parseFloat(item['participacion']);

        if (suma === 100) {
          this.AlertService.error('UPS',"Participacion debe ser  igual al 100% ");
        }
      }
    }
    let item = this.form.participacion.split('%');
    item = item[0];
    console.log(item);
    if (parseFloat(item) >= 101) {
      if (suma === 0) {
        this.AlertService.error('Ups',"Participacion debe ser menor o igual al 100% ");
      } else {
        const ei = this.form.participacion + suma;
        if (suma > 100) {
          this.AlertService.error('Ups','Partición entre comisionistas no puede ser superior al 100%');
        }
      }
    }

  }

  porcentaje(key: string) {
    if (key != '') {
      this.form[key] = this.desimalPor(this.form[key]);
    }
  }

  desimalPor(key: any) {
    let e = key
    return e + '%';
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
        console.log(a)
        return a[0];

      }
    }
  }

  desimal(key: any) {
    let e = this.form[key];
    if (e != undefined) {
      e = e.split("");
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count == 4) {
          if (e[i - 1] != undefined) {
            rst = '.' + rst;
          }
          count = 0;
        }

      }
      this.form[key] = rst;
    }
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

  reservaAsumida() {
    this.form.depositoRetenido = 0;
    this.porcentaje("depositoRetenido");
  }

  //guardar
  guardar() {

    if (this.form.reseasegurador == 13) {
      this.form.depositoRetenido = "0"; //this.removeProsentaje(this.form.depositoRetenido);
      this.form.comision = 0
      this.form.comisionUtilidad = "0"; // this.removeProsentaje(this.form.comisionUtilidad);
      this.form.gasto = "0"; // this.removeProsentaje(this.form.gasto);
      this.form.inpuestoPrimaCedidas = 0
      this.form.inpuestoRenta = 0
      this.form.deposito.PorcentajeR = 0;
      this.form.deposito.PorcentajeI = 0;
      this.form.dtbrok = 0;
      this.form.traspasoCartera.Cuenta = '';
      this.form.traspasoCartera.Cuenta = '';
      this.form.idusers = this.user.authUser.id;
    } else {
      this.form.depositoRetenido = "0"; //this.removeProsentaje(this.form.depositoRetenido);
      this.form.comision = this.removeProsentaje(this.form.comision);
      this.form.comisionUtilidad = "0"; // this.removeProsentaje(this.form.comisionUtilidad);
      this.form.gasto = "0"; // this.removeProsentaje(this.form.gasto);
      this.form.participacion = this.removeProsentaje(this.form.participacion);
      var n = this.form.participacion.replace(",", ".");
      var x = this.form.comision.replace(",", ".");
      this.form.participacion = n;
      this.form.comision = x;
      //console.log(n)
      this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
      this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
      if (this.form.deposito.reservaAsumida != true) {
        this.form.deposito.PorcentajeR = this.removeProsentaje(this.form.deposito.PorcentajeR);
        this.form.deposito.PorcentajeI = this.removeProsentaje(this.form.deposito.PorcentajeI);
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
      console.log(this.user.authUser.id);
      this.form.idusers = this.user.authUser.id;
    }
    if (this.errores.error == false) {

      if (this.form.participacion != null && this.form.participacion <= 100) {

        let idfinal = '';
        const jsonData = sessionStorage.getItem('editarC');
        if (jsonData == null) {

          let final = JSON.parse(sessionStorage.getItem('idcrear'))
          if (final) {
            idfinal = final.a
            console.log(idfinal);
          }
          if (this.agregarramos) {
            idfinal = this.agregarramos
            console.log(idfinal);
          }
          this.form.id = idfinal;

        }
        this.form.cartera = this.form.traspasoCartera.traspaso
        this.datajsonNominas.push(this.form);
        localStorage.setItem('comision', JSON.stringify(this.datajsonNominas));

        let data = JSON.parse(localStorage.getItem('comision'));
        console.log(data);

        if (jsonData == null) {
          let contra = JSON.parse(sessionStorage.getItem('idcontrato'));
          this.AlertService.loading();
          this._service.getDtaRamos(contra).then(
            res => {
              console.log('------> entra');
              
              this.listareasu = res;
              console.log(res);
              console.log(idfinal);
              var parti: number;
              for (let index = 0; index < this.listareasu.length; index++) {
                if (this.listareasu[index].a == idfinal) {
                  parti = this.cortarDesimalesfinal(this.listareasu[index].part);
                }

              }
              var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
              var suma = Number(parti) + Number(por);
              console.log(suma);
              if (suma > 100) {
                this.AlertService.error('Ups','El total de la participanción de las nominas supera el 100%');
              }
              else if(isNaN(suma) || suma < 100) {
                console.log('llega ---> 20');
                
                this.AlertService.loading();
                this._service.postCuotaEditNomina(JSON.parse(localStorage.getItem('comision'))).then(
                  res => {
                console.log('llega ---> 20');

                    //data = null;
                    console.log(res);
                    localStorage.removeItem("comision");
                    this.eliminarform();
                    //this.removeElement();
                    if (sessionStorage.getItem('idcontrato')) {
                      let contra = JSON.parse(sessionStorage.getItem('idcontrato'));
                      this._service.getDtaRamos(contra).then(
                        res => {
                          this.listareasu = res[0];
                          var parti: Number;
                          for (let index = 0; index < this.listareasu.length; index++) {
                            if (this.listareasu[index].a == idfinal) {
                              parti = this.cortarDesimalesfinal(this.listareasu[index].part);
                            }

                          }
                          var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
                          var suma = Number(parti) + Number(por);
                          console.log(suma);
                          if (suma > 100) {
                            console.log(this.listareasu.part);
                            sessionStorage.removeItem('editarC');
                            sessionStorage.removeItem('v');
                            sessionStorage.removeItem('idcrearfinal');
                            sessionStorage.removeItem('id');
                            sessionStorage.removeItem('idramos');
                            sessionStorage.removeItem('idcontratoreasegurador');
                            this.AlertService.success('Ok','Haz complertado el 100% de participación');
                            this.router.navigate(['home/contracts/cuota-aparte-edit']);
                          } else {
                            this.AlertService.info('Quieres seguir agregando nomina', 'home/contracts/cuota-aparte-edit');
                          }
                          console.log(res);
                        },

                      );
                    } else {
                      sessionStorage.removeItem('editarC');
                      sessionStorage.removeItem('v');
                      sessionStorage.removeItem('idcrearfinal');
                      sessionStorage.removeItem('id');
                      sessionStorage.removeItem('idramos');
                      sessionStorage.removeItem('idcontratoreasegurador');
                      this.AlertService.success('Ok','Haz complertado el 100% de participación');
                      //this.router.navigate(['/admin/contratos/automaticos/proporcionales/cuota-aparte-edit']);
                    }

                  },
                  err => {
                    console.log('1',err);
                  })
              }
              console.log('2',res);
            },
            err => {
              console.log('3',err);
            }
          );

        } else {
          console.log('----- else');
          
          let contra = JSON.parse(sessionStorage.getItem('idcontrato'));
          this.AlertService.loading();
          this._service.getDtaRamos(contra).then(
            res => {
              this.listareasu = res;
              var parti: Number;
              for (let index = 0; index < this.listareasu.length; index++) {
                if (this.listareasu[index].a == idfinal) {
                  parti = this.cortarDesimalesfinal(this.listareasu[index].part);
                }

              }
              var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
              var suma = Number(parti) + Number(por);
              console.log(suma);
              if (suma > 100) {
                this.AlertService.error('Ups','El total de la participanción de las nominas supera el 100%');
              } 
              else {
                this.AlertService.loading();
                this._service.postCuotaEditNomina(JSON.parse(localStorage.getItem('comision'))).then(
                  res => {
                    //this.messageSuccess('Haz complertado el 100% de participación');
                    this.eliminarform();
                    ///this.removeElement();
                    sessionStorage.removeItem('editarC');
                    sessionStorage.removeItem('v');
                    sessionStorage.removeItem('idcrearfinal');
                    sessionStorage.removeItem('id');
                    sessionStorage.removeItem('idcontrato')
                    sessionStorage.removeItem('idramos');
                    sessionStorage.removeItem('idcontratoreasegurador');
                    this.router.navigate(['home/contracts/cuota-aparte-edit']);
                    console.log(res);
                  },
                  err => {
                    console.log('4',err);
                  }
                );
              }
            },
            err => {
              console.log('5',err);
            }
          );

        }


      } else {
        sessionStorage.removeItem('editarC');
        sessionStorage.removeItem('v');
        sessionStorage.removeItem('idcrearfinal');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('idramos');
        sessionStorage.removeItem('idcontratoreasegurador');
        this.AlertService.error('Ups','El total de la participanción de las nominas supera el 100%');
        /* this.router.navigate([
          '/admin/contratos/automaticos/proporcionales/cuota-aparte-edit'
        ]); */
      }
    }
  }
  cortarDesimales(item: any) {
    return Math.trunc(item) + '%';
  }
  cortarDesimalesfinal(item: any) {
    return Math.trunc(item);
  }
  removeElement() {
    var element = document.getElementById("gpagos");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
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
    //const json = this._ls_trasp_tip.getPromise();
    for (let i = 0; i <= Object.keys(this.validData).length - 1; i++) {
      if (this.validData[i].a == parseInt(item)) {
        this.memoria = this.validData[i];
        this.form.cartera = this.validData[i].c;
      }
    }
  }

  updateNomina(item) {
    let editNomina = false;
    let data = sessionStorage.getItem('actForm');
    let tbs = sessionStorage.getItem('formCount');

    if (data !== undefined) {
      data = JSON.parse(data);
    }
    if (tbs != undefined) {
      tbs = JSON.parse(tbs);
      for (let i = 0; i < tbs.length; i++) {
        const tb = tbs[i];
        const jsonTb = data[tb];
        let boolP = false;
        if (this.datoEditc) {
          boolP = this.datoEditc.info != undefined ? true : false;
        }

        if (boolP) {

          for (let j = 0; j < jsonTb.consiliacion.length; j++) {
            const e = jsonTb.consiliacion[j];
            if (e.info != undefined) {
              if (e.info.a == this.datoEditc.info.a) {
                data[tb].consiliacion[j] = item;
                const stringData = JSON.stringify(data);
                sessionStorage.setItem('actForm', stringData);
                editNomina = true;
              }
            }
          }
        } else {
          //
        }
      }
    }
    return editNomina;
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

}
