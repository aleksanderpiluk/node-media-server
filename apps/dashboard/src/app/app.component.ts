import { Component } from '@angular/core';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';

  alerts = this.alertsService.getAlerts();

  constructor(private alertsService: AlertsService) { }
}
