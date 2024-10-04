import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-primas',
  templateUrl: './primas.component.html',
  styleUrls: ['./primas.component.css']
})
export class PrimasComponent implements OnInit {

  public form: FormGroup;
  public entities: any = [];
  public selectedOption: any;
  public createForm: any;
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
      description: [Menssage.empty, Validators.compose([Validators.required])],
      ramoTecnico: [Menssage.empty, Validators.compose([Validators.required])],
      subramosProduct: [Menssage.empty, Validators.compose([Validators.required])],
      poliza: [Menssage.empty, Validators.compose([Validators.required])],
      certificado: [Menssage.empty, Validators.compose([Validators.required])],
      emision: [Menssage.empty, Validators.compose([Validators.required])],
      moneda: [Menssage.empty, Validators.compose([Validators.required])],
      inicio: [Menssage.empty, Validators.compose([Validators.required])],
      fin: [Menssage.empty, Validators.compose([Validators.required])],
      sumaAsegurada: [Menssage.empty, Validators.compose([Validators.required])],
      sumaDistribuida: [Menssage.empty, Validators.compose([Validators.required])],
      prima: [Menssage.empty, Validators.compose([Validators.required])],
      primaDistribuicion: [Menssage.empty, Validators.compose([Validators.required])],
    })

  }
  clearForm(){
    Swal.fire({
      title: 'Borrar?',
      text: "Deseas borrar los datos ingresados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El formulario ha sido borrado',
          'success'
        )
        this.form.reset()
      }
    })
  }
  
  sendForm(item:any){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.form)
  }



  changePoliza(){
    const item = {
      'pol' : this.form.value.poliza
    }
    this.authService.postPrima(item).then((res: any)=>{
      console.log(res)
    })
  }
}
