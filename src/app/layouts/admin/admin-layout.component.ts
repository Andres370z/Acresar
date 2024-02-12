import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NavItem, NavItemType } from '../../md/md.module';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import PerfectScrollbar from 'perfect-scrollbar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Menssage, idRol } from 'src/app/models/router';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { AuthService } from 'src/app/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';


declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements OnInit, AfterViewInit {
    public navItems: NavItem[];
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public customerDetail: any = [];
    public menuItems: any[] = [];
    public usersData: any;

    url: string;
    location: Location;

    public menuItemsStore: any[];
    @ViewChild('sidebar', {static: false}) sidebar: any;
    @ViewChild(NavbarComponent, {static: false}) navbar: NavbarComponent;
    constructor( 
      private router: Router, 
      location: Location, 
      private localStore: LocalstoreService,
      private _https:AuthService,
      private alert: AlertService) {
      this.location = location;
      this.usersData = this.localStore.getSuccessLogin();
      this.customerDetail = this.localStore.getItem(Menssage.customerDetail)
      var data =  this.localStore.getItem(Menssage.menu)
      if (this.usersData.user.id_rol == idRol.admin) {
        this.getMenu(this.usersData.user.id_rol );
      } else {
        //this.getMenu(this.usersData.user.idrol);
      }
    }
    ngOnInit() {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
         this.router.events.subscribe((event:any) => {
            if (event instanceof NavigationStart) {
               if (event.url != this.lastPoppedUrl)
                   this.yScrollStack.push(window.scrollY);
           } else if (event instanceof NavigationEnd) {
               if (event.url == this.lastPoppedUrl) {
                   this.lastPoppedUrl = undefined;
                   window.scrollTo(0, this.yScrollStack.pop());
               }
               else
                   window.scrollTo(0, 0);
           }
        });
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
          if (elemMainPanel != null) {
             elemMainPanel.scrollTop = 0;
             elemSidebar.scrollTop = 0;
          }
             
        });
        const html = document.getElementsByTagName('html')[0];
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
            html.classList.add('perfect-scrollbar-on');
        }
        else {
            html.classList.add('perfect-scrollbar-off');
        }
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
          this.navbar.sidebarClose();
        });

        this.navItems = [
          { type: NavItemType.NavbarLeft, title: 'Dashboard', iconClass: 'fa fa-dashboard' },

          {
            type: NavItemType.NavbarRight,
            title: '',
            iconClass: 'fa fa-bell-o',
            numNotifications: 5,
            dropdownItems: [
              { title: 'Notification 1' },
              { title: 'Notification 2' },
              { title: 'Notification 3' },
              { title: 'Notification 4' },
              { title: 'Another Notification' }
            ]
          },
          {
            type: NavItemType.NavbarRight,
            title: '',
            iconClass: 'fa fa-list',

            dropdownItems: [
              { iconClass: 'pe-7s-mail', title: 'Messages' },
              { iconClass: 'pe-7s-help1', title: 'Help Center' },
              { iconClass: 'pe-7s-tools', title: 'Settings' },
               'separator',
              { iconClass: 'pe-7s-lock', title: 'Lock Screen' },
              { iconClass: 'pe-7s-close-circle', title: 'Log Out' }
            ]
          },
          { type: NavItemType.NavbarLeft, title: 'Search', iconClass: 'fa fa-search' },

          { type: NavItemType.NavbarLeft, title: 'Account' },
          {
            type: NavItemType.NavbarLeft,
            title: 'Dropdown',
            dropdownItems: [
              { title: 'Action' },
              { title: 'Another action' },
              { title: 'Something' },
              { title: 'Another action' },
              { title: 'Something' },
              'separator',
              { title: 'Separated link' },
            ]
          },
          { type: NavItemType.NavbarLeft, title: 'Log out' }
        ];
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    public isMap() {
        if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
            return true;
        } else {
            return false;
        }
    }
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        let ps = new PerfectScrollbar(elemMainPanel);
        ps = new PerfectScrollbar(elemSidebar);
        ps.update();
      }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    getMenu(item: number){
      this._https.getmenu(item).then((resulta: any)=>{
        if (resulta.length != 0) {
          this.menuItems = [];
          this.subMenu(resulta)
        } else {
          this.menuItems = [];
        }
          
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message == "Unauthenticated.") {
          this._https.logout()
        }
      });
    }

    subMenu(resulta:any){
      resulta.forEach(element => {
        console.log(element)
        if (element.r2) {
          this.menuItems.push(
            {
              id:element.a,
              path:element.c.toString().trim(),
              title:element.r,
              type:element.e,
              icontype:element.s,
              collapse:element.a2,
              children: element.r2,
              imgMenu:element.r3,
              active:element.e2,
            },
          )
        }else{
          this.menuItems.push(
            {
              id:element.a,
              path:element.c.toString().trim(),
              title:element.r,
              type:element.e,
              icontype:element.s,
              collapse:element.a2,
              children: element.r2,
              imgMenu:element.r3,
              active:element.e2,
            },
          )
        }
      });
      this.menuItems = this.menuItems.filter(menuItem => menuItem);
      console.log(this.menuItems)
    }
}
