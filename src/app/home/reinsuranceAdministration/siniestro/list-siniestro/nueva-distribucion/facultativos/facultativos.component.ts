import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-facultativos',
  templateUrl: './facultativos.component.html',
  styleUrls: ['./facultativos.component.css']
})
export class FacultativosComponent implements OnInit {

  modulo = 'Siniestros Facultativos';
  money: any;
  mon: any;
  sucursales: any;
  compania: any;
  dataForm: any;
  poliza: String;
  ctb1: any;
  favoriteSeason: any;
  moneda;
  lisRequest: boolean;
  lisRequest2: boolean;
  lisRequest3: boolean;
  lisRequest4: boolean;
  lisRequest5: string;
  nombrecontrato: string;
  listasegurado: any;
  listasegurado2: any;
  listasegurado3: any;

  ///
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
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
  listareasu3: any;
  contratofinal: any;
  aseguradornit: any;
  aseguradorpoliza: any;
  aseguradorsiniestro: any;
  contrato: any;
  polizacontrato: any;
  selectpoliza: any;
  selectcontrato: any;
  idsegurador;
  idpoliza;
  polizaramos: any;
  private _pct = new Procentajes();
  constructor(
    private http: AuthService,
    private router: Router,
    private alerthService: AlertService
  ) {
  }

