import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  public excelType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  constructor(
    private alert: AlertService,
  ) { }
  public exportAsExcelFile(item: any, name: string): void {
    console.log(item);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(item);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, name);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.excelType
    });
    this.alert.messagefin();
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}
