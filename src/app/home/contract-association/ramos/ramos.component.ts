import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.component.html',
  styleUrls: ['./ramos.component.css']
})
export class RamosComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'abreviatura', 'ramoTecnico', 'ramoSuperintendencia','entidad', 'Accion'];
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
  getDta(){
    this.authService.getRamos().then(res => {
      console.log('esta es tu respuesta de ramos', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editar(id: any) {
    console.clear()
    console.log(id);
    if (id > 0) {
      sessionStorage.setItem('rm', id);
      this.navigate('home/asociacion/ramos/edit')
      //this.router.navigate(['/admin/ramos/edit'])
    }
  }
  navigate(item: string){
    this.router.navigate([item])
  }

}
