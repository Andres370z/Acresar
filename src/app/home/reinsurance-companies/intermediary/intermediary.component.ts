import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-intermediary',
  templateUrl: './intermediary.component.html',
  styleUrls: ['./intermediary.component.css']
})
export class IntermediaryComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'Nombre', 'RazonSocial', 'Contacto', 'Telefono', 'Acción',];
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
    this.authService.getIntermediarios().then((res: any) => {
      console.log('esta es tu respuesta intermediarios ', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  edit(item: any){ 
    sessionStorage.setItem('companiaI',JSON.stringify(item))
    console.log(item);
    const ruta = 'home/companias/intermediary/edit'
    this.navigate(ruta)
  }
  navigate(item: any){
    this.router.navigate([item])
  }

}
