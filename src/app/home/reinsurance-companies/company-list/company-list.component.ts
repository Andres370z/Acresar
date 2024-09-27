import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})

export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'Reasegurador', 'Calificación', 'Angencia', 'Acción'];
  data: any[] = [];
  dataEdit: any;
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
    this.authService.getData().then(
      res => {
        console.log('esta es tu respuesta', res);
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
  updateRecors(item: any) {
    if (item != "") {
      this.dataEdit = item;
      this.router.navigate(['/home/companias/reinsurer/register-reinsurer'])
    }
  }
  navigate(item: string) {
    this.router.navigate([item])
  }
  edit(item: any) {
    if (item) {
      sessionStorage.setItem('companiaR', JSON.stringify(item))
      this.router.navigate(['/home/companias/company-edit']);
    }
  }
}
