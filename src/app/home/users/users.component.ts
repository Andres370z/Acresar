import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  img = environment.img;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  navigate(item: string){
    this.router.navigate([item])
  }
}
