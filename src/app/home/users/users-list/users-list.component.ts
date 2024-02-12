import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['nombre', 'apellidos', 'correo', 'perfil', 'pais', 'estado', 'accion'];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private localStore: LocalstoreService
  ) { }

  ngOnInit(): void {
    this.getDta();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getDta() {
    this.alert.loading()
    this.authService.getUsers().then(
      res => {
        this.alert.messagefin()
        console.log('esta es tu respuesta', res);
        this.data = res;
        this.dataSource = new MatTableDataSource(res),
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  delete(id: any) {
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
      /* this.authService.delete(id)
      .then(res => {
        console.log('Éxito al eliminar', res);
        this.getDta()
      })
      .catch(error => {
        console.error('Error al eliminar', error);
      }); */
        this.alert.error("Error", "Pagina en construcción")
      }
    });
    
    
  }

  edit(item: any){
    console.log(item);
    this.alert.error("Error", "Pagina en construcción")
  }

  addMenu(item: any){
    this.localStore.setItem(item, "usersList")
    console.log(item);
    this.router.navigate(['/home/usuarios/lista/menu-setting']);
  }
}
