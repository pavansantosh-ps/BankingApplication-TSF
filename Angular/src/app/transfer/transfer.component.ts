import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferData:FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private fs:FirestoreService) { }

  ngOnInit(): void {
    this.transferData = this.fb.group({
      senderEmail: ['', [Validators.required,Validators.email]],
      recieverEmail: ['', [Validators.required,Validators.email]],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  async submit() {
    if(this.transferData.invalid){
      alert('Enter the valid data');
      return;
    }
    let temp = this.transferData.value;
    let senderEmail = temp.senderEmail;
    let recieverEmail = temp.recieverEmail;
    let amount = temp.amount;

    let senderSnapShot = await this.fs.getUser(senderEmail);
    let senderData:any = senderSnapShot.data();
    if(!senderData) {
      alert('Sender not found');
      return;
    }

    let recieverSnapShot = await this.fs.getUser(recieverEmail);
    let recieverData:any = recieverSnapShot.data();
    if(!recieverData) {
      alert('Reciever not found');
      return;
    }

    let sendersAvailableAmount = senderData?.amount || 0;
    if(sendersAvailableAmount < amount){
      alert('Sender amount is not enough');
      return;
    }

    senderData.amount -= amount;
    recieverData.amount += amount;

    this.fs.updateUser(senderData);
    this.fs.updateUser(recieverData);


    temp['timeStamp'] = this.fs.timestamp();
    this.fs.setHistory(temp);
    this.activeModal.close('Close click');
    alert("Amount transferred");
  }
}
