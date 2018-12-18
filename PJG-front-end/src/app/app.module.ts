import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';

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
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileProgressionComponent } from './profile/profile-progression/profile-progression.component';
import { RegisterService } from './services/register.service';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from './services/api.service';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { DragDropComponent } from './play/drag-drop/drag-drop.component';
import { GameComponent } from './play/game/game.component';
import { MaterialModule } from './material-module';
import { GameService } from './services/game.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { MatFileUploadModule } from 'angular-material-fileupload';

const appRoutes: Routes = [
  { path: 'auth', component: UserLoginComponent},
  { path: 'new-user', component: UserNewComponent},
  { path: 'play'/*, canActivate: [AuthGuard]*/, component: PlayComponent},
  { path: 'profile/progression'/*, canActivate: [AuthGuard]*/, component: ProfileProgressionComponent},
  { path: 'profile/edit'/*, canActivate: [AuthGuard]*/, component: EditProfileComponent},
  { path: 'profile' /*, canActivate: [AuthGuard]*/, component: ProfileComponent},
  { path: 'home', component: HomeComponent},
  //{ path: '**', redirectTo: '/not-found'}
  ];


@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    UserLoginComponent,
    UserNewComponent,
    ProfileComponent,
    HomeComponent,
    EditProfileComponent,
    ProfileProgressionComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DragDropComponent,
    GameComponent,
    ProfilePictureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatGridListModule,
    MatSidenavModule,
    MatInputModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    MaterialModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    HttpClientModule,
    MatFileUploadModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    RegisterService,
    ApiService,
    GameService
  ],
  entryComponents: [ DragDropComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
