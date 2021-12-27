import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private appPath = 'http://localhost:8000/api/';
  list: any;
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.http.get(this.appPath + 'list', {headers: this.headers}).subscribe(data => {
      this.list = data;
    }, error => {
      this.router.navigate(['']);
    });
  }
  
  onDelete(id: any) {
    this.http.delete(this.appPath + 'delete', 
    {
      headers: this.headers,
      body: {id: id}
    }).subscribe(data => {
      this.getAllItems();
    });
  }

  logout() {
    this.http.post(this.appPath + 'logout', {}, {
      headers: this.headers
    }).subscribe(data => {
      console.log(data);
      localStorage.removeItem('token');
      this.router.navigate(['']);
    });
    
  }

}
