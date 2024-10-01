import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Menssage, idRol } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  /**GRAFICAS */
  view: any[] = [900, 500];
  multi: any[]

  // options
  legend: boolean = true;
   showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Population';
  img = environment.img;
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number = 70;
  yScaleMax: number = 85;
  xScaleMin: number = 80;
  xScaleMax: number = 70;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  cardColor: string = '#232837';
  single = [
    {
      "name": "BERKLEY",
      "value": 8940000
    },
    {
      "name": "	ZURICH",
      "value": 5000000
    },
    {
      "name": "SCOR SE",
      "value": 7200000
    },
    {
      "name": "NAVIGATORS",
      "value": 5200000
    },
    {
      "name": "LLOYD'S",
      "value": 7700000
    },
    {
      "name": "	RETENCIÓN",
      "value": 4300000
    }
  ];
  bubbleData =  [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          x: '2010',
          y: 80.3,
          r: 80.4
        },
        {
          name: '2000',
          x: '2000',
          y: 80.3,
          r: 78
        },
        {
          name: '1990',
          x: '1990',
          y: 75.4,
          r: 79
        }
      ]
    },
    {
      name: 'United States',
      series: [
        {
          name: '2010',
          x: '2010',
          y: 78.8,
          r: 310
        },
        {
          name: '2000',
          x: '2000',
          y: 76.9,
          r: 283
        },
        {
          name: '1990',
          x: '1990',
          y: 75.4,
          r: 253
        }
      ]
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          x: '2010',
          y: 81.4,
          r: 63
        },
        {
          name: '2000',
          x: '2000',
          y: 79.1,
          r: 59.4
        },
        {
          name: '1990',
          x: '1990',
          y: 77.2,
          r: 56.9
        }
      ]
    },
    {
      name: 'United Kingdom',
      series: [
        {
          name: '2010',
          x: '2010',
          y: 80.2,
          r: 62.7
        },
        {
          name: '2000',
          x: '2000',
          y: 77.8,
          r: 58.9
        },
        {
          name: '1990',
          x: '1990',
          y: 75.7,
          r: 57.1
        }
      ]
    }
  ];
  

  /**GRAFICAS FINISH */
  public menuItems: any[] = [];
  public menuItemsStore: any[];
  public usersData: any;
  public customerDetail: any = [];
  constructor(private localStore: LocalstoreService,
    private _https:AuthService,
    private router: Router,
    private alert: AlertService,
    ) { 
      
      this.usersData = this.localStore.getSuccessLogin();
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
      var data =  this.localStore.getItem(Menssage.menu)
      this.menuItemsStore = data == null ? []: data
      if (this.usersData.user.id_rol == idRol.admin) {
        this.getMenu(this.usersData.user.id_rol );
      } else {
        //this.getMenu(this.usersData.user.idrol);
      }
    }

  ngOnInit(): void {
  }
  getMenu(item: number) {
    this.alert.loading();
    this._https.getmenu(item).then((resulta: any) => {
      console.log(resulta);
      // Filtrar los objetos donde la propiedad 'a' no sea igual a 1
      this.menuItems = resulta.filter(menuItem => menuItem.a !== 1);
      this.localStore.setItem(this.menuItems, Menssage.menu); // Guardar los elementos filtrados
      this.alert.messagefin();
    }).catch((err: any) => {
      console.log(err);
      this.alert.error(Menssage.error, Menssage.server);
    });
  }
  
  
  routerList(item: string){
    this.router.navigate([item]);
  }
  navigate(item: string, data: any){
    this.localStore.setItem(data, Menssage.menuSelect)
    this.router.navigate([item])
  }
  /**GRAFICAS **/
  onSelect(event) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  

  
}
