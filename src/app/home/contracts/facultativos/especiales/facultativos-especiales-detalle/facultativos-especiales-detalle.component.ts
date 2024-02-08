import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-facultativos-especiales-detalle',
  templateUrl: './facultativos-especiales-detalle.component.html',
  styleUrls: ['./facultativos-especiales-detalle.component.css']
})
export class FacultativosEspecialesDetalleComponent implements OnInit {
  private valorComision: string
  data: any
  public rsltncr: any;
  public currency: any;
  comisionArray = { fija: false, provisional: false, escalonada: false };
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCorredor().then(
      res => {
        this.rsltncr = res 
        console.log('corredor: ', res)
      }
    )
    this.authService.getCurrency().then(
      res => {
        this.currency = res 
        console.log('monedas: ', res)
      }
    )
  }
  onClickComision(key: string) {
    this.valorComision = key
    let data = Object.keys(this.comisionArray);
    data.forEach(element => {
      if (element == key) {
        this.comisionArray[element] = true;
      } else {
        this.comisionArray[element] = false;
      }
    });
  }
}
