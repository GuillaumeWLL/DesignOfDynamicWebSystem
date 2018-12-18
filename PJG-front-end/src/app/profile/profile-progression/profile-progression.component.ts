import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile-progression',
  templateUrl: './profile-progression.component.html',
  styleUrls: ['./profile-progression.component.scss']
})
export class ProfileProgressionComponent implements OnInit {


  value = 0;
  percentage: any;

  constructor(private apiService: ApiService) {
    this.apiService.getUserProgression().then( (response) => {
      this.value = response;
    });
    this.percentage = Math.round(this.value * 100).toFixed(2);

  }

  ngOnInit() {
  }

}
