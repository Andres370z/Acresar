import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'Nombre', 'RazonSocial', 'contact','Telefono', 'Accion'];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getDta()
  }
  getDta() {
    this.authService.getClients().then(
      res => {
        console.log('esta es tu respuesta de los clientes', res);
        this.data = res;
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
      }
    ); 
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(item: any){ 
    sessionStorage.setItem('cliente',JSON.stringify(item))
    console.log(item);
    const ruta = 'home/companias/clients/edit'
    this.navigate(ruta)
  }
  
  navigate(item: any){
    this.router.navigate([item])
  }
}
