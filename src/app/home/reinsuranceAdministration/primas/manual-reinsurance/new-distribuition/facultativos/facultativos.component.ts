import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

interface years {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-facultativos',
  templateUrl: './facultativos.component.html',
  styleUrls: ['./facultativos.component.css'] 
})
export class FacultativosComponent implements OnInit {
  public form: FormGroup;
  public formTwo: FormGroup;
  public entities: any = [];
  public selectedOption: any;
  public createForm: any;
  aseguradorpoliza: any;
  aseguradornit: any;
  lisRequest3: boolean;
  statefinal: any;
  idpoliza;
  idsegurador
  polizacontrato: any;
  listareasu2: any;
  lisRequest: boolean;
  contratofinal: any;
  selectcontrato: any;
  listareasu: any;
  validar: any;

  mostrarTabla: boolean = false;
  constructor(
    private myFormBuilder: FormBuilder,
    private myFormBuilderTwo: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) { }
  @ViewChild(MatTable) table: MatTable<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = [{ codRamo: '', ramos: '', sumaLimite: '' , primaReaseguradora: '', cesion: ''}];
  
  displayedColumns: string[] = ['codRamo', 'ramos', 'sumaLimite', 'primaReaseguradora', 'cesion'];
  myYears: years[] = [
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'},
    {value: '2021', viewValue: '2021'},
    {value: '2022', viewValue: '2022'},
    {value: '2023', viewValue: '2023'},
    {value: '2024', viewValue: '2024'},
  ];
  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      poliza1: [Menssage.empty, Validators.compose([Validators.required])],
      years: [Menssage.empty, Validators.compose([Validators.required])],
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
  clearForm(){
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
  clearFormTwo(){
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
  
  sendForm(item:any){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.form)
    this.form.reset()
  }
  sendFormTwo(item:any){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.formTwo)
    this.formTwo.reset()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  polizaBuscar(){
    this.lisRequest3 = true;
    if (this.form.value.poliza1) {
      const item = {
        date: "",
        word: this.form.value.poliza1
      };
      this.authService.postBuscarAseguadora(item).then((res: any)=>{
        console.log(res);
        this.aseguradorpoliza = res
        
      }, err => {
        console.log(err);
        
      })
    }
  }

  aseguradorfinal(){
    if (this.form.value.asegurado) {
      const item = {
        word : this.form.value.asegurado,
        date: '2019-01-04'
      }
      this.authService.postFacultativoClient(item).then((res: any)=>{
        console.log(res);
        this.aseguradornit = res
      }, err =>{
        console.log(err);
        
      })
    }
  }
  create(){
    if (this.form.valid) {
      const data = {
        poliza: this.form.value.poliza1,
        certificado: this.form.value.certificado,
        fechaemision: this.form.value.date,
        ciudad: this.form.value.ciudad,
        idsegurador: this.form.value.poliza1,
        idusers: this.form.value.poliza1,
      };
    }else{
      console.log('Faltan campos por llenar');
      
    }
  }
  consultar(item: any){
    const data2 = {
      word: item.a
    }
    this.authService.postAseguradoraNomina(item).then((res: any)=>{
      if (res.length === 0) {
        this.statefinal = true;
        this.form.controls.poliza.setValue(item.c);
        this.form.controls.certificado.setValue(item.r);
        this.form.controls.date.setValue(item.e);
        this.form.controls.ciudad.setValue(item.s);
        this.form.controls.idsegurador.setValue(item.pc);
        this.form.controls.nit.setValue(item.pn);
        this.idsegurador = item.pa;
        this.idpoliza = item.a;
        this.lisRequest3 = false;
        this.statefinal = true;
        this.polizacontrato = item;
        //this.cuotaParteForm.enable();
        this.form.enable();
        //this.fromajustes.enable();
        this.loadramos();

      } else {
        this.statefinal = false;
        this.lisRequest3 = false;
        /* this.cuotaParteForm.disable();
        this.cuotaParteForm.controls.poliza.enable();
        this.cuotaParteFormreasegurador.disable();
        this.fromajustes.disable(); */
      }
    })
  }
  cargarpoliza(item) {
    this.consultar(item);
  }

  loadramos(){
    if (this.aseguradorpoliza) {
      const data = {
        id: this.idpoliza
      }
      this.authService.postFacultaRamosEdit(data).then((res: any)=>{
        this.listareasu2 = res;
      }, err =>{
        console.log(err);
      })
    }
  }

  createnomina(){
    console.log('save data');
    
  }
  contratosfacultativos(){
    this.lisRequest = true;
    console.log(this.formTwo.controls.identyContract.value);
    if (this.formTwo.controls.identyContract.value) {
      const item = {
        word : this.formTwo.controls.identyContract.value,
        type: 10
      }
      console.log(item);
      this.authService.postFacultativosContratos(item).then((res: any)=>{
        console.log(res);
        this.contratofinal = res;
        
      }, err => {
        
        console.log(err);
        
      })
    }

  }
  cargar(item: any){
    this.alertService.loading()
    this.mostrarTabla = true;
    setTimeout(() => {
      this.alertService.messagefin() 
    }, 3000); // 3000 milisegundos = 3 segundos
    this.formTwo.controls.identyContract.setValue(item.o);
    this.formTwo.controls.descripcion.setValue(item.c);
    this.formTwo.controls.inicio.setValue(item.r);
    this.formTwo.controls.fin.setValue(item.e);
    if (item.s == 3) {
      this.formTwo.controls.moneda.setValue('COP');
    } else if (item.s == 2) {
      this.formTwo.controls.moneda.setValue('EUR');
    } else {
      this.formTwo.controls.moneda.setValue('USD');
    }
    this.selectcontrato = item;
    this.authService.getFacultativoContra(item.pro_id).then((res: any)=>{
      this.listareasu = res;
      this.dataSource = this.listareasu
      console.log(res);
      
    })
  }
  miles(form: string, key: string) {
    if (form === 'formTwo') {

      let value = this.formTwo.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.desimal(this.formTwo.controls[key].value);
      }
      const val = this.desimal(value);
      this.formTwo.controls[key].setValue(val.toString());
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
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  porcentaje(key: string, form?) {
    if (!!form) {
      const value = this.formTwo.controls[key].value;
      this.formTwo.controls[key].setValue(
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
  procesar(){
    if (this.polizacontrato = []) {
      this.alertService.error('Error', 'Agrega una poliza')
    }
    else if (this.selectcontrato = []) {
      this.alertService.error('Error', 'Campo ramos es obligatorio')
    }
    // tslint:disable-next-line:one-line
    else if (this.listareasu2 = []) {
      this.alertService.error('Error', 'Campo suma limite es obligatorio')
    }

    else if (this.listareasu.length > 0 || this.listareasu2.length > 0) {
      const data1 = {
        word: this.idpoliza
      }
      this.authService.postFacultativoGasto(data1).then((res: any) => {
        this.validar = res;
          console.log(res);
          if (this.validar.length != 0) {
            this.listareasu = [];
            this.listareasu2 = [];
            this.form.reset();
          }else {
            const data = {
              poliza: this.polizacontrato,
              contrato: this.selectcontrato,
              ramopoliza: this.listareasu2,
              ramocontratos: this.listareasu
            }
            console.log(data)

          }
      }, err => {
        console.log(err);
        
      })
  }
  
  }
}
