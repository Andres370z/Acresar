import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

interface years {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-prorroga',
  templateUrl: './prorroga.component.html',
  styleUrls: ['./prorroga.component.css']
})
export class ProrrogaComponent implements OnInit {
  public form: FormGroup;
  public formTwo: FormGroup;
  public entities: any = [];
  public selectedOption: any;
  public createForm: any; 
  public options: any[] = [];
  public lisRequest: any;
  idRamo: any
  myMoney: any;
  public ramoscomision: any;
  reasegurador: any;
  listareasu: any;
  constructor(
    private myFormBuilder: FormBuilder,
    private myFormBuilderTwo: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  public dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    this.initial();
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  bucaPoliza(){
    console.log('1 exist')
    if (this.form.controls.poliza1.value < 3) {
      const item = {
        word: this.form.controls.poliza1.value
      };
      console.log('este es el id que esperas', item);
      this.authService.postBuscarSiniestro(item).then(
        res => {
          console.log('esta es la respuesta post', res);
          this.options = res
        }, err => {
          console.log('pailas', err);
        }
      );
    } else {
      this.lisRequest = false;
    }
  }
  upload(item: any) {
    console.log( 'Este es el ITEM',item);
    this.formTwo.controls.descripcion.setValue(item.descrip)
    this.formTwo.controls.inicio.setValue(item.inicio)
    this.form.controls.date.setValue(item.fechaemision)
    this.form.controls.ciudad.setValue(item.ciudad)
    this.form.controls.poliza1.setValue(item.codigopol)
    this.formTwo.controls.fin.setValue(item.final)
    this.form.controls.asegurado.setValue(item.asegurado)
    this.form.controls.certificado.setValue(item.certificado)
    this.form.controls.nit.setValue(item.nitasegurado)
    this.formTwo.controls.identyContract.setValue(item.idcontratoo)
    this.myMoney = item;
    if (item.moneda === '3') {
      this.formTwo.controls.moneda.setValue('COP')
    } else if (item.m === '2') {
      this.formTwo.controls.moneda.setValue('EUR')
    } else {
      this.formTwo.controls.moneda.setValue('USD')
    }
    
  }
  loadRamos(id: any) {
    if (id) {
      this.authService.getLoadRamos(id).then(
        res => {
          this.ramoscomision = res
          console.log('estos son los ramos', res);
          console.log('este es el id del ramo ', this.idRamo)
        },
        err => {
          console.log(err);
        } 
      )
    }
  }

  navigate(item: string){
    this.router.navigate([item])
  }
}
