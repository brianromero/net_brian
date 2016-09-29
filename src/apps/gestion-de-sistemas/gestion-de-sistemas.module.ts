import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import { GestiondeSistemas } from './gestion-de-sistemas.component';


const routes: Routes = [{
  path: '',
  component: GestiondeSistemas
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  declarations: [GestiondeSistemas]
})
export default class GestiondeSistemasModule {}