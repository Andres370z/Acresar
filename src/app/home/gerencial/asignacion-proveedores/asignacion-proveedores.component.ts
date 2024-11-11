import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { Procentajes } from '../../commos/porcentajes';

@Component({
  selector: 'app-asignacion-proveedores',
  templateUrl: './asignacion-proveedores.component.html',
  styleUrls: ['./asignacion-proveedores.component.css']
})
export class AsignacionProveedoresComponent implements OnInit {
  modulo: string = 'Asociación de Contratos';
  formulario: FormGroup;
  ramos: any;
  tiposAsoc: any;
  dataReq: any;
  lisRequest = false;
  showList = false;
  showAssoc = false;
  detail: any;
  selectedDetailItems = [];
  rl = '/asociaciondecontratos';
  list: any;
  listAsociacion = new Array();
  checkList = [];
  tipoContrato = '';
  listRamos: any = [];
  listprovedor: any;

  provedoresAsignacion = new Array();
  provedorG: any;
  provedorListView = false;
  procentajes = new Procentajes();

  public form: FormGroup;
  public options: any[] = [];
  public click: any
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private _http: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this._http.getProvedores().then(
      res => {
        this.provedorG = res;
      }
    )
    this._http.getProvedores().then((res: any) => {
      this.listprovedor = res
    })
  }



  searchContracs() {
    if (this.form.controls.tipoContrato.valid) {
      const data = {
        type: true,
        word: this.form.controls.tipoContrato.value

      }
      this.authService.postSearchIdcontracs(data).then(
        res => {
          this.options = res
        }, err => {
          this.alert.error('Error', 'Solicitud no enviada');
          console.log(err)
        }
      )
    }
  }
  upload(item: any) {
    this.click = true
    console.log(item)
  }
  createForm() {
    this.formulario = new FormGroup({
      tipoContrato: new FormControl('', Validators.required),
      idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fInicio: new FormControl('', Validators.required),
      fFin: new FormControl('', Validators.required),
      ramo: new FormControl('', Validators.required),
      tipoAsociacion: new FormControl('', Validators.required),
      otrosGastos: new FormControl('', Validators.required),
      distribucion: new FormControl('', Validators.required),
      provedor: new FormControl(''),
      vlProvedor: new FormControl(''),
    });
  }

  consultar() {
    this.lisRequest = true;
    if (this.formulario.controls.idContrato.value) {
      const item = { word: this.formulario.controls.idContrato.value, type: true };
      this._http.postSearchIdcontracs(item)
        .then(
          res => {
            this.dataReq = res;
          }
        );
    }
  }

  cargar(item) {
    this.tipoContrato = item;
    const cotizacion = item.cotizacion;
    this.formulario.controls.idContratopk.setValue(item.a);
    this.formulario.controls.idContrato.setValue(item.o);
    this.formulario.controls.descripcion.setValue(item.c);
    this.formulario.controls.fInicio.setValue(item.r);
    this.formulario.controls.fFin.setValue(item.e);
    this.formulario.controls.tipoContrato.setValue(item.cat);

    if (cotizacion.length > 0) {
      this.formulario.controls.otrosGastos.setValue(cotizacion[0].g);
    } else {
      this.formulario.controls.otrosGastos.setValue(0);
    }

    if (item.ramos.length == 0) {
      this.alert.error('hey', 'No hay ramos relacionados en el contrato');
    } else {
      this.listRamos = item.ramos;
    }


    this.lisRequest = false;
  }

  miles(vl, key?) {
    if (key !== undefined) {
      const value = this.procentajes.removerDesimal(this.formulario.controls[key].value);
      this.formulario.controls[key].setValue(this.procentajes.desimalDeMiles(value))
    } else {
      const value = this.procentajes.removerDesimal(vl);
      return this.procentajes.desimalDeMiles(value);
    }
  }

  milesRamos(e) {
    console.log(e.value);
    e.value = this.miles(e.value);
  }

  changeProvedores(): void {
    const json = {
      p: this.formulario.controls['provedor'].value,
      vl: this.formulario.controls['vlProvedor'].value
    };
    this.formulario.controls['provedor'].setValue('');
    this.formulario.controls['vlProvedor'].setValue('');
    if (json.p !== '' && json.vl != '') {
      this.provedoresAsignacion.push(json);
      this.provedorListView = true;
    }
  }

  provedor(id) {
    for (let i = 0; i <= Object.keys(this.provedorG).length - 1; i++) {
      const item = this.provedorG[i];
      if (item.a === Number(id)) {
        return item.a2;
      }
    }

  }

  guardar() {
    const data = this.formulario.value;
    const ramosValue = [];
    this.listRamos.forEach(element => {
      const value_rm = $(`#value_${element.c}`).val();
      ramosValue.push({
        rm: element.a,
        vm: value_rm
      });
    });
    data.ramos = ramosValue;
    data.provedor = this.provedoresAsignacion;
    console.log(data);

    this._http.postAdmin(data).then(
      (res) => {
        if (res.state) {
          this.alert.success('Ok', res.msg);
          this.formulario.reset();
          this.provedoresAsignacion = [];
          this.listRamos = [];
        } else {
          this.alert.error('Ups', res.msg);
        }
      }
    )
  }


}
