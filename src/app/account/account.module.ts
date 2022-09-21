import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAuthInfosComponent } from './edit-auth-infos/edit-auth-infos.component';
import { AccountComponent } from './account.component';


@NgModule({
  declarations: [
    EditProfileComponent,
    EditAuthInfosComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
