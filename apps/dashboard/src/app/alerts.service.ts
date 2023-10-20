import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alerts: { type: 'success', msg: string }[] = [];
  private observer!: Subscriber<{ type: 'success', msg: string }[]>;
  private alertsObservable = new Observable<{ type: 'success', msg: string }[]>(observer => {
    this.observer = observer;
  });

  constructor() { }

  getAlerts() {
    return this.alertsObservable;
  }

  success(msg: string) {
    const alert = { type: 'success', msg } as const;
    this.alerts.push(alert);

    this.observer.next(this.alerts);

    setTimeout(() => {
      const idx = this.alerts.indexOf(alert);

      this.alerts.splice(idx, 1);
      this.observer.next(this.alerts);
    }, 6000);
  }
}
