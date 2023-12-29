import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

interface years {
  value: string;
  viewValue: string;
}

type NewType = years;

@Component({
  selector: 'app-facultativos-especial',
  templateUrl: './facultativos-especial.component.html',
  styleUrls: ['./facultativos-especial.component.css']
})
export class FacultativosEspecialComponent implements OnInit {
  public form: FormGroup;
  public formTwo: FormGroup;
  public entities: any = [];
  public selectedOption: any;
  public createForm: any;
  public contratofinal: any;
  public statefinal: boolean
  public options: any[] = [];
  public lisRequest: boolean;
  public lisRequest3: boolean;
  public selectcontrato: any
  public listareasu: any
  public polizacontrato: any;
  public idsegurador: any
  public idpoliza: any;
  public aseguradorpoliza: any;
  constructor(
    private myFormBuilder: FormBuilder,
    private myFormBuilderTwo: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initial()
  }
  public dataSource: MatTableDataSource<any>
  public dataSourceTwo: MatTableDataSource<any>
  public dataSourceTree: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['codRamo', 'ramos', 'sumaLimite', 'primaReaseguradora', 'cesion'];
  displayedColumnsTwo: string[] = ['contrato', 'tramo', 'sumaRetenida', 'sumaCedida', 'primaRetenida', 'primaCedida'];
  displayedColumnsTree: string[] = ['corredor', 'reasegurador', 'sumaCedida', 'primaCedida', 'comision', 'depositosRetenidos', 'impCedida', 'brokerage', 'valorPagar'];
  myYears: NewType[] = [
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
  ];
  initial() {
    this.form = this.myFormBuilder.group({
      poliza1: [Menssage.empty, Validators.compose([Validators.required])],
      date: [Menssage.empty, Validators.compose([Validators.required])],
      ciudad: [Menssage.empty, Validators.compose([Validators.required])],
      certificado: [Menssage.empty, Validators.compose([Validators.required])],
      asegurado: [Menssage.empty, Validators.compose([Validators.required])],
      nit: [Menssage.empty, Validators.compose([Validators.required])],
    })

    this.formTwo = this.myFormBuilderTwo.group({
      identyContract: [Menssage.empty, Validators.compose([Validators.required])],
      descripcion: [Menssage.empty, Validators.compose([Validators.required])],
      moneda: [Menssage.empty, Validators.compose([Validators.required])],
      inicio: [Menssage.empty, Validators.compose([Validators.required])],
      fin: [Menssage.empty, Validators.compose([Validators.required])],

    })

  }
  clearForm() {
    Swal.fire({
      title: 'Borrar?',
      text: "Deseas borrar los datos ingresados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El formulario ha sido borrado',
          'success'
        )
        this.form.reset()
      }
    })
  }
  clearFormTwo() {
    Swal.fire({
      title: 'Borrar?',
      text: "Deseas borrar los datos ingresados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El formulario ha sido borrado',
          'success'
        )
        this.formTwo.reset()
      }
    })
  }

  sendForm(item: any) {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.form)
    this.form.reset()
  }
  sendFormTwo(item: any) {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.formTwo)
    this.formTwo.reset()
  }
  loadramos() {
    console.log(this.aseguradorpoliza);
    if (this.aseguradorpoliza) {
      const data = {
        id: this.idpoliza
      }
      console.log(data);
      this.authService.postFacultativosRamos(data). then(
        res =>{
          //this.listareasu2 = res;
          console.log(res);
        }
      )
    }
  }
  contratosfacultativos() {
    this.lisRequest = true
    if (this.formTwo.controls.identyContract.value) {
      const item = {
        word: this.formTwo.controls.identyContract.value,
        type: 10,
      };
      console.log(item)
      this.authService.postFacultativosContratos(item).then(
        res => {
          this.options = res;

          console.log(this.options);
        },
        err => {
          console.log(err);
        }
      )
    }

  }
  upload(item: any) {
    console.log(item)
    this.formTwo.controls.descripcion.setValue(item.c)
    this.formTwo.controls.inicio.setValue(item.r)
    this.formTwo.controls.fin.setValue(item.e)
    if (item.s == 3) {
      this.formTwo.controls.moneda.setValue('COP');
    } else if (item.s == 2) {
      this.formTwo.controls.moneda.setValue('EUR');
    } else {
      this.formTwo.controls.moneda.setValue('USD');
    }
    this.lisRequest = false
    this.selectcontrato = item
    this.authService.getFacultativoContrato(item.pro_id).then(
      res => {
        this.dataSource = res;
        console.log('aqui dtaSource', this.dataSource)
      },
      err => {
        console.log(err);
      }
    )
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  procentajedos(item: any) {
    if (item != null && item !== '') {
      const e = parseFloat(item);
      return e + '%';
    }
  }
  porcentaje(key: any, form: any) {
    if (!!form) {
      const value = this.formTwo.controls[key].value;
      this.formTwo.controls[key].setValue(
        this.procentajedos(value)
      )
    } else {
      return this.procentajedos(key);
    }
  }
  miles(form: any, key: any) {
    if (form === 'formTwo') {
      let value = this.formTwo.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.desimal(this.formTwo.controls[key].value)
      }
      const val = this.desimal(value);
      this.formTwo.controls[key].setValue(val.toString())
    }
    if (form === 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    }
  }
  create() {
    if (this.form.valid) {
      const data = {
        poliza: this.form.controls.poliza1.value,
        certificado: this.form.controls.certificado.value,
        fechaemision: this.form.controls.date.value,
        ciudad: this.form.controls.ciudad.value,
        // idsegurador: this.idsegurador,
        // idusers: this.user.authUser.id,

      }
      console.log(data)
      this.authService.postFacultativosAseguradoras(data).then(
        res => {
          localStorage.setItem('idcontrato', JSON.stringify(res));
          this.polizacontrato = res;
          this.statefinal = true;
          //this.selectpoliza = JSON.parse(localStorage.getItem('idcontrato'));;
          console.log(res);
        }
      )
    }
  }
  consultar(item: any) {
    const data2 = {
      word: item.a
    }
    this.authService.postAseguradoraNomina(item).then(
      res => {
        console.log(res)
        if (res.length === 0) {
          this.statefinal = true;
          this.form.controls.poliza1.setValue(item.c);
          this.form.controls.certificado.setValue(item.r);
          this.form.controls.date.setValue(item.e);
          this.form.controls.ciudad.setValue(item.s);
          this.form.controls.asegurado.setValue(item.pc);
          this.form.controls.nit.setValue(item.pn);
          this.idsegurador = item.pa;
          this.idpoliza = item.a;
          this.lisRequest3 = false;
          this.statefinal = true;
          this.polizacontrato = item;
          this.form.enable();
          this.formTwo.enable();
          this.loadramos()
        }
      }, err => {
        console.log(err) //QUEDASTE AQUI  
      }
    )

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
