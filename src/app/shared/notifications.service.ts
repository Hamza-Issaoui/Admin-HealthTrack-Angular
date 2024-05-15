import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { env } from '../../environment/environment';

@Injectable()
export class NotificationService {
  private path = env.envUrl ;
  //private wsSubject: WebSocketSubject<any>;

   constructor(private _httpClient: HttpClient) {
  //   this.wsSubject = webSocket('ws://localhost:3000/');
  //   console.log("connection", this.wsSubject);

   }

  //  getRealTimeNotifications(): Observable<any> {
  //   return this.wsSubject.asObservable();    
  // }

  createNotif(notifData: any) {
    const url = `${this.path}/notifs`
    return this._httpClient.post(url, notifData)
}

  getOneNotifs(id: string) {
    const url = `${this.path}/notifs/${id}`
    return this._httpClient.get(url)
  }

  getAllNotifs(): Observable<any> {
    const url = `${this.path}/notifs`
    return this._httpClient.get(url)
  }

  updateNotif(id: string, notifData: any) {
    const url = `${this.path}/notifs/${id}`
    return this._httpClient.patch(url, notifData)
  }

  deleteNotif(id: string): Observable<any> {
    const url = `${this.path}/notifs/${id}`
    return this._httpClient.delete(url)
  }

  
}
