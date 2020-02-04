import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./component/search/search.module`).then(m => m.SearchModule)
  },
  {
    path: 'search',
    loadChildren: () => import(`./component/search/search.module`).then(m => m.SearchModule)
  },
  {
    path: 'booking',
    loadChildren: () => import(`./component/booking/booking.module`).then(m => m.BookingModule)
  },
  {
    path: 'cancel',
    loadChildren: () => import(`./component/cancel/cancel.module`).then(m => m.CancelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
