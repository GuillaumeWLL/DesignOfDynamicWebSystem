import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayComponent } from './play/play.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserNewComponent } from './user-new/user-new.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'auth', component: UserLoginComponent},
  { path: 'new-user', component: UserNewComponent},
  { path: 'play', component: PlayComponent},
  //{ path: '**', redirectTo: '/not-found'}
  ];


@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    UserLoginComponent,
    UserNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
