import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { SessionUser } from '../../global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-list-contracts',
  templateUrl: './list-contracts.component.html',
  styleUrls: ['./list-contracts.component.css']
})
export class ListContractsComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  displayedColumns: string[] = ['o', 'c', 'r', 'e', 'mc', 'cc', 'fc', 'Accion'];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>
  public dataCsv: any[] = [];
  public dataCsvNom: any[] = [];
  public dataCsvNomAso: any[] = [];
  public records = [];
  public headers = [];
  public header = false;
  public user: any;
  public idagregar: number = 0;
  public currency:any = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private ngxCsvParser: NgxCsvParser,
    private excel: ExcelService
  ) {
        this.user = new SessionUser(this.router);
        this.user.getAuthUser();
        console.log("user",this.user.authUser)
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    localStorage.removeItem('rsltntmpcntrt');
    this.getDta()
  }


  getDta() {
    this.alert.loading();
    this.authService.getDtaContracts().then(
      res => {
        this.alert.messagefin();
        console.log('esta es tu respuesta', res);
        this.data = res
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.authService.typeContract().then(res => {
      this.alert.messagefin();
      this.currency = res
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(item: any) {
    sessionStorage.setItem('cp', JSON.stringify(item))
    console.log(item);
    switch (parseInt(item.a2)) {
      case 3:
        this.router.navigate(['/home/contracts/cuota-aparte-edit']);
        console.log('ok good 3')
        break;
      case 10:
        this.router.navigate(['/home/contracts/Facultativos/edit']);
        console.log('ok good 10')
        break;
      case 13:
        // this.router.navigate(['']);
        console.log('ok good 13')
        break;
      default:
        console.log('error en la ruta');

        break;
    }

  }
  //Metodo para borrar
  deletes(id: any) {
    Swal.fire({
      title: "Deseas eliminar este registro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.delete(id)
          .then(res => {

            // Elimina el registro por ID
            this.data = this.data.filter(item => item.id !== id);
            // Actualiza el dataSource sin crear uno nuevo
            this.dataSource.data = this.data;
            // Renderiza la tabla nuevamente
            this.table.renderRows();
            this.ngOnInit()
            console.log('Éxito al eliminar', res);
  
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error al eliminar', error);
          });
      }
    });
  }

  renew(item: any){
    console.log("renew",item);
    this.alert.loading();
    this.authService.getContractRenew(item.a).then(
      res => {
        if (res.error) {
          this.alert.error(
            "Renovación no exitosa",
            res.error + ' ' + res.codigo + ' para este contrato ' + res.modifyCode
          );
          console.log('esta es tu respuesta', res);
        } else {
          this.alert.success(
            "Renovación exitosa",
            "EL contrato se renovo exitosamente " + res.codigo
          );
          console.log('esta es tu respuesta', res);
          this.getDta();
        }
       
      }
    );
  }
  fileData(item: any, num: number){
    let files = item.target.files[0];
    this.ngxCsvParser
      .parse(files, { header: this.header, delimiter: ";" })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          this.headers = result[0];
          this.records = result.slice(1);
          const headers = result[0];
          for (let i = 1; i < this.records.length; i++) {        
              if (!this.records[i])
                  continue
              const obj = {}
              const currentline = this.records[i]
              for (let j = 0; j < this.headers.length; j++) {
                  if (headers[j] != "") {
                    obj[headers[j]] = currentline[j]
                  }
              }
              if (num == 1) {
                this.dataCsv.push(obj)
              } else if (num == 2){
                this.dataCsvNom.push(obj)
              }else if (num == 3){
                this.dataCsvNomAso.push(obj)
              }
              
          }
          
          console.log("success", this.dataCsv); 
          console.log("header", this.headers)
          
        },
        (error: NgxCSVParserError) => {
          console.log("Error", error);
        }
      );
  }
  submit(){
    if (this.valid(1)) {
      const item =  {
        type: this.idagregar,
        idusers: this.user.authUser.id,
        file:this.dataCsv
      } 
      this.alert.loading();
      this.authService.postContratoCuotaAparteMasivo(item).then(
        res => {
          this.alert.messagefin();
          console.log(res);
          this.idagregar = 0;
          this.dataCsv = [];
        },
        err => {
          this.alert.messagefin();
          console.log(err);
        });
    } 
  }
  submitNominaMasivo(){
    if (this.valid(2)) {
      const item =  {
        type: this.idagregar,
        idusers: this.user.authUser.id,
        file:this.dataCsvNom
      } 
      this.alert.loading();
      this.authService.postNominaMasivo(item).then(
        res => {
          this.alert.messagefin();
          console.log(res);
          this.idagregar = 0;
          this.dataCsvNom = [];
        },
        err => {
          this.alert.messagefin();
          console.log(err);
        });
    } 
  }
  massiveContractAssociation(){
    if (this.valid(3)) {
      const item =  {
        type: this.idagregar,
        idusers: this.user.authUser.id,
        file:this.dataCsvNomAso
      } 
      this.alert.loading();
      this.authService.massiveContractAssociation(item).then(
        res => {
          this.alert.messagefin();
          console.log(res);
          this.idagregar = 0;
          this.dataCsvNomAso = [];
        },
        err => {
          this.alert.messagefin();
          console.log(err);
        });
    }
  }
  valid(item: number): boolean{
    let valid = true
    console.log("masivo",this.dataCsv)
    
    switch (item) {
      case 1:
        if (this.dataCsv.length == 0) {
          this.alert.info("Uff","Debes subir un archivo .csv");
          valid = false
        }
        else if (this.idagregar == 0){
          this.alert.info("Uff","Debes selecionar un tipo de contrato");
          valid =false
        }
        break;

      case 2:
        if (this.dataCsvNom.length == 0) {
          this.alert.info("Uff","Debes subir un archivo .csv");
          valid = false
        }else if (this.idagregar == 0){
          this.alert.info("Uff","Debes selecionar un tipo de contrato");
          valid =false
        }
        break;
      case 3:
          if (this.dataCsvNomAso.length == 0) {
            this.alert.info("Uff","Debes subir un archivo .csv");
            valid = false
          }else if (this.idagregar == 0){
            this.alert.info("Uff","Debes selecionar un tipo de contrato");
            valid =false
          }
          break;
    
      default:
        break;
    }
    

    return valid
  }
  download(){
    if (this.data.length != 0) {
          this.excel.exportAsExcelFile(this.data, Menssage.nameEvents);
        }else{
          this.alert.error(Menssage.error, Menssage.nameEventsNull);
    }
  }
}
