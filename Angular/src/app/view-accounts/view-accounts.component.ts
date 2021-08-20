import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent implements OnInit {

  users:any = [];

  constructor(private fs: FirestoreService) { }

  async ngOnInit(): Promise<void> {
    let resp = await this.fs.getUsers();
    this.users = resp.docs.map(user => user.data());
  }

}
