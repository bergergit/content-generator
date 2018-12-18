import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldsComponent } from './fields/fields.component';

const routes: Routes = [
  { path: 'fields', component: FieldsComponent },
  { path: '', redirectTo: 'fields', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
