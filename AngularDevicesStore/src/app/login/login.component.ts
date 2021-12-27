import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private appPath = 'http://localhost:8000/api/';
  formGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post(this.appPath + 'login', {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    }).subscribe((data:any) => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['list']);
    });    
    
  }

}
