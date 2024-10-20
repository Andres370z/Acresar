import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nuevo-ajuste',
  templateUrl: './nuevo-ajuste.component.html',
  styleUrls: ['./nuevo-ajuste.component.css']
})
export class NuevoAjusteComponent implements OnInit {

  modulo = 'Ajustes Prima Facultativos';
  money: any;
  mon: any;
  sucursales: any;
  compania: any;
  dataForm: any;
  poliza: String;
  ctb1: any;
  final: any;
  finaldetalle: any;
  finalcontratos: any;
  valor: number;
  valor1: number;
  valorcontratos: number;
  moneda;
  lisRequest: boolean;
  lisRequest2: boolean;
  lisRequest3: boolean;
  nombrecontrato: string;
  listasegurado: any;
  listasegurado2: any;
  listasegurado3: any;
  ///
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  fromajustes: FormGroup;
  fromajustescontratos: FormGroup;
  certificado;
  modeda;
  inicio = '';
  fin;
  sucursalesSelect;
  companiaSelect;
  ramo;
  descripcion;
  sumaAsegurada;
  sumaDistribucion;
  prima;
  identificacion;
  fecha1;
  fecha2;
  statefinal;
  ciudad;
  ramos: any;
  proceso: any;
  procesodos: any;
  tabla = {
    contrato: '',
    tramo: '',
    sumaRetencion: '',
    sumaCedida: '',
    primaRetenida: '',
    primaCedida: ''
  };

  ramotecnico;
  primaDistribucion;
  ProductoSubramo;
  listareasu: any;
  listareasu2: any;
  contratofinal: any;
  aseguradornit: any;
  aseguradorpoliza: any;
  contrato: any;
  polizacontrato: any = [];
  selectpoliza: any;
  selectcontrato: any;
  idsegurador;
  idpoliza;
  polizaramos: any;
  public user: any;
  private _pct = new Procentajes();
  constructor(
    private http: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
  }

