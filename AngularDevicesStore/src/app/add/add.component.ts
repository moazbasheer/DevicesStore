import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  appPath = 'http://localhost:8000/api/';
  formGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl()
  });
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get(this.appPath + 'list', {headers: this.headers}).subscribe(data => {
    }, error => {
      this.router.navigate(['']);
    });
  }
  
  onSubmit() {
    
    this.http.post(this.appPath + 'add', {
      name: this.formGroup.value.name,
      price: this.formGroup.value.price
    }, {headers: this.headers}).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
    
  }

}
