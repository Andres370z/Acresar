import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-insurance-carrier',
  templateUrl: './insurance-carrier.component.html',
  styleUrls: ['./insurance-carrier.component.css']
})
export class InsuranceCarrierComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'Nombre', 'RazonSocial', 'Entidad', 'Contacto', 'Telefono', 'Acción',];
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
    this.authService.getAseguradoras().then((res: any) => {
      console.log('esta es tu respuesta aseguradoras ', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;


    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  navigate(item: any){
    this.router.navigate([item])
  }
  edit(item: any){ 
    sessionStorage.setItem('companiaA',JSON.stringify(item))
    console.log(item);
    const ruta = 'home/companias/insurance-carrier/edit'
    this.navigate(ruta)
  }
}
