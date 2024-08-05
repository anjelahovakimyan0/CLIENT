import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutUsComponent} from "./about-us/about-us.component";

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent // primary rout of this module
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] // allows also to export from the RouterModule
})
export class AboutUsRoutingModule {
}
