import { Injectable } from '@angular/core';
import * as Excel from "exceljs";
import * as fs from 'file-saver';
import * as logoFile from './carlogo.js';
import * as firmaFile from './firma.js';
import * as selloFile from './sello.js';

@Injectable({
  providedIn: 'root'
})
export class ExcelNewService {

  constructor() {

  }

  public  generateExcel( json: any) {
    // const ExcelJS = await import('exceljs');
    // console.log(ExcelJS);
    // const Workbook: any = {};
  // Excel Title, Header, Data
    const title = 'ESTADO CUENTA TECNICA';
    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Resolution automaticos');
    var tipo='';
    var garantia='';
    if (json.cu == 1) {
      tipo='Mensual'
      garantia = '30 días'
    }else if (json.cu == 2) {
      tipo='Trimestral'
      garantia = '90 días'
    }else if (json.cu == 3) {
      tipo='Semanal'
      garantia = '7 días'
    }else if (json.cu == 4) {
      tipo='Anual'
      garantia = '365 días'
    }

// Add Row and formatting
    const titleRow = worksheet.addRow(['',title]);
    titleRow.font = {name: 'Century Gothic', family: 4, size: 16, bold: true };
    worksheet.addRow([]);
    const subti =worksheet.addRow(['','Atlantic Latam Corredores de Reaseguros S.A.']);
    subti.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    const subti1 =worksheet.addRow(['','Calle 76 No. 10 - 28']);
    subti1.font = {name: 'Century Gothic', family: 4, size: 10, bold: false };
    const subti2 =worksheet.addRow(['','T. +57 1 746 3701']);
    subti2.font = {name: 'Century Gothic', family: 4, size: 10, bold: false };
    const subti3 =worksheet.addRow(['','Bogotá, Colombia']);
    subti3.font = {name: 'Century Gothic', family: 4, size: 10, bold: false };
    worksheet.getCell('B1').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('B3').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('B4').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('B5').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('B6').alignment = { vertical: 'top', horizontal: 'right' };


// Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });
    const firmanal = workbook.addImage({
      base64: firmaFile.firmaBase64,
      extension: 'png',
    });
    const sello = workbook.addImage({
      base64: selloFile.selloBase64,
      extension: 'png',
    });

    worksheet.addImage(logo, 'A1:A3');
    worksheet.mergeCells('B1:F2');
    worksheet.mergeCells('B3:F3');
    worksheet.mergeCells('B4:F4');
    worksheet.mergeCells('B5:F5');
    worksheet.mergeCells('B6:F6');


// Blank Row
    worksheet.addRow([]);
    const compa = worksheet.addRow(['COMPAÑÍA CEDENTE:','', json.aseg, 'PARTICIPACIÓN:',this.formateaValor(json.c2)+' parte del 100%']);
    compa.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    worksheet.getCell('E8').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    worksheet.getCell('C8').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    const rea = worksheet.addRow(['REASEGURADOR:','',json.rea]);
    rea.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    const contr = worksheet.addRow(['CONTRATOS AUTOMATICOS:','',json.cnt,'']);
    worksheet.getCell('C9').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    contr.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    const descrip = worksheet.addRow(['DESCRIPCIÓN:','',json.cnt,'MONEDA',json.mon+'$']);
    descrip.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    const debit = worksheet.addRow(['DEBIT NOTE:','','INICIO',json.mon+'$']);
    debit.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    const peri = worksheet.addRow(['PERIODO:','',tipo,'FIN',json.mon+'$']);
    peri.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    worksheet.getCell('C10').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    worksheet.getCell('C12').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    worksheet.getCell('E12').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    const pago = worksheet.addRow(['GARANTIA DE PAGO:','',garantia,'VENCE',json.dtcf]);
    pago.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    worksheet.getCell('C13').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    worksheet.getCell('E13').font = {name: 'Century Gothic', family: 4, size: 9, bold: false };
    worksheet.getCell('C12').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C13').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.mergeCells('A8:B8');
    worksheet.mergeCells('A9:B9');
    worksheet.mergeCells('D8:D8');
    worksheet.mergeCells('E8:F8');
    worksheet.mergeCells('A10:B10');
    worksheet.mergeCells('A11:B11');
    worksheet.mergeCells('A12:B12');
    worksheet.mergeCells('A13:B13');
    worksheet.mergeCells('E12:F12');
    worksheet.mergeCells('E13:F13');
    worksheet.getCell('D8').alignment = { vertical: 'top', horizontal: 'center' };
    //worksheet.getCell('C3').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D12').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D13').alignment = { vertical: 'top', horizontal: 'right' };
    //worksheet.getCell('A').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('A8').border = { left: { style: 'medium' },top: { style: 'medium' }};
    //worksheet.getCell('B8').border = { top: { style: 'medium' }};
    worksheet.getCell('C8').border = { top: { style: 'medium' }};
    //worksheet.getCell('B8').border = { top: { style: 'medium' }};
    worksheet.getCell('D8').border = { top: { style: 'medium' }};
    worksheet.getCell('E8').border = { top: { style: 'medium' }};
    worksheet.getCell('F8').border = { top: { style: 'medium' }, right:{ style: 'medium' }};
    worksheet.getCell('A9').border = { left: { style: 'medium' } };
    worksheet.getCell('F9').border = { right:{ style: 'medium' }};
    worksheet.getCell('A10').border = { left: { style: 'medium' } };
    worksheet.getCell('F10').border = { right:{ style: 'medium' }};
    worksheet.getCell('A11').border = { left: { style: 'medium' } };
    worksheet.getCell('F11').border = { right:{ style: 'medium' }};
    worksheet.getCell('A12').border = { left: { style: 'medium' } };
    worksheet.getCell('F12').border = { right:{ style: 'medium' }};
    worksheet.getCell('A13').border = { left: { style: 'medium' }, bottom: { style: 'medium' } };
  //worksheet.getCell('B13').border = { bottom: { style: 'medium' }};
    worksheet.getCell('C13').border = { bottom: { style: 'medium' }};
    //worksheet.getCell('B13').border = { bottom: { style: 'medium' }};
    worksheet.getCell('D13').border = { bottom: { style: 'medium' }};
    worksheet.getCell('E13').border = { bottom: { style: 'medium' }};
    worksheet.getCell('F13').border = { bottom: { style: 'medium' }, right:{ style: 'medium' }};
    worksheet.addRow([]);
    const headerfinal = worksheet.addRow(['CONCEPTO:','','Ramo','TOTAL']);
    headerfinal.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    const headerfinal1 = worksheet.addRow(['','','Serie','']);
    headerfinal1.font = {name: 'Century Gothic', family: 4, size: 12, bold: true };
    worksheet.mergeCells('A15:B16');
    worksheet.mergeCells('D15:F16');
    worksheet.getCell('C16').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C15').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('A15').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('D15').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('A15').border = { top: { style: 'medium' }, left: { style: 'medium' },right: { style: 'thin' }, bottom: { style: 'medium' }};
    //worksheet.getCell('A16').border = { left: { style: 'medium' }, bottom: { style: 'medium' }};
    worksheet.getCell('C15').border = { top: { style: 'medium' }};
    worksheet.getCell('C16').border = { bottom: { style: 'medium' },top: { style: 'thin' }};
    worksheet.getCell('D15').border = { top: { style: 'medium' }, left: { style: 'thin' },right: { style: 'medium' }, bottom: { style: 'medium' }};
    //worksheet.getCell('B15').border = { right: { style: 'medium' }};
    //worksheet.getCell('B16').border = { right: { style: 'medium' }};
    worksheet.getCell('A15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    //worksheet.getCell('B15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('C15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('C16').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('D15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    const Data = worksheet.addRow(['INGRESOS:','','','']);
    Data.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    const Data1 = worksheet.addRow(['PRIMA CEDIDA:','',json.fi,this.desimal(this.cortarDesimales(json.s2))]);
    Data1.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data2 = worksheet.addRow(['ENTRADA CARTERA PRIMA:','',json.fi,this.desimal(this.cortarDesimales(json.entrav))]);
    Data2.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data3 = worksheet.addRow(['ENTRADA CARTERA SINIESTROS:','',json.fi,this.desimal(this.cortarDesimales(json.entravs))]);
    Data3.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data4 = worksheet.addRow(['DEPOSITOS LIBERADOS:','',json.fi,this.desimal(this.cortarDesimales(json.l))]);
    Data4.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data5 = worksheet.addRow(['INTERESES SOBRE DEPOSITOS LIBERADOS:','',json.fi,this.desimal(this.cortarDesimales(json.o2))]);
    Data5.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data6 = worksheet.addRow(['DEPOSITOS LIBERADOS PRIMAS:','',json.fi,this.desimal(this.cortarDesimales(json.l))]);
    Data6.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data7 = worksheet.addRow(['INTERESES SOBRE DEPOSITOS LIBERADOS PRIMAS:','',json.fi,this.desimal(this.cortarDesimales(json.c3))]);
    Data7.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data8 = worksheet.addRow(['SINIESTROS DE CONTADO:','',json.fi,this.desimal(this.cortarDesimales(json.entravs))]);
    Data8.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data9 = worksheet.addRow(['SALVAMENTOS Y RECOBROS:','',json.fi,this.desimal(this.cortarDesimales(json.salv))]);
    Data9.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data10 = worksheet.addRow(['TOTAL INGRESOS:','',json.fi,this.desimal(this.cortarDesimales(json.r3))]);
    Data10.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    worksheet.getCell('A27').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    //worksheet.getCell('B15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('C27').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('D27').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.mergeCells('A17:B17');
    worksheet.mergeCells('D17:F17');
    worksheet.mergeCells('A18:B18');
    worksheet.mergeCells('D18:F18');
    worksheet.mergeCells('A19:B19');
    worksheet.mergeCells('D19:F19');
    worksheet.mergeCells('A20:B20');
    worksheet.mergeCells('D20:F20');
    worksheet.mergeCells('A21:B21');
    worksheet.mergeCells('D21:F21');
    worksheet.mergeCells('A22:B22');
    worksheet.mergeCells('D22:F22');
    worksheet.mergeCells('A23:B23');
    worksheet.mergeCells('D23:F23');
    worksheet.mergeCells('A24:B24');
    worksheet.mergeCells('D24:F24');
    worksheet.mergeCells('A25:B25');
    worksheet.mergeCells('D25:F25');
    worksheet.mergeCells('A26:B26');
    worksheet.mergeCells('D26:F26');
    worksheet.mergeCells('A27:B27');
    worksheet.mergeCells('D27:F27');
    worksheet.getCell('A17').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C17').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D17').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A18').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C18').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D18').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A19').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C19').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D19').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A20').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C20').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D20').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A21').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C21').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D21').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A22').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C22').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D22').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A23').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C23').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D23').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A24').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C24').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D24').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A25').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C25').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D25').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A26').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C26').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D26').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A27').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C27').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D27').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('D17').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D18').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D19').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D20').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D21').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D22').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D23').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D24').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D25').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D26').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D27').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('C17').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C18').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C19').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C20').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C21').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C22').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C23').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C24').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C25').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C26').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C27').alignment = { vertical: 'top', horizontal: 'center' };
    const Data11 = worksheet.addRow(['EGRSOS:','','','']);
    Data11.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    const Data12 = worksheet.addRow(['RETIRADA CARTERA PRIMAS:','',json.fi,this.desimal(this.cortarDesimales(json.saliv))]);
    Data12.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data14 = worksheet.addRow(['RETIRADA CARTERA SINIESTROS:','',json.fi,this.desimal(this.cortarDesimales(json.salivs))]);
    Data14.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data15 = worksheet.addRow(['COMISION DE REASEGURO:','',json.fi,this.desimal(this.cortarDesimales(json.s5))]);
    Data15.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data151 = worksheet.addRow(['AJUSTE COMISION:','',json.fi,this.desimal(this.cortarDesimales(json.cmsnv))]);
    Data151.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data16 = worksheet.addRow(['DEPOSITOS CONSTITUIDOS DE PRIMAS:','',json.fi,this.desimal(this.cortarDesimales(json.a4))]);
    Data16.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data17 = worksheet.addRow(['SINIESTROS:','',json.fi,this.desimal(this.cortarDesimales(json.s3))]);
    Data17.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data18 = worksheet.addRow(['GASTOS REASEGURADOR:','',json.fi,this.desimal(this.cortarDesimales(json.gastv))]);
    Data18.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data181 = worksheet.addRow(['COMISION DE UTILIDADES:','',json.fi,this.desimal(this.cortarDesimales(json.ctldv))]);
    Data181.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data182 = worksheet.addRow(['SOBRECOMISION:','',json.fi,this.desimal(this.cortarDesimales(json.sbcnv))]);
    Data182.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data19 = worksheet.addRow(['IMPUESTO DE RENTA 1%:','',json.fi,this.desimal(this.cortarDesimales(json.e3))]);
    Data19.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data183 = worksheet.addRow(['IMPUESTO DE RETEFUENTE INTERESES DEPOSITOS:','',json.fi,this.desimal(this.cortarDesimales(json.ntrscv))]);
    Data183.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data184 = worksheet.addRow(['CORRETAJE:','',json.fi,this.desimal(this.cortarDesimales(json.crrtv))]);
    Data184.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data21 = worksheet.addRow(['TOTAL EGRESOS:','',json.fi,this.desimal(this.cortarDesimales(json.r5))]);
    Data21.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    worksheet.getCell('A36').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    //worksheet.getCell('B15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('C36').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('D36').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.mergeCells('A28:B28');
    worksheet.mergeCells('D28:F28');
    worksheet.mergeCells('A29:B29');
    worksheet.mergeCells('D29:F29');
    worksheet.mergeCells('A30:B30');
    worksheet.mergeCells('D30:F30');
    worksheet.mergeCells('A31:B31');
    worksheet.mergeCells('D31:F31');
    worksheet.mergeCells('A32:B32');
    worksheet.mergeCells('D32:F32');
    worksheet.mergeCells('A33:B33');
    worksheet.mergeCells('D33:F33');
    worksheet.mergeCells('A34:B34');
    worksheet.mergeCells('D34:F34');
    worksheet.mergeCells('A35:B35');
    worksheet.mergeCells('D35:F35');
    worksheet.mergeCells('A36:B36');
    worksheet.mergeCells('D36:F36');
    worksheet.getCell('A28').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C28').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D28').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A29').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C29').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D29').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A30').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C30').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D30').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A31').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C31').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D31').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A32').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C32').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D32').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A33').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C33').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D33').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A34').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C34').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D34').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A35').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C35').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D35').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A36').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C36').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D36').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('D28').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D29').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D30').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D31').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D32').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D33').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D34').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D35').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D36').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('C28').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C29').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C30').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C31').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C32').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C33').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C34').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C35').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C36').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.addRow([]);
    const Data23 = worksheet.addRow(['SALDO DEL TRIMESTRE:','',json.fi,this.desimal(this.cortarDesimales(json.c4))]);
    Data23.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data24 = worksheet.addRow(['SALDO ANTERIOR:','',json.fi,this.desimal(this.cortarDesimales(json.o3))]);
    Data24.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data25 = worksheet.addRow(['GIROS:','',json.fi,'']);
    Data25.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data26 = worksheet.addRow(['SINIESTROS AL CONTADO:','','']);
    Data26.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data27 = worksheet.addRow(['SALDO ACUMULADO:','',json.fi,this.desimal(this.cortarDesimales(json.n2))]);
    Data27.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    worksheet.getCell('A42').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    //worksheet.getCell('B15').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('C42').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.getCell('D42').fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: 'f98222' }};
    worksheet.mergeCells('A38:B38');
    worksheet.mergeCells('D38:F38');
    worksheet.mergeCells('A39:B39');
    worksheet.mergeCells('D39:F39');
    worksheet.mergeCells('A40:B40');
    worksheet.mergeCells('D40:F40');
    worksheet.mergeCells('A41:B41');
    worksheet.mergeCells('D41:F41');
    worksheet.mergeCells('A42:B42');
    worksheet.mergeCells('D42:F42');
    worksheet.getCell('A38').border = { top: { style: 'medium' },left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C38').border = { top: { style: 'medium' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D38').border = { top: { style: 'medium' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A39').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C39').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D39').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A40').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C40').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D40').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A41').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C41').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D41').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A42').border = { left: { style: 'medium' }, bottom: { style: 'medium' }, right: { style: 'thin' } };
    worksheet.getCell('C42').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'medium' }, right: { style: 'thin' } };
    worksheet.getCell('D42').border = { left: { style: 'thin' }, bottom: { style: 'medium' }, right: { style: 'medium' } };
    worksheet.addRow([]);
    worksheet.getCell('D38').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D39').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D40').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D41').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D42').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('C38').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C39').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C40').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C41').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C42').alignment = { vertical: 'top', horizontal: 'center' };
    const Data28 = worksheet.addRow(['SALDO DEPOSITO ANTERIOR:','','','']);
    Data28.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data29 = worksheet.addRow(['SALDO DEPOSITO ACTUAL:','','','']);
    Data29.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    const Data30 = worksheet.addRow(['SINIESTROS PENDIENTES:','','','']);
    Data30.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    worksheet.mergeCells('A44:B44');
    worksheet.mergeCells('D44:F44');
    worksheet.mergeCells('A45:B45');
    worksheet.mergeCells('D45:F45');
    worksheet.mergeCells('A46:B46');
    worksheet.mergeCells('D46:F46');
    worksheet.getCell('A44').border = { top: { style: 'medium' },left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C44').border = { top: { style: 'medium' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D44').border = { top: { style: 'medium' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A45').border = { left: { style: 'medium' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('C45').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    worksheet.getCell('D45').border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'medium' } };
    worksheet.getCell('A46').border = { left: { style: 'medium' }, bottom: { style: 'medium' }, right: { style: 'thin' } };
    worksheet.getCell('C46').border = { top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'medium' }, right: { style: 'thin' } };
    worksheet.getCell('D46').border = { left: { style: 'thin' }, bottom: { style: 'medium' }, right: { style: 'medium' } };
    worksheet.getCell('D44').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D45').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('D46').alignment = { vertical: 'top', horizontal: 'right' };
    worksheet.getCell('C44').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C45').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getCell('C46').alignment = { vertical: 'top', horizontal: 'center' };
    const Data32 = worksheet.addRow(['Cuenta tecnica:','2Q CTO 2019-2020','','']);
    Data32.font = {name: 'Century Gothic', family: 4, size: 9, bold: false, };
    worksheet.addImage(sello, 'A59:A64');
    worksheet.addImage(firmanal, 'b59:b64');
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    const Data33 = worksheet.addRow(['ATLANTIC WHOLESALE BROKERS','','','']);
    Data33.font = {name: 'Century Gothic', family: 4, size: 12, bold: true, };
    worksheet.getCell('A66').border = { top: { style: 'medium' }};
    worksheet.mergeCells('A66:B66');
    worksheet.getCell('A66').alignment = { vertical: 'top', horizontal: 'center' };
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 20;
    worksheet.addRow([]);


// Footer Row
/*     const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
}; */
 /*    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
 */
// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'Resolutionautomaticos.xlsx');
});

  }
desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
desimalPor(key: any) {
  let e = key
  return e + '%';
}
formateaValor(valor) {
  // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
  return isNaN(valor) ? valor : parseFloat(valor).toFixed(2)+ '%';
}
cortarDesimales(item: any) {
  return Math.trunc(item);
}
}
