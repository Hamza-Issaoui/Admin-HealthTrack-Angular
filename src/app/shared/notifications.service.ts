import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { env } from '../../environment/environment';

@Injectable()
export class NotificationService {
  private path = env.envUrl ;

   constructor(private _httpClient: HttpClient) {}

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
