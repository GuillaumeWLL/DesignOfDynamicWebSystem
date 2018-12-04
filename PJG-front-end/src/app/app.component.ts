import {Component, Injectable, OnInit} from '@angular/core';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import {AuthService} from './services/auth.service';
import {User} from './models/user.model';
import {Subscription} from 'rxjs';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


}

