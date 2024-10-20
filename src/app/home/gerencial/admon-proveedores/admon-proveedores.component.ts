import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admon-proveedores',
  templateUrl: './admon-proveedores.component.html',
  styleUrls: ['./admon-proveedores.component.css']
})
export class AdmonProveedoresComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  listProvedor: any;
  formulario: FormGroup;
  moneda: any;
  modulo = 'Proveedores';
  tipo = [
    { id: 1, nombre: 'Informe de inspección' },
    { id: 2, nombre: 'Reporte de seguimiento' },
    { id: 3, nombre: 'Reporte de asistencia' },
    { id: 4, nombre: 'Informe de contrato' },
    { id: 5, nombre: 'Informe confidencial' },
    { id: 6, nombre: 'Certificación' },
    { id: 7, nombre: 'Certificado de seguro' },
    { id: 8, nombre: 'Mapas de riesgo' }
  ];

  estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'En proceso' },
    { id: 3, nombre: 'Realizado' },
  ];

  suma: Number = 0;
  file1: any;
  file2: any;
  nCant = 0;

  constructor(
    private _http: AuthService,
    private _form: FormBuilder,
    private _rd: Renderer2,
    private _rt: Router
  ) { }

  ngOnInit() {
    this._http.getCurrency().then(res => this.moneda = res);
    this._http.getProvedores().then((res: any) => {
      this.listProvedor = res
    });
    this.createFom();
  }

  createFom() {
    this.formulario = this._form.group(
      {
        provedor: new FormControl(),
        tipoInformacion: new FormControl(),
        documento: new FormControl(),
        detalle: new FormControl(),
        fecha: new FormControl(),
        estado: new FormControl(),
        valor: new FormControl()
      }
    );
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

    const td5 = this._rd.createElement('td');
    const input5 = this._rd.createElement('input');

    const td6 = this._rd.createElement('td');
    const input6 = this._rd.createElement('input');

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

    for (let i = 0; i <= Object.keys(this.moneda).length - 1; i++) {
      const v = this.moneda[i];
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

    this._rd.addClass(input5, 'form-control');
    this._rd.addClass(input5, 'archive');
    this._rd.appendChild(td5, input5);

    this._rd.addClass(input6, 'file');
    this._rd.setAttribute(input6, 'type', 'file');
    this._rd.setStyle(input6, 'width', '140px');
    this._rd.listen(input6, 'change', (e) => {
      console.log(e);
    });

    this._rd.appendChild(td6, input6);


    this._rd.appendChild(tr, td);
    this._rd.appendChild(tr, td2);
    this._rd.appendChild(tr, td3);
    this._rd.appendChild(tr, td4);
    this._rd.appendChild(tr, td5);
    this._rd.appendChild(tr, td6);
    this._rd.appendChild(this.table.nativeElement, tr);
  }


  calcular() {

    let sumaPagos = 0;
    const e = document.querySelector('#gpagos').children;

    for (let i = 0; i <= e.length - 1; i++) {
      const data = [];
      const v = e[i].children;
      for (let j = 0; j <= v.length - 1; j++) {
        const n = v[j].children[0];
        if (n.getAttribute('name') === 'valor') {
          if (i == 0) {
            this.formulario.controls.valor.setValue(n['value']);
          }
          if (n['value'] != '') {
            const numero = parseInt(n['value']);
            sumaPagos = sumaPagos + numero;
          }
        }
      }
    }
    this.suma = sumaPagos;
  }

  valoresGarantia() {

    let list: Array<any> = [];
    const e = document.querySelector('#gpagos').children;

    for (let i = 0; i <= e.length - 1; i++) {

      const v = e[i].children;
      const data = {
        nPagos: v[0].children[0]['value'],
        fecha: v[1].children[0]['value'],
        moneda: v[2].children[0]['value'],
        valor: v[3].children[0]['value'],
        factura: v[4].children[0]['value']
      };
      this.nCant = i + 1;
      list.push(data);

    }

    return list;


  }

  files(files, f) {
    const file = files[0];
    if (f == 1) {
      this.file1 = file;
    }
    if (f == 2) {
      this.file2 = file;
    }
  }

  save() {
    const list = this.valoresGarantia();
    const from = new FormData();
    const json = this.formulario.value;
    this.formulario.reset();

    from.append('provedor', json.provedor);
    from.append('tipoInformacion', json.tipoInformacion);
    from.append('documento', json.documento);

    from.append('detalle', json.detalle);
    from.append('fecha', json.fecha);
    from.append('estado', json.estado);
    from.append('formaDePago', JSON.stringify(list));
    from.append('fecha2', json.fecha2);
    from.append('valor', json.valor);
    from.append('factura', json.factura);
    from.append('files0', this.file1);
    from.append('files1', this.file2);

    this._http.postForm(from).then(
      res => {
        this._rt.navigate(['home/gerencial']);
      }
    );

  }

  deposito() {
    this.valoresGarantia();
    this.formulario.controls.valor.setValue(this.suma);
  }

}
