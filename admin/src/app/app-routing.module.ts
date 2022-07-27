import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLayoutComponent } from './common/layouts/auth-layout/auth-layout.component'
import { SignInComponent } from './auth/components/sign-in/sign-in.component'
import { SignUpComponent } from './auth/components/sign-up/sign-up.component'

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
