import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-facultativos-especiales-detalle',
  templateUrl: './facultativos-especiales-detalle.component.html',
  styleUrls: ['./facultativos-especiales-detalle.component.css']
})
export class FacultativosEspecialesDetalleComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  rentaValue: any = [];
  rentaValue85: any = [];
  garantia: any;
  monedaopt: any;
  totalPrima = 0;
  totalPrima85 = 0;
  datajsonNominas: any = [];
  d: any;
  d2: any;
  rsltncr: Observable<any>;
  rsltnrsgr: Observable<any>;
  cmsn: JQuery;
  currency: Observable<any>;
  _ls_trasp_tip: any;
  _ls_trasp_cuen: any;
  listareasu: any;
  frmValues = {
    dtcr: '',
    dtrsg: '',
    dtpp: '',
    dtpp85: '',
    dtcu: '',
    dtpcm: '',
    dtgst: '',
    dtipc: '',
    dtir: '',
    dtap: '',
    dtcts: '',
    dtbrok: '',
    dtmdfj: '',
    dtmdcmsl: '',
    dtmdprmxcm1: '',
    dtmdprmncm1: '',
    dtmdprmxsn1: '',
    dtmdprmnsn1: '',
    dtmdcmslsc: '',
    dtmdsccm1: '',
    dtmdscsn1: '',
    dtmd2mn: '',
    dtmd2prd: '',
    dtmd2pt: '',
    dtmd2prtd: '',
    dtmd2pild: '',
    dtmd2rsv: '',
    dttps: '',
    dtmdtrsp: '',
    dtmdtrspcnts: ''
  };
  modulo: string = 'Detalle por Reasegurador - Facultativo';
  public form: any = {
    // cartera: '',
    //depositoRetenido: '',
    idusers: '',
    comision: '',
    corredor: '',
    dtbrok: '',
    garantia: '',
    garantia_list: [],
    participacion: '',
    totalPrima: '',
    participacion85: '',
    garantia85: '',
    garantia_list85: [],
    totalPrima85: '',
    deposito: {
      moneda: '',
      periodoR: '',
      periodoT: '',
      PorcentajeI: '',
      PorcentajeR: '',
      reservaAsumida: '',
      garantia: '',

    },
    traspasoCartera: {
      Cuenta: '',
      traspaso: ''
    },
    ModelComision: {
      sobrecomisionMaxCheck: false,
      sobrecomisionMaxVal: '',
      sobrecomisionMinCheck: false,
      sobrecomisionMinVal: '',
      siniestralidadMaxCheck: false,
      siniestralidadMaxVal: '',
      siniestralidadMinCheck: false,
      siniestralidadMinVal: '',
      valueFija: '',
      ComVal: '',
      ComCheck: false,
      SinVal: '',
      SinChech: false
    }
  };
  public user: any;
  observableData: any;
  private valorComision: string;
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
    private _rd: Renderer2,
    private service: AuthService,
    private AlertService: AlertService
  ) { 
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    _service.getCorredor().then((res: any) => this.rsltncr = res);
    _service.getReinsurer().then((res: any) => { this.rsltnrsgr = res });
    _service.getCurrency().then((res: any) => { this.currency = res });
    _service.getTraspasocartera().then((res: any) => { this._ls_trasp_tip = res });
    _service.getTraspasocarteraCuenta().then((res: any) => { this._ls_trasp_cuen = res });

    _service.getTraspasocartera().then(
      res => {
        this.validData = res;
      }
    );

    if (sessionStorage.getItem('dtcntrcp') === null) {
      this.frmValues = {
        dtcr: '',
        dtrsg: '',
        dtpp85: '',
        dtpp: '',
        dtpcm: '',
        dtcu: '',
        dtgst: '',
        dtipc: '',
        dtir: '',
        dtap: '',
        dtcts: '',
        dtbrok: '',
        dtmdfj: '',
        dtmdcmsl: '',
        dtmdprmxcm1: '',
        dtmdprmncm1: '',
        dtmdprmxsn1: '',
        dtmdprmnsn1: '',
        dtmdcmslsc: '',
        dtmdsccm1: '',
        dtmdscsn1: '',
        dtmd2mn: '',
        dtmd2prd: '',
        dtmd2pt: '',
        dtmd2prtd: '',
        dtmd2pild: '',
        dtmd2rsv: '',
        dttps: '',
        dtmdtrsp: '',
        dtmdtrspcnts: ''
      };
    } else {
      this.frmValues = JSON.parse(sessionStorage.getItem('dtcntrcp'));
    }
  }

  regresar() {
    //if(confirm('Antes de salir recuerde guardar los cambios.')){history.go(-1);}else{return false;}
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('idcontratoreasegurador');
    this.AlertService.messageInfo('Antes de salir recuerde guardar los cambios.', 'home/contracts');

  }
  ngOnInit() {
    sessionStorage.setItem('fecha', "hola");
    console.log(this.user)
    if (this.user.authUser.id_rol === "5" || this.user.authUser.id_rol === "3") {
      this.router.navigate(['/admin/dashboard1']);
    }
    this.frmValues.dtcr = '';
    this.cmsn = $('input[name=dtmdcmsl]').on('click', function () {
      $('#dtmdfj')
        .val($('#' + $(this).val()).val())
        .change()
        .trigger('input');
      $('#dtpcm')
        .val($('#dtmdfj').val())
        .change()
        .trigger('input');
    });



    this._service.getCurrency().then(
      res => {
        this.monedaopt = res;
        console.log(this.monedaopt);
      },
      err => {
        console.log(err);
      }
    );

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

    if (this.valorComision == 'fija') {
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
    this.porcentaje('depositoRetenido');
  }


  //agregar
  addComision() {
    this.form.depositoRetenido = "0"; // this.removeProsentaje(this.form.depositoRetenido);
    this.form.comision = this.removeProsentaje(this.form.comision);
    this.form.comisionUtilidad = "0"; // this.removeProsentaje(this.form.comisionUtilidad);
    this.form.gasto = "0"; // this.removeProsentaje(this.form.gasto);
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
      id: '',
      cartera: '',
      //  depositoRetenido: '',
      comision: '',
      corredor: '',
      dtbrok: '',
      deposito: {
        moneda: '',
        periodoR: '',
        periodoT: '',
        PorcentajeI: '',
        PorcentajeR: '',
        reservaAsumida: ''
      },
      traspasoCartera: {
        Cuenta: '',
        traspaso: ''
      },
      ModelComision: {
        sobrecomisionMaxCheck: false,
        sobrecomisionMaxVal: '',
        sobrecomisionMinCheck: false,
        sobrecomisionMinVal: '',
        siniestralidadMaxCheck: false,
        siniestralidadMaxVal: '',
        siniestralidadMinCheck: false,
        siniestralidadMinVal: '',
        valueFija: '',
        ComVal: '',
        SinVal: ''
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
          this.AlertService.error('UPS', 'Participacion debe ser  igual al 100% ');
        }
      }
    }

    item = item.split('%');
    if (parseInt(item) > 100) {
      this.AlertService.error('UPS', 'Participacion debe ser menor o igual al 100% ');
    } else {
      if (parseFloat(item) >= 101) {
        if (suma === 0) {
          this.AlertService.error('UPS', 'Participacion debe ser menor o igual al 100% ');
        } else {
          const ei = this.form.participacion + suma;
          if (suma > 100) {
            this.AlertService.error('UPS', 'Partición entre comisionistas no puede ser superior al 100%');
          }
        }
      } else {
        if (item == 100) {
          this.form.participacion = item + '%';
        }
      }
    }


  }
  valiarParticipacion85() {
    let suma = 0;
    let item = this.form.participacion85;
    if (item != 85) {
      this.porcentaje('participacion85');
      item = this.form.participacion85;
    }
    if (this.datajsonNominas != null) {
      for (let i = 0; i <= Object.keys(this.datajsonNominas).length - 1; i++) {
        let item = this.datajsonNominas[i];
        suma = suma + parseFloat(item['participacion85']);

        if (suma === 85) {
          this.AlertService.error('UPS', 'Participacion debe ser  igual al 85% ');
        }
      }
    }

    item = item.split('%');
    if (parseInt(item) >= 100) {
      this.AlertService.error('UPS', 'Participacion debe ser menor o igual al 85% ');
    } else {
      if (parseFloat(item) >= 101) {
        if (suma === 0) {
          this.AlertService.error('UPS', 'Participacion debe ser menor o igual al 85% ');
        } else {
          const ei = this.form.participacion85 + suma;
          if (suma > 100) {
            this.AlertService.error('UPS', 'Partición entre comisionistas no puede ser superior al 85%');
          }
        }
      } else {
        if (item == 100) {
          this.form.participacion85 = item + '%';
        }
      }
    }

  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
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
    if (e != '') {
      if (typeof e == 'string') {
        const a = e.split('%');
        return a[0];
      }
    }
  }

  desimal(key: any) {
    let e = this.form[key];
    if (e != undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1
        rst = e[i] + rst;
        if (count == 4) {
          if (e[i - 1] != undefined) {
            rst = '.' + rst
          }
          count = 0;
        }

      }
      this.form[key] = rst;
    }
  }
  removerDesimal(e: any) {
    if (e != '') {
      if (typeof e == 'string') {
        const a = e.split('.');
        let res = '';
        for (let i = 0; i < a.length - 1; i++) {
          res = res + a[i];
        }
        return res;
      }
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
  //guardar
  guardar() {
    this.form.depositoRetenido = "0"; //this.removeProsentaje(this.form.depositoRetenido);
    this.form.comision = this.removeProsentaje(this.form.comision);
    this.form.comisionUtilidad = "0"; // this.removeProsentaje(this.form.comisionUtilidad);
    this.form.gasto = "0"; // this.removeProsentaje(this.form.gasto);
    this.form.participacion = this.removeProsentaje(this.form.participacion);
    this.form.participacion85 = null
    this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
    this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
    //this.form.arrastrePerdida = this.removerDesimal(this.form.arrastrePerdida);

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
      this.form.traspasoCartera.Cuenta = '';
    }
    this.form.traspasoCartera.Cuenta = '';
    //this.validarForm(this.form);

    if (this.errores.error == false) {

      if (this.form.participacion != null && this.form.participacion <= 100) {
        this.form.garantia = this.rentaValue;
        this.form.garantia85 = this.rentaValue85;
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
        localStorage.setItem('comision', JSON.stringify(this.datajsonNominas));

        let data = JSON.parse(localStorage.getItem('comision'));
        console.log(this.form);
        this.AlertService.loading();
        if (localStorage.getItem('idcontrato')) {
          let contra = JSON.parse(localStorage.getItem('idcontrato'));
          this.service.getFacultativoContra(contra.a).then(
            res => {
              this.listareasu = res;
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
                this.AlertService.error('UPS', 'El total de la participanción de las nominas supera el 100%');
              } else {
                this.service.getLoadRamos(JSON.parse(localStorage.getItem('comision'))).then(
                  res => {
                    data = null;
                    console.log(res);
                    localStorage.removeItem("comision");
                    if (localStorage.getItem('idcontrato')) {
                      let contra = JSON.parse(localStorage.getItem('idcontrato'));
                      this.service.getFacultativoContra(contra.a).then(
                        res => {
                          this.listareasu = res;
                          var parti: number;
                          for (let index = 0; index < this.listareasu.length; index++) {
                            if (this.listareasu[index].a == idfinal) {
                              parti = this.cortarDesimales(this.listareasu[index].part);
                            }

                          }

                          console.log(parti);

                          if (parti >= 100) {
                            sessionStorage.removeItem('id');
                            sessionStorage.removeItem('idcontratoreasegurador');
                            console.log(this.listareasu.part);
                            this.AlertService.success('Ok', 'Haz complertado el 100% de participanción');
                            this.router.navigate(['home/contracts']);
                          } else {
                            this.AlertService.messageInfo('Quieres seguir agregando nomina', 'home/contracts/Facultativos/especiales/especiles-facultativos');
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
          this.service.getFacultativoContra(contra.a).then(
            res => {
              this.listareasu = res;
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
                this.AlertService.error('UPS', 'El total de la participanción de las nominas supera el 100%');
              } else {
                this.service.postContratosComison(JSON.parse(localStorage.getItem('comision'))).then(
                  res => {
                    data = null;
                    console.log(res);
                    localStorage.removeItem("comision");
                    this.eliminarform();
                    this.removeElement();
                    if (localStorage.getItem('idcontrato')) {
                      let contra = JSON.parse(localStorage.getItem('idcontrato'));
                      this.service.getFacultativoContra(contra.a).then(
                        res => {
                          this.listareasu = res;
                          var parti: number;
                          for (let index = 0; index < this.listareasu.length; index++) {
                            if (this.listareasu[index].a == idfinal) {
                              parti = this.cortarDesimales(this.listareasu[index].part);
                            }

                          }

                          console.log(parti);

                          if (parti >= 100) {
                            sessionStorage.removeItem('id');
                            sessionStorage.removeItem('idcontratoreasegurador');
                            console.log(this.listareasu.part);
                            this.AlertService.success('Ok', 'Haz complertado el 100% de participanción');
                            this.router.navigate(['home/contracts/Facultativos/especiales/especiles-facultativosl']);
                          } else {
                            this.AlertService.info('Quieres seguir agregando nomina', 'home/contracts/Facultativos/especiales/especiles-facultativos');
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
        }


      } else {
        this.router.navigate([
          'home/contracts/Facultativos/especiales/especiles-facultativos'
        ]);
      }
    }
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

  desimalPor(key: any) {
    let e = key
    return e + '%';
  }

  validarForm(item: any) {
    console.log(item);
    this.errores.error = false;
    this.errores.mensaje = [];
    for (let index in item) {
      if (item[index] == undefined || item[index] == '') {
        if (index != 'corredor') {
          if (index != 'idnomina') {
            if (index == 'dtbrok') {
              if (item.corredor != '') {
                this.errores.error = true;
                this.errores.mensaje.push('el campo ' + index + ' es requerido');
              }
            } else {
              this.errores.error = true;
              this.errores.mensaje.push('el campo ' + index + ' es requerido');
            }
          }
        }
      }
    }
  }
  removeElement() {
    var element = document.getElementById("gpagos");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

  }
  adicionar() {
    const tr = this._rd.createElement('tr');
    const td = this._rd.createElement('td');
    const input = this._rd.createElement('input');

    const td2 = this._rd.createElement('td');
    const input2 = this._rd.createElement('input');

    const td3 = this._rd.createElement('td');
    const select = this._rd.createElement('select');


    const td4 = this._rd.createElement('td');
    const input4 = this._rd.createElement('input');

    this._rd.addClass(input, 'form-control');
    this._rd.addClass(input, 'pagon');
    this._rd.setAttribute(input, 'name', 'n_pago');
    this._rd.appendChild(td, input);

    this._rd.addClass(input2, 'form-control');
    this._rd.addClass(input2, 'fecha');
    this._rd.setAttribute(input2, 'placeholder', 'dd/mm/yyyy');
    this._rd.setAttribute(input2, 'name', 'fecha');
    this._rd.setAttribute(input2, 'type', 'date');
    this._rd.appendChild(td2, input2);

    this._rd.addClass(select, 'form-control');
    this._rd.addClass(select, 'moneda');
    this._rd.setAttribute(select, 'name', 'moneda');
    const optT = this._rd.createElement('option');
    this._rd.setAttribute(optT, 'value', '');
    this._rd.appendChild(optT, this._rd.createText('Selecione una moneda'));
    this._rd.appendChild(select, optT);
    for (let i = 0; i <= Object.keys(this.monedaopt).length - 1; i++) {
      const v = this.monedaopt[i];
      const opt = this._rd.createElement('option');
      this._rd.setAttribute(opt, 'value', v.a);
      this._rd.appendChild(opt, this._rd.createText(v.c));
      this._rd.appendChild(select, opt);
    }

    this._rd.appendChild(td3, select);

    this._rd.addClass(input4, 'form-control');
    this._rd.addClass(input4, 'valor');
    this._rd.setAttribute(input4, 'name', 'valor');
    this._rd.listen(input4, 'change', (event) => {
      this.calcular();
    });
    this._rd.appendChild(td4, input4);

    this._rd.appendChild(tr, td);
    this._rd.appendChild(tr, td2);
    this._rd.appendChild(tr, td3);
    this._rd.appendChild(tr, td4);
    this._rd.appendChild(this.table.nativeElement, tr);
  }

  recolectarElement() {

    const e = document.querySelector('#gpagos').children;

    for (let i = 0; i <= e.length - 1; i++) {
      const data = [];
      const v = e[i].children;
      for (let j = 0; j <= v.length - 1; j++) {
        const n = v[j].children[0];
        console.log('>>', n);
        data.push({
          'nombre': n.getAttribute('name'),
          'valor': n['value']
        });

      }
      this.rentaValue.push(data);
    }

  }
  recolectarElement85() {

    const e = document.querySelector('#gpagos85').children;

    for (let i = 0; i <= e.length - 1; i++) {
      const data = [];
      const v = e[i].children;
      for (let j = 0; j <= v.length - 1; j++) {
        const n = v[j].children[0];
        console.log('>>', n);
        data.push({
          'nombre': n.getAttribute('name'),
          'valor': n['value']
        });

      }
      this.rentaValue85.push(data);
    }

  }
  calcular() {
    this.totalPrima = 0;
    const e = document.querySelector('#gpagos').children;

    for (let i = 0; i <= e.length - 1; i++) {
      const data = [];
      const v = e[i].children;
      for (let j = 0; j <= v.length - 1; j++) {
        const n = v[j].children[0];
        if (n.getAttribute('name') === 'valor') {
          if (n['value'] != '') {
            const numero = parseInt(n['value']);
            console.log(numero);
            this.totalPrima = this.totalPrima + numero;
          }
        }
      }
    }

  }

  calcular85() {
    this.totalPrima85 = 0;
    const e = document.querySelector('#gpagos85').children;

    for (let i = 0; i <= e.length - 1; i++) {
      const data = [];
      const v = e[i].children;
      for (let j = 0; j <= v.length - 1; j++) {
        const n = v[j].children[0];
        if (n.getAttribute('name') === 'valor') {
          if (n['value'] != '') {
            const numero = parseInt(n['value']);
            console.log(numero);
            this.totalPrima85 = this.totalPrima85 + numero;
          }
        }
      }
    }

  }

  garantiaList() {
    this.form.garantia = [];
    const element = this.table.nativeElement.children;

    for (let i = 0; i <= this.table.nativeElement.childElementCount - 1; i++) {
      const t = element[i];
      let json = {};
      for (let e = 0; e <= t.childElementCount - 1; e++) {
        const j = t.cells[e];
        const atr = j.children[0].getAttribute('name');
        const vl = j.children[0].value;
        json[atr] = vl;
      }
      this.form.garantia_list.push(json);
    }
    this.form.garantia = this.form.garantia_list[0].fecha;
    this.form.totalPrima = this.totalPrima;

  }
  garantiaList85() {
    this.form.garantia85 = [];
    const element = this.table.nativeElement.children;

    for (let i = 0; i <= this.table.nativeElement.childElementCount - 1; i++) {
      const t = element[i];
      let json = {};
      for (let e = 0; e <= t.childElementCount - 1; e++) {
        const j = t.cells[e];
        const atr = j.children[0].getAttribute('name');
        const vl = j.children[0].value;
        json[atr] = vl;
      }
      this.form.garantia_list85.push(json);
    }
    this.form.garantia85 = this.form.garantia_list85[0].fecha;
    this.form.totalPrima85 = this.totalPrima85;

  }
  removeElementlist() {
    var element = document.getElementById("gpagos");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

  }
}
