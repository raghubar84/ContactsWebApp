import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { LayoutComponent } from './layout-template/layout/layout.component';
import { ListContactComponent } from './list-contact/list-contact.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListContactComponent,
      },
      {
        path: 'create-contact',
        component: CreateContactComponent,
      },
      {
        path: 'create-contact/:id',
        component: CreateContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
