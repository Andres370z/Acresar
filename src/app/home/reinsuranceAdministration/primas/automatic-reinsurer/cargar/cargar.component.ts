import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.css']
})
export class CargarComponent implements OnInit {
  uploadedFiles: File[] = [];
  isDisabled = false;
  public animation: boolean = false;
  public multiple: boolean = false;

  tableActiveRq = false;
  msjTableErr = false;
  load = false;
  msg: any;
  modulo = "Carga reasegurador"
  historicos: any;
  public inputFileModel: Array<any> = new Array<any>();
  public inputFileMinimalModel: Array<any> = new Array<any>();
  FileStore: any = {};
  f: FormGroup;
  fileToUpload: File = null;
  filename: string;
  ext: string;
  readyToSend: boolean = false;
  reacodexResaguradores: any;
  compania: any;
  verData: any;
  verT = false;
  selects: any = { 'type': '', 'company': '' };
  cargars: any = [
    {
      a: 1,
      c: "Todo"
    },
    {
      a: 2,
      c: "Ramos"
    },
    {
      a: 3,
      c: "Productos"
    }
  ];

  constructor(
    private http: AuthService,
    private _upload: FileUploadService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
    this.loadService();

    this.f = this.formBuilder.group({
      inputFile: [null, [Validators.required]],
      typeFileInput: [null, [Validators.required]]
    });

    this.http.postUploadlist({ 'type': 4 }).then(
      res => {
        this.historicos = Object.keys(res).map(function (k) { return res[k] });
      },
      err => {
        console.log(err);
      }
    );
  }
  
  private handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    this.filename = this.f.controls["inputFile"].value.split(".");
    this.ext = this.filename[this.filename.length - 1].toLowerCase();
    if (this.ext == "xls" || this.ext == "xlsx") {
      this.f.controls["typeFileInput"].setValue(this.ext);
      this.readyToSend = true;
    } else {
      alert("Solo se permiten archivos de excel (xls, xlsx).");
      this.f.reset();
      this.readyToSend = false;
    }
  }

  loadService() {
    this.http.getEntities().then(res => {
      this.compania = res;
    });
    console.log(this.compania, this.cargars);
  }

  public onAccept(): void {
    this.FileStore = this.uploadedFiles;
    console.log(this.uploadedFiles)
    this.tableActiveRq = false;
    this.msjTableErr = false;
    console.log('-----> ', this.FileStore);
    

  }
  onFileSelecst(event: any) {
    console.log('--');
    
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      // Aquí puedes agregar la lógica para subir el archivo si es necesario
    }
  }

  public onRemove(file: any): void {
    this.FileStore = "";
  }

  SendFile() {
    const file = this.FileStore[0]; // Asegúrate de que FileStore[0] contiene el archivo correcto
    this.tableActiveRq = false;
    this.msjTableErr = false;
    const fb: FormData = new FormData();
  
    // Verifica si file tiene las propiedades esperadas
    if (file instanceof File) {
      fb.append("fileName", file, file.name);
    } else if (file.file && file.name) {
      fb.append("fileName", file.file, file.name);
    } else {
      console.error("El archivo no tiene la estructura esperada.");
      return;
    }
  
    fb.append("modelu", "primaCarga");
    fb.append('type', this.selects.type);
    fb.append('comp', this.selects.company);
    
    this.load = true;
    this._upload.uploadFilePrimas(fb).subscribe(
      data => {
        this.load = false;
        if (data.status === 1) {
          this.tableActiveRq = true;
          this.msjTableErr = false;
          this.msg = data;
  
          this.http.postUploadlist({ 'type': 4 }).then(
            res => {
              this.historicos = Object.keys(res).map(k => res[k]);
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this.handleError(data.error);
        }
      },
      error => {
        this.load = false;
        console.log(error);
      }
    );
  }
  
  handleError(error) {
    this.tableActiveRq = false;
    this.msjTableErr = true;
    this.msg['error'] = Object.keys(error).map(k => error[k]);
  
    let items = [];
    for (let i of this.msg['error']) {
      const itemN = Object.keys(i).map(k => i[k]);
      let itemA = [];
  
      itemN.forEach(e => {
        let arr = Object.keys(e).map(k => e[k]);
        if (arr[0].length > 1) {
          itemA.push(Object.keys(e).map(k => e[k]));
        }
      });
  
      itemN[1] = itemA;
      items.push(itemN);
    }
  
    this.msg['error'] = items;
    console.log(this.msg['error']);
  }
  

  ver(id: any) {
    this.http.postPrimaCarga({ idcg: id }).then(res => {
      this.verData = Object.keys(res).map(function (k) { return res[k] });
      this.verT = true;
      ;
    }, err => {
      console.log('error', err);
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
    }
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
