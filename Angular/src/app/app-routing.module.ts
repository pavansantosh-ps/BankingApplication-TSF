import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { ViewAccountsComponent } from './view-accounts/view-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children : [
      {
        path: '',
        component : HomeComponent
      },
      {
        path : 'create',
        component : CreateAccountComponent
      },
      {
        path : 'history',
        component : HistoryComponent
      },
      {
        path : 'view',
        component : ViewAccountsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
