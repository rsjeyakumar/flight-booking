import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelRoutingModule } from './cancel-routing.module';
import { CancelComponent } from './cancel.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';

@NgModule({
  declarations: [CancelComponent],
  imports: [
    CommonModule,
    CancelRoutingModule,
    SharedModule,
    PrimengModule
  ]
})
export class CancelModule { }
