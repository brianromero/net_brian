import {
  Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';


@Component({
  template: '<h1>SEGURIDAD</h1>',
})

class Segmentacion {

}

const routes: Routes = [{
  path: '',
  component: Segmentacion
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  declarations: [Segmentacion]
})
export default class SegmentacionModule {}