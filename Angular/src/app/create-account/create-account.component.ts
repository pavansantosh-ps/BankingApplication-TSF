import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  formData:FormGroup;
  constructor(private fb: FormBuilder, private fs: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async submit() {
    if(this.formData.invalid) {
      alert("Invalid Data in the form");
      return;
    }
    let payload = this.formData.value;
    let resp =  await this.fs.createUser(payload);
    this.router.navigate(['']);

  }
}
