import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl('')
  })
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });
  appPath = 'http://localhost:8000/api/';
  id: any;
  name:any;
  price:any;
  constructor(private router: Router, private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get(this.appPath + 'list/' + this.id, {headers: this.headers}).subscribe((data:any) => {
      this.formGroup = new FormGroup({
        name: new FormControl(data[0].name),
        price: new FormControl(data[0].price)
      })
      
    }, error => {
      this.router.navigate(['']);
    });
  }
  onSubmit() {
    this.http.put(this.appPath + 'update', {
      id: this.id,
      name: this.formGroup.value.name,
      price: this.formGroup.value.price
    },
    {headers: this.headers}).subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

}
