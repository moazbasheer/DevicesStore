import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private appPath = 'http://localhost:8000/api/';
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });
  formGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    password_confirmation: new FormControl()
  })
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post(this.appPath + 'register', {
      name: this.formGroup.value.name,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      password_confirmation: this.formGroup.value.password_confirmation
    }, {headers: this.headers}).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error.error);
    });
  }

}
