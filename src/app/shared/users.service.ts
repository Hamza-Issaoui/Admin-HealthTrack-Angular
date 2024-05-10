import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { env } from '../../environment/environment';

@Injectable()
export class UserService {
  private path = env.envUrl

  constructor(private _httpClient: HttpClient) { }

  getOneUser(id: string) {
    const url = `${this.path}/users/id/${id}`
    return this._httpClient.get(url)
  }

  getAllUsers(): Observable<any> {
    const url = `${this.path}/users/getall`
    return this._httpClient.get(url)
  }

  updateUser(id: string, userData: any) {
    const url = `${this.path}/users/update/${id}`
    return this._httpClient.patch(url, userData)
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.path}/users/delete/${id}`
    return this._httpClient.delete(url)
  }

}