  ngOnInit() {
    this.createFormreas();
    this.createFormreasegurador();
    this.lisRequest5 = 'okf';
    this.http.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
  }
  createFormreas() {
    this.cuotaParteForm = new FormGroup({
      poliza: new FormControl('', Validators.required),
      certificado: new FormControl('', Validators.required),
      fechaemision: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      idsegurador: new FormControl('', Validators.required),
      asegurador: new FormControl(''),
      nit: new FormControl(''),
      idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      moneda: new FormControl(''),
      descripcion: new FormControl(''),
      inicio: new FormControl(''),
      fin: new FormControl(''),
      siniestro: new FormControl('', Validators.required),
      valorsiniestro: new FormControl('', Validators.required),
      fechasiniestro: new FormControl('', Validators.required),
      fechadepago: new FormControl('', Validators.required),
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      codigo: new FormControl('', Validators.required),
      ramos: new FormControl('', Validators.required),
      contrato: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      primas: new FormControl('', Validators.required),
      reas: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      siniestro: new FormControl('', Validators.required),
      valorsiniestro: new FormControl('', Validators.required),
      fechasiniestro: new FormControl('', Validators.required),
      fechadepago: new FormControl('', Validators.required),
      moneda: new FormControl(''),
      descripcion: new FormControl(''),
      inicio: new FormControl(''),
      fin: new FormControl(''),
      word: new FormControl(''),
      idpoliza: new FormControl(''),
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
      this.alerthService.loading();
      this.http.postFacultativosContratos(item).then(
        res => {
          this.contratofinal = res;
          console.log(this.contratofinal);
          this.alerthService.messagefin();
        },
        err => {
          console.log(err);
          this.alerthService.messagefin();
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
      this.alerthService.loading();
      this.http.postFacultativoClient(item).then(
        res => {
          this.aseguradornit = res;
          console.log(this.aseguradornit);
          this.alerthService.messagefin();
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
      this.alerthService.loading();
      this.http.postBuscarSiniestro(item).then(
        res => {
          this.aseguradorpoliza = res;
          console.log(res)
          /* const item = { 
            word: this.aseguradorpoliza, 
          };
          console.log(item);
          //this.alerthService.loading();
        this.http.postQuery(item, '/contratos/facultativo/search').then(
          res => {
            this.contratofinal = res;
            console.log(this.contratofinal);
            this.http.getQuery('/facultativo/contrato/' + this.contratofinal.pro_id).then(
              res => {
                this.listareasu = res;
                console.log(res);
                this.alerthService.messagefin();
                
              },
              err => {
                console.log(err);
                this.alerthService.messagefin();
              }
            );
          },
          err => {
            console.log(err);
            this.alerthService.messagefin();
          }
        ); */

          //this.alerthService.messagefin();

        },
        err => {
          console.log(err);
          this.alerthService.messagefin();
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
        this.alerthService.messagefin();

      },
      err => {
        console.log(err);
        this.alerthService.messagefin();
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
    this.cuotaParteForm.controls.certificado.setValue(item.certificado);
    this.cuotaParteForm.controls.fechaemision.setValue(item.fechaemision);
    this.cuotaParteForm.controls.ciudad.setValue(item.ciudad);
    this.cuotaParteForm.controls.asegurador.setValue(item.asegurado);
    this.cuotaParteForm.controls.nit.setValue(item.nitasegurado);
    this.cuotaParteForm.controls.idContratopk.setValue(item.idconbus);
    this.cuotaParteForm.controls.idContrato.setValue(item.idcontratoo);
    this.cuotaParteForm.controls.descripcion.setValue(item.descrip);
    this.cuotaParteForm.controls.inicio.setValue(item.inicio);
    this.cuotaParteForm.controls.fin.setValue(item.final);
    this.idsegurador = item.pa;
    this.lisRequest3 = false;
    this.statefinal = true;
    this.polizacontrato = item;
    //this.loadramos();
    if (item.s == 3) {
      this.cuotaParteForm.controls.moneda.setValue('COP');
    } else if (item.s == 2) {
      this.cuotaParteForm.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteForm.controls.moneda.setValue('USD');
    }
    const data = {
      word: item.idcontratoo
    }
    this.http.postFacultativosContratos(data).then(
      res => {
        this.contratofinal = res[0];
        console.log(this.contratofinal);
        this.http.getFacultativoContra(this.contratofinal.pro_id).then(
          res => {
            this.listareasu3 = res;
            console.log(res);
            this.alerthService.messagefin();

          },
          err => {
            console.log(err);
            this.alerthService.messagefin();
          }
        );
      },
      err => {
        console.log(err);
        this.alerthService.messagefin();
      }
    );


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
    this.alerthService.success('Ok',res);
    this.router.navigate(['admin/contratos']);
    // tslint:disable-next-line:one-line
  }
  enviardatosfinal() {

  }
  create() {
    if (this.cuotaParteForm.controls.poliza.value === undefined || this.cuotaParteForm.controls.poliza.value === '') {
      this.alerthService.info('Hey','Campo del número de poliza es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.certificado.value === undefined || this.cuotaParteForm.controls.certificado.value === '') {
      this.alerthService.info('Hey','Campo certificado es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.fechaemision.value === undefined || this.cuotaParteForm.controls.fechaemision.value === '') {
      this.alerthService.info('Hey','Campo fecha es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.ciudad.value === undefined || this.cuotaParteForm.controls.ciudad.value === '') {
      this.alerthService.info('Hey','Campo ciudad es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.asegurador.value === undefined || this.cuotaParteForm.controls.asegurador.value === '') {
      this.alerthService.info('Hey','Campo Asegurador  es obligatorio');
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
      this.alerthService.info('Hey','Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.ramos.value === undefined || this.cuotaParteFormreasegurador.controls.ramos.value === '') {
      this.alerthService.info('Hey','Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.sumaLimite.value === undefined || this.cuotaParteFormreasegurador.controls.sumaLimite.value === '') {
      this.alerthService.info('Hey','Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.primas.value === undefined || this.cuotaParteFormreasegurador.controls.primas.value === '') {
      this.alerthService.info('Hey','Campo total primas es obligatorio');
    }
    else if (this.cuotaParteFormreasegurador.controls.codigo.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: this.cuotaParteFormreasegurador.controls.codigo.value,
        ramos: this.cuotaParteFormreasegurador.controls.ramos.value,
        sumaLimite: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.sumaLimite.value),
        primas: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primas.value),
        idpoliza: this.polizacontrato.a,
      };
      console.log(data);
      this.http.postFacultativoRamo(data).then(
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
          this.listareasu2 = res;
          console.log(res);

        }
      );
    }
  }

  procesar() {
    console.log(this.favoriteSeason)
    //console.log(data);
    this.alerthService.loading();
    if (this.cuotaParteForm.controls.siniestro.value === undefined || this.cuotaParteForm.controls.siniestro.value === '') {
      this.alerthService.info('Hey','Campo codigo de siniestros es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.valorsiniestro.value === undefined || this.cuotaParteForm.controls.valorsiniestro.value === '') {
      this.alerthService.info('Hey','Campo valor del siniestro es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.fechasiniestro.value === undefined || this.cuotaParteForm.controls.fechasiniestro.value === '') {
      this.alerthService.info('Hey','Campo fecha del siniestro es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.fechadepago.value !== '') {
      const data1 = {
        word: this.cuotaParteForm.controls.siniestro.value,
      }
      this.http.postAseSini(data1).then(
        res => {
          this.listasegurado = res;
          console.log(res);
          this.alerthService.messagefin();
          if (this.listasegurado.length != 0) {
            this.alerthService.info('Hey','Este Siniestro ya fue asignado');
          } else {
            const data = {
              poliza: this.polizacontrato,
              siniestro: this.cuotaParteForm.controls.siniestro.value,
              valorsiniestro: this.cuotaParteForm.controls.valorsiniestro.value,
              fechasiniestro: this.cuotaParteForm.controls.fechasiniestro.value,
              fechadepago: this.cuotaParteForm.controls.fechadepago.value,
              ramocontratos: this.favoriteSeason
            }
            console.log(data)
            this.http.postAseSinistro(data).then(
              res => {
                localStorage.setItem('preocesosinisetro', JSON.stringify(res));
                this.proceso = JSON.parse(localStorage.getItem('preocesosinisetro'));
                const data2 = {
                  word: this.proceso.a
                }
                this.http.postSinistroRamo(data2).then(
                  res => {
                    this.listasegurado = res;
                    console.log(res);
                    //this.alerthService.messagefin();
                  },
                  err => {
                    console.log(err);
                    //this.alerthService.messagefin();
                  });

                console.log(res);
                this.alerthService.messagefin();
                this.alerthService.info('Hey','Esta poliza asignada');
              },
              err => {
                console.log(err);
                this.alerthService.messagefin();
              });
          }
        },
        err => {
          console.log(err);
          this.alerthService.messagefin();
        });

    } else {
      this.alerthService.messagefin();
    }



  }
  guardarpoliza() {
    console.log(this.listasegurado)
    if (this.listasegurado == undefined) {
      this.alerthService.info('Quieres salir sin agregar tu poliza a un contrato', '');
    } else {
      this.alerthService.success('Ok','Tu poliza fue asignada con exito');
      sessionStorage.clear();
    }
  }
  procesarnomina(id: string) {
    this.alerthService.loading();
    const data = {
      poliza: this.polizacontrato,
      contrato: this.selectcontrato,
      idramos: id
    }
    console.log(data)
    this.http.postFacultaProcesoNomina(data).then(
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
            //this.alerthService.messagefin();
          },
          err => {
            console.log(err);
            //this.alerthService.messagefin();
          });

        console.log(res);
        this.alerthService.messagefin();
        this.alerthService.info('Hey','Esta poliza asignada');
      },
      err => {
        console.log(err);
        this.alerthService.messagefin();
      });
  }
  procesarnominas(id: any) {
    this.alerthService.loading();
    const data6 = {
      word: parseInt(id.a)
    }
    console.log(id)
    this.http.postAseNominas(data6).then(
      res => {
        this.listasegurado3 = res;
        console.log(res);
        if (this.listasegurado3.length == 0) {
          const data3 = {
            poliza: this.polizacontrato,
            valorsiniestro: this.cuotaParteForm.controls.valorsiniestro.value,
            ramopoliza: this.listareasu2,
            ramocontratos: this.favoriteSeason,
            idramos: id
          }
          console.log(data3);
          this.http.postAseprocesoNomina(data3).then(
            res => {
              this.listasegurado2 = res;
              console.log(res);
              const data5 = {
                word: parseInt(id.a)
              }
              console.log(data5)
              this.http.postAseNominas(data5).then(
                res => {
                  this.listasegurado3 = res;
                  console.log(res);
                },
                err => {
                  console.log(err);
                  //this.alerthService.messagefin();
                });
              this.alerthService.messagefin();
              this.alerthService.info('Hey','Esta poliza asignada');
            },
            err => {
              console.log(err);
              //this.alerthService.messagefin();
            });
        } else {
          this.alerthService.messagefin();
          this.alerthService.info('Hey','Esta nomina ya fue asignada');
        }

      },
      err => {
        console.log(err);
        //this.alerthService.messagefin();
      });

  }
  siniestrobuscar() {
    this.lisRequest4 = true;
    console.log(this.cuotaParteForm.controls.siniestro.value);
    if (this.cuotaParteForm.controls.siniestro.value) {
      const item = {
        sinistro: this.cuotaParteForm.controls.siniestro.value
      };
      console.log(item);
      this.alerthService.loading();
      this.http.postAseNominas(item).then(
        res => {
          this.aseguradorsiniestro = res;
          if (this.aseguradorsiniestro.length == 0) {
            this.alerthService.messagefin();
            this.lisRequest5 = 'okf';
            this.lisRequest3 = false;
          }
          console.log(res)
        },
        err => {
          console.log(err);
          this.alerthService.messagefin();
        }
      );
    }
  }
  cargarsiniestro(item) {
    this.cuotaParteForm.controls.poliza.setValue(item.codigopol);
    this.cuotaParteForm.controls.certificado.setValue(item.certificado);
    this.cuotaParteForm.controls.fechaemision.setValue(item.fechaemision);
    this.cuotaParteForm.controls.ciudad.setValue(item.ciudad);
    this.cuotaParteForm.controls.asegurador.setValue(item.asegurado);
    this.cuotaParteForm.controls.nit.setValue(item.nitasegurado);
    this.cuotaParteForm.controls.idContratopk.setValue(item.idconbus);
    this.cuotaParteForm.controls.idContrato.setValue(item.idcontratoo);
    this.cuotaParteForm.controls.descripcion.setValue(item.descrip);
    this.cuotaParteForm.controls.inicio.setValue(item.inicio);
    this.cuotaParteForm.controls.fin.setValue(item.final);
    this.cuotaParteForm.controls.siniestro.setValue(item.sin);
    this.cuotaParteForm.controls.valorsiniestro.setValue(this.desimal(this.cortarDesimales(item.valsi)));
    this.cuotaParteForm.controls.fechasiniestro.setValue(item.fech);
    this.cuotaParteForm.controls.fechadepago.setValue(item.final);
    this.idsegurador = item.pa;
    this.lisRequest3 = false;
    this.statefinal = true;
    this.polizacontrato = item;
    console.log(item)
    //this.loadramos();
    if (item.s == 3) {
      this.cuotaParteForm.controls.moneda.setValue('COP');
    } else if (item.s == 2) {
      this.cuotaParteForm.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteForm.controls.moneda.setValue('USD');
    }
    this.lisRequest4 = false;
    const data = {
      word: parseInt(item.idcon)
    }
    this.http.postContratoid(data).then(
      res => {
        this.contratofinal = res[0];
        console.log(this.contratofinal);
        this.http.getFacultativoContra(this.contratofinal.pro_id).then(
          res => {
            var vali = res;
            if (vali.length != 0) {

            }
            this.lisRequest5 = 'ok';
            for (let index = 0; index < vali.length; index++) {
              if (vali[index].a === parseInt(item.idra)) {
                console.log(vali[index]);
                this.favoriteSeason = vali[index];
                this.listareasu3 = vali[index];
                console.log(this.listareasu3);
                this.alerthService.messagefin();
                break;
              } else {
                console.log(res);
                this.alerthService.messagefin();
              }

            }



          },
          err => {
            console.log(err);
            this.alerthService.messagefin();
          }
        );
        const data2 = {
          word: parseInt(item.idsin)
        }
        this.http.postSinistroRamo(data2).then(
          res => {
            this.listasegurado = res;
            console.log(res);
            const data5 = {
              word: parseInt(this.listasegurado.a)
            }
            console.log(data5)
            this.http.postAseNominas(data5).then(
              res => {
                this.listasegurado3 = res;
                console.log(res);
                this.alerthService.messagefin();
              },
              err => {
                console.log(err);
                //this.alerthService.messagefin();
              });
          },
          err => {
            console.log(err);
            //this.alerthService.messagefin();
          });
      },
      err => {
        console.log(err);
        this.alerthService.messagefin();
      }
    );


  }

}
