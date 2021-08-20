import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  senders:any = [];
  recievers:any = [];
  searchData:FormGroup;
  constructor(private fb: FormBuilder,private fs:FirestoreService) { }

  ngOnInit(): void {
    this.searchData = this.fb.group({
      search: ['', [Validators.required, Validators.email]],
    });
  }

  async submit(){
    if(this.searchData.invalid){
      alert('Enter the valid data');
      return;
    }

    let searchEmail = this.searchData.value;
    let sender = await this.fs.searchForSender(searchEmail.search);
    this.senders = sender.docs.map(user => user.data());

    let reciever = await this.fs.searchForReciever(searchEmail.search);
    this.recievers = reciever.docs.map(user => user.data());
  }
}