  ngOnInit() {
    this.createFormreas();
    this.createFormreasegurador();
    this.fromajustesfinales();
    this.fromajustescontratosfinal();
    console.log(localStorage.getItem('idcontrato'))
    this.http.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
    this.valor = 0;
  }
  createFormreas() {
    this.cuotaParteForm = new FormGroup({
      poliza: new FormControl('', Validators.required),
      certificado: new FormControl({ value: '', disabled: true }, Validators.required),
      fechaemision: new FormControl({ value: '', disabled: true }, Validators.required),
      ciudad: new FormControl({ value: '', disabled: true }, Validators.required),
      idsegurador: new FormControl({ value: '', disabled: true }, Validators.required),
      asegurador: new FormControl({ value: '', disabled: true }),
      nit: new FormControl({ value: '', disabled: true }),
    });
  }
  fromajustesfinales() {
    this.fromajustes = new FormGroup({
      codigoedit: new FormControl({ value: '', disabled: true }, Validators.required),
      ramosedit: new FormControl({ value: '', disabled: true }, Validators.required),
      contratoedit: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimiteedit: new FormControl({ value: '', disabled: true }, Validators.required),
      primasedit: new FormControl('', Validators.required),
      primascentesedit: new FormControl('', Validators.required),
    });
  }
  fromajustescontratosfinal() {
    this.fromajustescontratos = new FormGroup({
      codigoeditct: new FormControl({ value: '', disabled: true }, Validators.required),
      ramoseditct: new FormControl({ value: '', disabled: true }, Validators.required),
      contratoeditct: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimiteeditct: new FormControl({ value: '', disabled: true }, Validators.required),
      primaseditct: new FormControl({ value: '', disabled: true }, Validators.required),
      primasapagardit: new FormControl('', Validators.required),
      operacion: new FormControl('', Validators.required),
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      codigo: new FormControl({ value: '', disabled: true }, Validators.required),
      ramos: new FormControl({ value: '', disabled: true }, Validators.required),
      contrato: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite: new FormControl({ value: '', disabled: true }, Validators.required),
      primas: new FormControl({ value: '', disabled: true }, Validators.required),
      primascentes: new FormControl({ value: '', disabled: true }, Validators.required),
      reas: new FormControl({ value: '', disabled: true }, Validators.required),
      id: new FormControl({ value: '', disabled: true }, Validators.required),
      idContrato: new FormControl({ value: '', disabled: true }, Validators.required),
      idContratopk: new FormControl({ value: '', disabled: true }, Validators.required),
      moneda: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
      inicio: new FormControl({ value: '', disabled: true }),
      fin: new FormControl({ value: '', disabled: true }),
      word: new FormControl({ value: '', disabled: true }),
      idpoliza: new FormControl({ value: '', disabled: true }),
    });
  }
  contratosfacultativos() {
    this.lisRequest = true;
    console.log(this.cuotaParteFormreasegurador.controls.idContrato.value);
    if (this.cuotaParteFormreasegurador.controls.idContrato.value) {
      const item = {
        word: this.cuotaParteFormreasegurador.controls.idContrato.value,
      };
      console.log(item);
      this.alertService.loading();
      this.http.postFacultativosContratos(item).then(
        res => {
          this.contratofinal = res;
          console.log(this.contratofinal);
          this.alertService.messagefin()
          
        },
        err => {
          console.log(err);
          this.alertService.messagefin()
        }
      );
    }
  }
  aseguradorfinal() {
    this.lisRequest2 = true;
    console.log(this.cuotaParteForm.controls.asegurador.value);
    if (this.cuotaParteForm.controls.asegurador.value) {
      const item = {
        word: this.cuotaParteForm.controls.asegurador.value
      };
      console.log(item);
      this.alertService.loading();
      this.http.postFacultativoClient(item).then(
        res => {
          this.aseguradornit = res;
          console.log(this.aseguradornit);
          this.alertService.messagefin()
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  polizabuscar() {
    this.lisRequest3 = true;
    console.log(this.cuotaParteForm.controls.poliza.value);
    if (this.cuotaParteForm.controls.poliza.value) {
      const item = {
        word: this.cuotaParteForm.controls.poliza.value
      };
      console.log(item);
      this.alertService.loading();
      this.http.postBuscarSiniestro(item).then(
        res => {
          this.aseguradorpoliza = res;
          console.log(this.aseguradorpoliza);
          this.alertService.messagefin()

        },
        err => {
          console.log(err);
          this.alertService.messagefin()
        }
      );
    }
  }
  cargar(item) {
    this.cuotaParteFormreasegurador.controls.idContratopk.setValue(item.a);
    this.cuotaParteFormreasegurador.controls.idContrato.setValue(item.o);
    this.cuotaParteFormreasegurador.controls.descripcion.setValue(item.c);
    this.cuotaParteFormreasegurador.controls.inicio.setValue(item.r);
    this.cuotaParteFormreasegurador.controls.fin.setValue(item.e);
    if (item.s == 3) {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('COP');
    } else if (item.s == 2) {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('USD');
    }
    this.lisRequest = false;
    this.selectcontrato = item;
    this.http.getFacultativoContra(item.pro_id).then(
      res => {
        this.listareasu = res;
        console.log(res);
        this.alertService.messagefin()

      },
      err => {
        console.log(err);
        this.alertService.messagefin()
      }
    );
  }
  cargarnit(item) {
    this.cuotaParteForm.controls.asegurador.setValue(item.a2);
    this.cuotaParteForm.controls.nit.setValue(item.r2);
    this.idsegurador = item.a;
    this.lisRequest2 = false;

  }
  cargarpoliza(item) {
    this.cuotaParteForm.controls.poliza.setValue(item.codigopol);
    this.cuotaParteForm.controls.certificado.setValue(1);
    this.cuotaParteForm.controls.fechaemision.setValue(item.fechaemision);
    this.cuotaParteForm.controls.ciudad.setValue(item.ciudad);
    this.cuotaParteForm.controls.asegurador.setValue(item.asegurado);
    this.cuotaParteForm.controls.nit.setValue(item.nitasegurado);
    this.idsegurador = item.idasegurado;
    this.idpoliza = item.idpoliza;
    this.lisRequest3 = false;
    this.statefinal = true;
    this.polizacontrato = item;
    this.alertService.loading();
    this.loadramos();
    this.cuotaParteFormreasegurador.controls.idContratopk.setValue(item.idconbus);
    this.cuotaParteFormreasegurador.controls.idContrato.setValue(item.idcontratoo);
    this.cuotaParteFormreasegurador.controls.descripcion.setValue(item.descrip);
    this.cuotaParteFormreasegurador.controls.inicio.setValue(item.inicio);
    this.cuotaParteFormreasegurador.controls.fin.setValue(item.final);
    if (item.moneda == 3) {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('COP');
    } else if (item.moneda == 2) {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('USD');
    }
    const data = {
      word: parseInt(item.idconbus)
    }
    this.http.postContratoid(data).then(
      res => {
        this.contratofinal = res[0];
        //console.log(this.contratofinal);
        this.http.getFacultativoContra(this.contratofinal.pro_id).then(
          res => {
            this.listareasu = res;
            console.log(this.listareasu);
          },
          err => {
            console.log(err);
            this.alertService.messagefin()
          }
        );
        const data1 = {
          word: parseInt(item.idpoliza)
        }
        this.http.postFacultativoGasto(data1).then(
          res => {
            this.listasegurado = res;
            //console.log(res);
          },
          err => {
            console.log(err);
            //this.alertService.messagefin()
          });
      },
      err => {
        console.log(err);
        this.alertService.messagefin()
      }
    );
    this.lisRequest = false;
  }
  ramosEvent(key: any, num: any, tb: any) {
    const from = this.cuotaParteFormreasegurador.value;
    let data = this.cuotaParteFormreasegurador.controls[tb];
    data = data.value;
    if (key === 'codigo') {

      from[tb][`ramos${num}`] = Number(from[tb][`codigo${num}`]);

      this.cuotaParteForm.setValue(from);
    } else if (key === 'ramos') {
      from[tb][`codigo${num}`] = Number(from[tb][`ramos${num}`]);
      this.cuotaParteForm.setValue(from);
    }

  }
  desimalPor(key: any) {
    let e = key;
    if (e !== undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count === 2) {
          if (e[i - 1] !== undefined) {
            rst = '.' + rst;
          }
          count = 0;
        }
      }
      return rst + '%';
    }
  }
  desimaldo(key: any) {
    let e = key;
    if (e !== undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count === 3) {
          if (e[i - 1] !== undefined) {
            rst = '.' + rst;
          }
          count = 0;
        }
      }
      return rst;
    }
  }
  miles(form: string, key: string) {
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteFormreasegurador.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.desimal(this.cuotaParteFormreasegurador.controls[key].value);
      }
      const val = this.desimal(value);
      this.cuotaParteFormreasegurador.controls[key].setValue(val.toString());
    }

    if (form === 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    }

  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  porcentaje(key: string, form?) {
    if (!!form) {
      const value = this.cuotaParteFormreasegurador.controls[key].value;
      this.cuotaParteFormreasegurador.controls[key].setValue(
        this.procentajedos(value)
      );
    } else {
      return this.procentajedos(key);
    }
  }
  procentajedos(item: any) {
    if (item != null && item !== '') {
      const e = parseFloat(item);
      return e + '%';
    }
  }
  evenRamos(key: string) {
    if (!!key) {
      if (key === 'ramos') {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.codigo.setValue(val);
      } else if (key === 'codigoedit') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.ramosedit.setValue(val);
      } else if (key === 'ramosedit') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.codigoedit.setValue(val);
      } else if (key === 'codigoeditct') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.ramoseditct.setValue(val);
      } else if (key === 'ramoseditct') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.codigoeditct.setValue(val);
      } else {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.ramos.setValue(val);
      }
    }
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  // tslint:disable-next-line:one-line
  verificar() {
    sessionStorage.clear();
    this.cuotaParteForm.reset();
    // tslint:disable-next-line:prefer-const
    let res = 'Contrato creado exitosamente';
    this.alertService.success('Ok',res);
    this.router.navigate(['admin/contratos']);
    // tslint:disable-next-line:one-line
  }
  enviardatosfinal() {

  }
  create() {
    if (this.cuotaParteForm.controls.poliza.value === undefined || this.cuotaParteForm.controls.poliza.value === '') {
      this.alertService.info('Hey','Campo del número de poliza es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.certificado.value === undefined || this.cuotaParteForm.controls.certificado.value === '') {
      this.alertService.info('Hey','Campo certificado es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.fechaemision.value === undefined || this.cuotaParteForm.controls.fechaemision.value === '') {
      this.alertService.info('Hey','Campo fecha es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.ciudad.value === undefined || this.cuotaParteForm.controls.ciudad.value === '') {
      this.alertService.info('Hey','Campo ciudad es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.asegurador.value === undefined || this.cuotaParteForm.controls.asegurador.value === '') {
      this.alertService.info('Hey','Campo Asegurador  es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.poliza.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        poliza: this.cuotaParteForm.controls.poliza.value,
        certificado: this.cuotaParteForm.controls.certificado.value,
        fechaemision: this.cuotaParteForm.controls.fechaemision.value,
        ciudad: this.cuotaParteForm.controls.ciudad.value,
        idsegurador: this.idsegurador,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.http.postFacultativosAseguradoras(data).then(
        res => {
          localStorage.setItem('idcontrato', JSON.stringify(res));
          this.polizacontrato = JSON.parse(localStorage.getItem('idcontrato'));
          this.statefinal = true;
          //this.selectpoliza = JSON.parse(localStorage.getItem('idcontrato'));;
          console.log(res);

        },
        err => {
          console.log(err);
        });
    }


  }
  createnomina() {
    if (this.cuotaParteFormreasegurador.controls.codigo.value === undefined || this.cuotaParteFormreasegurador.controls.codigo.value === '') {
      this.alertService.info('Hey','Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.ramos.value === undefined || this.cuotaParteFormreasegurador.controls.ramos.value === '') {
      this.alertService.info('Hey','Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.sumaLimite.value === undefined || this.cuotaParteFormreasegurador.controls.sumaLimite.value === '') {
      this.alertService.info('Hey','Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.primas.value === undefined || this.cuotaParteFormreasegurador.controls.primas.value === '') {
      this.alertService.info('Hey','Campo total primas es obligatorio');
    }
    else if (this.cuotaParteFormreasegurador.controls.codigo.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: this.cuotaParteFormreasegurador.controls.codigo.value,
        ramos: this.cuotaParteFormreasegurador.controls.ramos.value,
        sumaLimite: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.sumaLimite.value),
        primas: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primas.value),
        primascedentes: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primascentes.value),
        idpoliza: this.polizacontrato.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.getFacultativoContra(data).then(
        res => {
          this.statefinal = true;
          localStorage.setItem('idramos', JSON.stringify(res));
          this.polizaramos = JSON.parse(localStorage.getItem('idramos'));
          console.log(this.polizacontrato.a);
          //this.cuotaParteFormreasegurador.reset();
          this.idpoliza = this.polizacontrato.a;
          this.loadramos()
        },
        err => {
          console.log(err);
        });
    }
  }
  loadramos() {
    console.log(this.aseguradorpoliza);
    if (this.aseguradorpoliza) {
      const data = {
        id: this.idpoliza
      }
      console.log(data);
      this.http.postFacultativosRamos(data).then(
        res => {
          this.alertService.messagefin()
          this.listareasu2 = res;
          console.log(res);

        }
      );
    }
  }

  procesar() {

    //console.log(data);
    this.alertService.loading();
    if (this.polizacontrato.length === 0) {
      this.alertService.info('Hey','Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.selectcontrato.length === 0) {
      this.alertService.info('Hey','Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.listareasu2.length === 0) {
      this.alertService.info('Hey','Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.listareasu.length != 0 || this.listareasu2.length != 0) {

      const data = {
        poliza: this.polizacontrato,
        contrato: this.selectcontrato,
        ramopoliza: this.listareasu2,
        ramocontratos: this.listareasu,
        calculopoliza: this.listasegurado,
        idusers: this.user.authUser.id,
      }
      const idpoli = parseInt(this.polizacontrato.idpoliza);
      this.http.putAseUpdate(idpoli, data).then(
        res => {
          localStorage.setItem('preoceso', JSON.stringify(res));
          this.proceso = JSON.parse(localStorage.getItem('preoceso'));
          const data2 = {
            word: idpoli
          }
          this.http.postFacultativoGasto(data2).then(
            res => {
              this.listasegurado = res;
              console.log(res);
              //this.alertService.messagefin()
            },
            err => {
              console.log(err);
              //this.alertService.messagefin()
            });

          console.log(res);
          this.alertService.messagefin()
          this.alertService.info('Hey','Esta poliza asignada');
        },
        err => {
          console.log(err);
          this.alertService.messagefin()
        });

    }



  }
  guardarpoliza() {
    console.log(this.listasegurado)
    if (this.listasegurado == undefined) {
      this.alertService.info('Hey','Quieres salir sin agregar tu poliza a un contrato');
    } else {
      this.alertService.success('Ok','Tu poliza fue asignada con exito');
      sessionStorage.clear();
    }
  }
  procesarnomina(id: string) {
    this.alertService.loading();
    const data = {
      poliza: this.polizacontrato,
      contrato: this.selectcontrato,
      idramos: id
    }
    console.log(data)
    this.http.postAseNominaFul(data).then(
      res => {
        console.log(res)
        sessionStorage.setItem('preocesodos', JSON.stringify(res));
        this.procesodos = JSON.parse(sessionStorage.getItem('preocesodos'));
        const data2 = {
          word: this.polizacontrato.a
        }
        this.http.postAseguradoraNomina(data2).then(
          res => {
            this.listasegurado = res;
            console.log(res);
            //this.alertService.messagefin()
          },
          err => {
            console.log(err);
            //this.alertService.messagefin()
          });

        console.log(res);
        this.alertService.messagefin()
        this.alertService.info('Hey','Esta poliza asignada');
      },
      err => {
        console.log(err);
        this.alertService.messagefin()
      });
  }
  procesarnominas(id: any) {
    this.alertService.loading();
    const data3 = {
      poliza: this.polizacontrato,
      contrato: this.selectcontrato,
      ramopoliza: this.listareasu2,
      ramocontratos: this.listareasu,
      idramos: id
    }
    this.http.postAseProceUpdate(data3).then(
      res => {
        this.listasegurado2 = res[0];
        console.log(res);
        const data5 = {
          word: parseInt(id.a)
        }
        this.http.postAseguradoraNomina(data5).then(
          res => {
            this.listasegurado3 = res;
            console.log(res);
          },
          err => {
            console.log(err);
            //this.alertService.messagefin()
          });
        this.alertService.messagefin()
        this.alertService.info('Hey','Esta poliza asignada');
      },
      err => {
        console.log(err);
        //this.alertService.messagefin()
      });
  }
  editarramos(res: any) {
    this.final = res;
    this.valor = 1;
    console.log(this.final);
    this.fromajustes.controls.codigoedit.setValue(res.re);
    this.fromajustes.controls.ramosedit.setValue(res.re);
    this.fromajustes.controls.sumaLimiteedit.setValue(this.desimal(this.cortarDesimales(res.e)));
    this.fromajustes.controls.primasedit.setValue(this.desimal(this.cortarDesimales(res.s)));
    this.fromajustes.controls.primascentesedit.setValue(this.desimal(this.cortarDesimales(res.a2)));

  }
  editarramoscontratos(res: any) {
    this.finalcontratos = res;
    this.valorcontratos = 1;
    //console.log(this.final);
    this.fromajustescontratos.controls.codigoeditct.setValue(res.rm);
    this.fromajustescontratos.controls.ramoseditct.setValue(res.rm);
    this.fromajustescontratos.controls.sumaLimiteeditct.setValue(this.desimal(this.cortarDesimales(res.c)));
    this.fromajustescontratos.controls.primaseditct.setValue(this.desimal(this.cortarDesimales(res.ttl)));
    this.fromajustescontratos.controls.primasapagardit.setValue(this.desimal(this.cortarDesimales(res.pv)));
    this.fromajustescontratos.controls.operacion.setValue(res.st);

  }
  eliminarramos(res: any) {
    console.log(res);
    const data = {
      idusers: this.user.authUser.id,
    };
    this.alertService.loading();
    this.http.putFacul(res, data)
      .then(
        res => {
          this.loadramos()
          this.alertService.success('Ok',"Ramo Eliminado correctamente");
        },
        err => {
          console.log(err);
        }
      )
  }
  guardareditarramos() {
    this.alertService.loading();
    if (this.fromajustes.controls.codigoedit.value === undefined || this.fromajustes.controls.codigoedit.value === '') {
      this.alertService.info('Hey','Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.ramosedit.value === undefined || this.fromajustes.controls.ramosedit.value === '') {
      this.alertService.info('Hey','Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.sumaLimiteedit.value === undefined || this.fromajustes.controls.sumaLimiteedit.value === '') {
      this.alertService.info('Hey','Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.primasedit.value === undefined || this.fromajustes.controls.primasedit.value === '') {
      this.alertService.info('Hey','Campo total primas es obligatorio');
    }
    else if (this.fromajustes.controls.codigoedit.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: this.fromajustes.controls.codigoedit.value,
        ramos: this.fromajustes.controls.ramosedit.value,
        sumaLimite: this._pct.removerDesimal(this.fromajustes.controls.sumaLimiteedit.value),
        primas: this._pct.removerDesimal(this.fromajustes.controls.primasedit.value),
        primascedentes: this._pct.removerDesimal(this.fromajustes.controls.primascentesedit.value),
        idpoliza: this.final.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.putFaculUpdate(this.final.a, data).then(
        res => {
          this.loadramos()
        },
        err => {
          console.log(err);
        });
    }

  }
  guardareditarramoscontratos() {
    this.alertService.loading();
    if (this.fromajustescontratos.controls.codigoeditct.value === undefined || this.fromajustescontratos.controls.codigoeditct.value === '') {
      this.alertService.info('Hey','Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustescontratos.controls.ramoseditct.value === undefined || this.fromajustescontratos.controls.ramoseditct.value === '') {
      this.alertService.info('Hey','Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustescontratos.controls.sumaLimiteeditct.value === undefined || this.fromajustescontratos.controls.sumaLimiteeditct.value === '') {
      this.alertService.info('Hey','Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustescontratos.controls.primaseditct.value === undefined || this.fromajustescontratos.controls.primaseditct.value === '') {
      this.alertService.info('Hey','Campo total primas es obligatorio');
    }
    else if (this.fromajustescontratos.controls.codigoeditct.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: this.fromajustescontratos.controls.codigoeditct.value,
        ramos: this.fromajustescontratos.controls.ramoseditct.value,
        sumaLimite: this._pct.removerDesimal(this.fromajustescontratos.controls.sumaLimiteeditct.value),
        primas: this._pct.removerDesimal(this.fromajustescontratos.controls.primaseditct.value),
        primascedentes: this._pct.removerDesimal(this.fromajustescontratos.controls.primasapagardit.value),
        operacion: this.fromajustescontratos.controls.operacion.value,
        idpoliza: this.finalcontratos.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.putUpdatepoliza(this.finalcontratos.a, data).then(
        res => {
          this.http.getFacultativoContra(this.contratofinal.pro_id).then(
            res => {
              this.listareasu = res;
              this.alertService.messagefin()
            },
            err => {
              console.log(err);
              this.alertService.messagefin()
            }
          );
        },
        err => {
          console.log(err);
        });
    }

  }
  nuevoContrato() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.fromajustes.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
  }
  cerrar() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.fromajustes.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
    this.router.navigate(['admin/contratos/ajuste/list-primas']);
  }
  verdetalle(item: any) {
    this.finaldetalle = item;
    this.valor1 = 1;
  }

}
