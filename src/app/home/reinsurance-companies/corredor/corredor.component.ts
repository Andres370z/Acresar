import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-corredor',
  templateUrl: './corredor.component.html',
  styleUrls: ['./corredor.component.css']
})
export class CorredorComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'Nombre', 'RazonSocial', 'Contacto', 'Telefono','Acción', ];
  data: any[] = [];
  public eventList: any[] = []
  public dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getDta()
  }
  getDta() {
    this.authService.getCorredor().then((res: any) => {
      console.log('esta es tu respuesta ', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
