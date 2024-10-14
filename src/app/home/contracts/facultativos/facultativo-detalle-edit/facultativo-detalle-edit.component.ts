import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { } from "jquery";
import * as moment from "moment";
import { CookieService } from 'ngx-cookie-service';
import { SessionUser } from "src/app/home/global/sessionUser";
import { AlertService } from "src/app/service/alert.service";
import { Observable } from "rxjs";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: 'app-facultativo-detalle-edit',
  templateUrl: './facultativo-detalle-edit.component.html',
  styleUrls: ['./facultativo-detalle-edit.component.css'],
  providers: []
})
export class FacultativoDetalleEditComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  datajsonNominas: any = [];
  cookieValue: String;
  rsltncr: Observable<any>;
  rsltnrsgr: Observable<any>;
  cmsn: JQuery;
  currency: Observable<any>;
  _ls_trasp_tip: any;
  _ls_trasp_cuen: any;
  rentaValue: any = [];
  monedaopt:any;
  cuota: any;
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
    dtmdfjcomision: "",
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
  totalPrima = 0;
  modulo: string = "Detalle por Reasegurador - Facultativo";
  jsonDatafinal: any;
  jsonDatafinal2: any;
  money: any = [
      {
        id: 1,
        c: "Mensual"
      },
      {
        id: 2,
        c: "Trimestral"
      },
      {
        id: 3,
        c: "Semanal"
      },
      {
        id: 4,
        c: "Anual"
      }
  ]

  public form: any = {
    // cartera: '',
    //depositoRetenido: '',
    idusers: 0,
    comision: '',
    corredor: '',
    dtbrok: '',
    garantia: '',
    garantia_list: [],
    totalPrima: '',
    
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
    },
    Modeldtbrok: {
      sobredtbrokMaxCheck: false,
      sobredtbrokMaxVal: '',
      sobredtbrokMinCheck: false,
      sobredtbrokMinVal: '',
      siniestralidaddtbrokMaxCheck: false,
      siniestralidaddtbrokMaxVal: '',
      siniestralidaddtbrokMinCheck: false,
      siniestralidaddtbrokMinVal: '',
      dtbrokvalueFijados: '',
      dtbrokComVal: '',
      dtbrokComCheck: false,
      dtbrokSinVal: '',
      dtbrokSinChech: false
    }
  };

  observableData: any;
  private valorComision: string;
  comisionArray = { fija: false, provisional: false, escalonada: false };
  validData: any;
  memoria: any;
  listareasu: any;
  agregarramos: string;
  errores = {
    error: false,
    mensaje: []
  };
  datoEditc: any;
  active:boolean = false;
  userfinal:any;
  //EDITAR CLAVES
  traspasoEdit = { e: '', r: '' };
  posicionIndex: number;
  public user: any;
  constructor(
    private _rd: Renderer2,
    private router: Router,
    private _service: AuthService,
    private cookieService: CookieService,
    private alert: AlertService,
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    this.userfinal = this.user.authUser;
    _service.getCorredor().then((data: any)=>{
      this.rsltncr = data 
    });
    _service.getReinsurer().then((data: any)=>{
      this.rsltnrsgr  = data 
      console.log("result",this.rsltnrsgr)
    });
    _service.getCurrency().then((data: any)=>{
      this.currency = data;
      this.monedaopt = data;
    });
    _service.getTraspasocartera().then((data: any)=>{
      this._ls_trasp_tip = data;
      this.validData = data;
    });
    _service.getTraspasocarteraCuenta().then((data: any)=>{
      this._ls_trasp_cuen = data 
    });
    if (this.userfinal.id_rol == '1' || this.userfinal.id_rol == '3' || this.userfinal.id_rol == '2') {
      this.active = false;
      console.log("lista"+this.userfinal.id_rol)
    }else {
      this.active = true;
      console.log("lista1")
    }
    console.log(this.active)

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
        dtmdfjcomision: "",
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
    this.cookieService.set( 'cookie-name', 'our cookie value' );
    this.cookieValue = this.cookieService.get('cookie-name');
    console.log(this.user)
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
    this.agregarramos = sessionStorage.getItem('idcrearfinal');
    console.log(this.agregarramos) 
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
        this.form.cuenta =parseInt(i.s2)   ;
        console.log(this.form.cuenta)
        this.form.totalPrima = this.decimal(i.pm);
        this.totalPrima = this.decimal(i.pm);
        this.form.dtbrok = this.porcentajeporciento(i.l)
        this.form.Modeldtbrok.dtbrokvalueFijados = this.porcentajeporciento(i.l)
        this.form.comisionUtilidad = this.porcentajeAjuste(i.a2);
        this.form.comision = this.porcentajeporciento(i.a2);
        this.form.ModelComision.valueFija = this.porcentajeporciento(i.a2);

        this.form.participacion = this.formateaValor(i.s);
        this.form.gasto = this.porcentajeAjuste(i.r2);
        this.form.inpuestoPrimaCedidas = this.porcentajeAjuste(i.c2);
        this.form.inpuestoRenta = this.porcentajeAjuste(i.o);
        this.form.arrastrePerdida = this.decimal(i.n);
        
        if (i.a) {
          this._service.getComision(i.a).then(
            res => {
              const formlario = res["cps"]["nominas"];
              const formlariofinal = res["cps"]["nominas"]["deposito"];
              this.jsonDatafinal = res["cps"]["nominas"]["garantia"];
              this.jsonDatafinal2 = res["cps"]["nominas"]["garantia"][0].fch;
              this.form.garantia = res["cps"]["nominas"]["garantia"][0].fch;
              //this.form.garantia_list =res["cps"]["nominas"]["garantia"];
              if (formlariofinal.length != 0) {
                this.form.depositoRetenido = this.porcentajeAjuste(formlariofinal[0].a2);
                this.form.deposito.iddeposito = formlariofinal[0].a
                this.form.deposito.moneda = formlariofinal[0].r;
                this.form.deposito.periodoR = formlariofinal[0].e;
                this.form.deposito.periodoT = formlariofinal[0].s;
                this.form.deposito.PorcentajeR = this.porcentajeAjuste(formlariofinal[0].a2);
                this.form.deposito.PorcentajeI = this.porcentajeAjuste(formlariofinal[0].e);
                this.form.deposito.reservaAsumida = formlariofinal[0].o == "" || formlariofinal[0].o == 0 || formlariofinal[0].o == false ? false : true;
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
  decimal(item: any) {

    item = item.toString();
    return item.split('.')[0];
  }
  garantiaList() {
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
    console.log(this.form.garantia_list)

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
  formateaValor(valor) {
    // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2)+ '%';
  }
  porcentajeAjuste(item: any) {
    if (item != null) {
      return item.split('.')[0] + '%';
    } else {
      return "";
    }
  }
  porcentajeporciento(item: any) {
    if (item != null) {
      return item + '%';
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

  regresar() {
    //if(confirm('Antes de salir recuerde guardar los cambios.')){history.go(-1);}else{return false;}
    sessionStorage.removeItem('editarC');
    sessionStorage.removeItem('v');
    sessionStorage.removeItem('idcrearfinal');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('idcontratoreasegurador');
    this.alert.messageInfo('Antes de salir recuerde guardar los cambios.', 'home/contracts/Facultativos/edit');

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

    this.form= {
      // cartera: '',
      //depositoRetenido: '',
      comision: '',
      corredor: '',
      dtbrok: '',
      garantia: '',
      garantia_list: [],
      totalPrima: '',
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
  }

  valiarParticipacion() {
    let suma = 0;
    this.porcentaje('participacion');
    if (this.datajsonNominas != null) {
      for (let i = 0; i <= Object.keys(this.datajsonNominas).length - 1; i++) {
        let item = this.datajsonNominas[i];
        suma = suma + parseFloat(item['participacion']);

        if (suma === 100) {
          this.alert.error('Error',"Participacion debe ser  igual al 100% ");
        }
      }
    }
    let item = this.form.participacion.split('%');
    item = item[0];
    if (parseFloat(item) >= 101) {
      if (suma === 0) {
        this.alert.error('Error',"Participacion debe ser  igual al 100% ");
      } else {
        const ei = this.form.participacion + suma;
        if (suma > 100) {
          this.alert.error('Error',"Partición entre comisionistas no puede ser superior al 100%");
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
      this.form.deposito[key] = this.cortarDesimales(this.form.deposito[key]);
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
      this.form.garantia_list = []
      this.form.idusers= this.user.authUser.id;
    }else{
      this.form.depositoRetenido = "0"; //this.removeProsentaje(this.form.depositoRetenido);
      this.form.comision = this.removeProsentaje(this.form.comision);
      this.form.comisionUtilidad = "0"; // this.removeProsentaje(this.form.comisionUtilidad);
      this.form.gasto = "0"; // this.removeProsentaje(this.form.gasto);
      this.form.participacion = this.removeProsentaje(this.form.participacion);
      var n=this.form.participacion.replace(",",".");
      var x=this.form.comision.replace(",",".");
      this.form.participacion =n;
      this.form.comision = x;
      console.log(n)
      this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
      this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
      if (this.form.deposito.reservaAsumida != true) {
        this.form.deposito.PorcentajeR = this.removeProsentaje(this.form.deposito.PorcentajeR);
        this.form.deposito.PorcentajeI = this.removeProsentaje(this.form.deposito.PorcentajeI);
        var q=this.form.deposito.PorcentajeR.replace(",",".");
        this.form.inpuestoRenta = q;
        var i=this.form.deposito.PorcentajeI.replace(",",".");
        this.form.inpuestoRenta = i;
      }
      var p=this.form.inpuestoRenta.replace(",",".");
      this.form.inpuestoRenta = p;
      var r=this.form.inpuestoRenta.replace(",",".");
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
      if (this.form.garantia_list.length == 0) {
        this.form.garantia_list = this.jsonDatafinal
      }
      console.log(this.user.authUser.id);
      this.form.idusers= this.user.authUser.id;
      if (this.form.reseasegurador != 13) {
        this.validarForm(this.form);
      }
    }
    if (this.errores.error == false) {
      console.log(this.form.participacion);
      let porcen = parseInt(this.removeProsentaje(this.form.participacion))
        if (porcen != null && porcen <= 100) {
        this.form.garantia = this.rentaValue;
        
        let idfinal='';
        const jsonData = sessionStorage.getItem('editarC');
        if (jsonData == null  ) {
          
            let final = JSON.parse(sessionStorage.getItem('idcrear'))
            if(final){
              idfinal = final.a
              console.log(idfinal); 
            }
            if(this.agregarramos){
              idfinal = this.agregarramos
              console.log(idfinal); 
            }
            this.form.id = idfinal;
          
        }
        
        this.datajsonNominas.push(this.form);
        localStorage.setItem('comision', JSON.stringify(this.datajsonNominas));
        
        let data = JSON.parse(localStorage.getItem('comision'));
        console.log(data);
        
        if (jsonData == null) {
          let contra = JSON.parse(sessionStorage.getItem('idcontrato'));
          this.alert.loading();
                this._service.getFacultativoContra(contra).then(
                  res => {
                    this.listareasu = res;
                    console.log(res);
                    console.log(idfinal);
                    var parti: Number;
                    for (let index = 0; index < this.listareasu.length; index++) {
                      if (this.listareasu[index].a == idfinal) {
                          parti = this.cortarDesimalesfinal(this.listareasu[index].part);
                          console.log(parti);
                      }
                      
                    }
                    var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
                    var suma = Number(parti) + Number(por); 
                    console.log(suma);
                    if (suma > 100) {
                      this.alert.error('error','El total de la participanción de las nominas supera el 100%');
                    } 
                    else {
                      this.alert.loading();
                      this._service.getLoadRamos(JSON.parse(localStorage.getItem('comision')),).then(
                        res => {
                          data = null;
                          console.log(res);
                          localStorage.removeItem("comision");
                          this.eliminarform();
                          this.removeElement();
                          if (sessionStorage.getItem('idcontrato')) {
                            let contra = JSON.parse(sessionStorage.getItem('idcontrato'));
                            this._service.getFacultativoContra(contra).then(
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
                                  this.alert.success('Exito','Haz complertado el 100% de participación');
                                  this.router.navigate(['/admin/contratos/facultativos/proporcionales/facultativo/edit']);
                                } else {
                                  this.alert.info('Quieres seguir agregando nomina', '/admin/contratos/facultativos/proporcionales/facultativo/edit');
                                }
                                console.log(res);
                              },
                              
                            );
                          }else{
                            sessionStorage.removeItem('editarC');
                            sessionStorage.removeItem('v');
                            sessionStorage.removeItem('idcrearfinal');
                            sessionStorage.removeItem('id');
                            sessionStorage.removeItem('idramos');
                            sessionStorage.removeItem('idcontratoreasegurador');
                            this.alert.success('Exito','Haz complertado el 100% de participación');
                            //this.router.navigate(['/admin/contratos/facultativos/proporcionales/facultativo/edit']);
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
          
        }else{
          let contra = JSON.parse(sessionStorage.getItem('idcontrato'));
          this.alert.loading();
          this._service.getFacultativoContra(contra).then(
            res => {
              this.listareasu = res;
              var parti: Number;
              for (let index = 0; index < this.listareasu.length; index++) {
                if (this.listareasu[index].a == idfinal) {
                    parti = this.cortarDesimalesfinal(this.listareasu[index].part);
                    console.log(parti);
                }
                
              }
              var por: Number = parseInt(this.removeProsentaje(this.form.participacion));
              var suma = Number(parti) + Number(por); 
              console.log(suma);
              if (suma > 100) {
                this.alert.error('error','El total de la participanción de las nominas supera el 100%');
              } else {
                this.alert.loading();
                this._service.postNomina(JSON.parse(localStorage.getItem('comision'))).then(
                  res => {
                      //this.alert.success('Exito','Haz complertado el 100% de participación');
                      this.eliminarform();
                      this.removeElement();
                            sessionStorage.removeItem('editarC');
                            sessionStorage.removeItem('v');
                            sessionStorage.removeItem('idcrearfinal');
                            sessionStorage.removeItem('id');
                            sessionStorage.removeItem('idcontrato')
                            sessionStorage.removeItem('idramos');
                            sessionStorage.removeItem('idcontratoreasegurador');
                      this.router.navigate(['/admin/contratos/facultativos/proporcionales/facultativo/edit']);
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
        this.alert.error('error','El total de la participanción de las nominas supera el 100%');
        /* this.router.navigate([
          '/admin/contratos/facultativos/proporcionales/facultativo/edit'
        ]); */
      }
    }
  }
  cortarDesimales(item: any) {
    return Math.trunc(item)+'%';
  }
  cortarDesimalesfinal(item: any) {
    return Math.trunc(item);
  }
  eliminarform(){
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
  /* guardar() {

    this.form.depositoRetenido = this.removeProsentaje(this.form.depositoRetenido);
    this.form.comision = this.removeProsentaje(this.form.comision);
    this.form.comisionUtilidad = this.removeProsentaje(this.form.comisionUtilidad);
    this.form.gasto = this.removeProsentaje(this.form.gasto);
    this.form.participacion = this.removeProsentaje(this.form.participacion);
    this.form.inpuestoPrimaCedidas = this.removeProsentaje(this.form.inpuestoPrimaCedidas);
    this.form.inpuestoRenta = this.removeProsentaje(this.form.inpuestoRenta);
    //this.form.arrastrePerdida = this.removerDesimal(this.form.arrastrePerdida);

    if (this.form.deposito.reservaAsumida != true) {
      this.form.deposito.PorcentajeR = this.removeProsentaje(this.form.deposito.PorcentajeR);
      this.form.deposito.PorcentajeI = this.removeProsentaje(this.form.deposito.PorcentajeI);
    }

    if (this.form.corredor == "") {
      this.form.dtbrok = "";
    } else {
      this.form.dtbrok = this.removeProsentaje(this.form.dtbrok);
    }

    if (this.form.cartera == 'Sin traspaso') {
      this.form.traspasoCartera.Cuenta = "";
    }
    this.form.ModelComision = {
      idcomision: this.form.ModelComision.idcomision,
      sobrecomisionMaxCheck: this.form.ModelComision.sobrecomisionMaxCheck,
      sobrecomisionMaxVal: this.form.ModelComision.sobrecomisionMaxVal != '' ? this.form.ModelComision.sobrecomisionMaxVal : 0,
      sobrecomisionMinCheck: this.form.ModelComision.sobrecomisionMinCheck,
      sobrecomisionMinVal: this.form.ModelComision.sobrecomisionMinVal != '' ? this.form.ModelComision.sobrecomisionMinVal : 0,
      siniestralidadMaxCheck: this.form.ModelComision.siniestralidadMaxCheck,
      siniestralidadMaxVal: this.form.ModelComision.siniestralidadMaxVal != '' ? this.form.ModelComision.siniestralidadMaxVal : 0,
      siniestralidadMinCheck: this.form.ModelComision.siniestralidadMinCheck,
      siniestralidadMinVal: this.form.ModelComision.siniestralidadMinVal != '' ? this.form.ModelComision.siniestralidadMinVal : 0,
      valueFija: this.form.ModelComision.valueFija != '' ? this.form.ModelComision.valueFija : 0,
      ComVal: this.form.ModelComision.ComVal != '' ? this.form.ModelComision.ComVal : 0,
      SinVal: this.form.ModelComision.SinVal != '' ? this.form.ModelComision.SinVal : 0
    };
    //modificar nomina selecionada
    //this.validarForm(this.form);
    const edicion = this.updateNomina(this.form);
 
    if (this.errores.error == false) {
      if (this.form.participacion != null && this.form.participacion <= 100) {
        if (!edicion) {
          this.datajsonNominas.push(this.form);
          sessionStorage.setItem("cap_" + sessionStorage.getItem('tbE'), JSON.stringify(this.datajsonNominas))
          sessionStorage.setItem("comisionEdit", JSON.stringify(this.datajsonNominas));
        }
        this.router.navigate([
          "/admin/contratos/facultativos/proporcionales/facultativo/edit"
        ]);
      } else {
        this.messageError("Verifique que el valor de la nomina nosea superior a 100 o no este definido");
      }
    }

  } */

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
          boolP = this.datoEditc != undefined ? true : false;
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
 sendModalborker() {
  console.log(this.form.Modeldtbrok);
  if (this.form.Modeldtbrok.sobredtbrokMaxCheck == true) {
    this.form.dtbrok = this.form.Modeldtbrok.sobredtbrokMaxVal;
  }
  if (this.form.Modeldtbrok.sobredtbrokMinCheck == true) {
    this.form.dtbrok = this.form.Modeldtbrok.sobredtbrokMinVal;
  }
  if (this.form.Modeldtbrok.siniestralidaddtbrokMaxCheck == true) {
    this.form.dtbrok = this.form.Modeldtbrok.siniestralidaddtbrokMaxVal;
  }
  if (this.form.Modeldtbrok.siniestralidaddtbrokMinCheck == true) {
    this.form.dtbrok = this.form.Modeldtbrok.siniestralidaddtbrokMinVal;
  }

  if (this.form.Modeldtbrok.dtbrokComCheck == true) {
    this.form.dtbrok = this.form.Modeldtbrok.dtbrokComVal;
  }
  if (this.form.Modeldtbrok.dtbrokSinChech == true) {
    this.form.dtbrok = this.form.Modeldtbrok.dtbrokSinVal;
  }

  if (this.valorComision == 'fija') {
    this.form.dtbrok = this.form.Modeldtbrok.dtbrokvalueFijados;
  }
  this.form.dtbrok = this.desimalPor(this.form.dtbrok);
}
}
