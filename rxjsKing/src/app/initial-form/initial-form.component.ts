import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs'
import { ApiCallerService } from '../api-caller.service';


interface User{
  email: string,
  pass: string
}

@Component({
  selector: 'app-initial-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.scss'
})
export class InitialFormComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private apiService: ApiCallerService){}

  stream$ = new BehaviorSubject<User|null>(null);

  ngOnInit(): void {
    
  }

  public onSubmit(): void {
    console.log("alo");
    this.stream$.next({email: "webo", pass: "ajo"});
  }
}
