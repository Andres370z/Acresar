import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

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
  
  

}
