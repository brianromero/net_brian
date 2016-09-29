import {
  Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  Router,
  Routes,
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';


@Component({
  template: '<h1 (click)="hola()">Provincial</h1>',
  
})

class Provincial {
  constructor(private router:Router){

  }
  hola(){
    this.router.navigate(['segmentacion']);
  }
}

const routes: Routes = [{
  path: '',
  component: Provincial
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  declarations: [Provincial]
})
export default class ProvincialModule {}