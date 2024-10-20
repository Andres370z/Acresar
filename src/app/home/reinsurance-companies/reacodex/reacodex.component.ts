import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { FileUploadService } from './../../../service/file-upload.service';

@Component({
  selector: 'app-reacodex',
  templateUrl: './reacodex.component.html',
  styleUrls: ['./reacodex.component.css']
})
export class ReacodexComponent implements OnInit {
  uploadedFiles: File[] = [];
  isDisabled = false;
  public animation: boolean = false; 
  public multiple: boolean = false;

  modulo: string = "Actualización Reacoex";
  f: FormGroup;
  fileToUpload: File = null;
  filename: string;
  ext: string;
  readyToSend: boolean = false;
  reacodexResaguradores: any;
  tableActiveRq = false;
  msjTableErr = false;
  msg: any;
  public inputFileModel: Array<any> = new Array<any>();
  public inputFileMinimalModel: Array<any> = new Array<any>();
  FileStore: any = {};;
  reaseguradoresList: any;
  corredoresList: any; 

  public file: File
  public form: FormGroup
  displayedColumns: string[] = ['corredores', 'pais', 'actualizacion', 'fecha'];
  data: any[] = [];
  dataEdit: any;
  public eventList: any[] = []
  public dataSource: MatTableDataSource<any>
  public dataSources: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private myFormBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _http: HttpClient,
    private formBuilder: FormBuilder,
    private _upload: FileUploadService,
    private _service: AuthService,
    private aler: AlertService,

  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial() {
    this.f = this.myFormBuilder.group({
      // file: [Menssage.empty, Validators.compose([Validators.required])],
      date: [Menssage.empty, Validators.compose([Validators.required])],
    })
    this.getDta()
  }
  
  
  getDta() {
    this.authService.getReacoex().then((res: any) => {
      this.corredoresList = res;
      console.log('esta es tu respuesta Reacoex', res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })

    this._service.getReaco().then(
      res => {
        this.reacodexResaguradores = res;
        this.dataSources = this.reacodexResaguradores;
      },
      err => {
        console.log(err);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // seletecFile(inform: any){
  //   this.file = inform.target.files[0];
  //   if(inform){

  //   }

  // }


  public onAccept() {
    this.FileStore = this.uploadedFiles;
    console.log(this.uploadedFiles)
    this.tableActiveRq = false;
    this.msjTableErr = false;
    console.log('-----> ', this.FileStore);
  }

  public onRemove(file: any): void {
    this.FileStore = '';
  }

  SendFile() {
    const file = this.FileStore[0]; 
    this.aler.loading();
    const fb: FormData = new FormData();
    console.log(this.FileStore);
    fb.append('fileName', file, file.name);

    this._upload.uploadFile(fb).subscribe(data => {
      this.aler.loading();
    }, error => {
      this.aler.error('Error', error)
      console.log(error);
    });

  }


  procesarArchivos() {
    console.log('Archivos cargados:', this.uploadedFiles);

    // Iteramos sobre los archivos y los mostramos en la consola
    for (const file of this.uploadedFiles) {
      console.log('Nombre del archivo:', file.name);
      console.log('Tamaño del archivo:', file.size);
      console.log('Tipo de archivo:', file.type);
      // Puedes agregar más propiedades a mostrar según tus necesidades
    }
  }

}