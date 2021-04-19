import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiServerUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public findAllUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/all/${page}`);
  }

  public findUser(cnp: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/findUser/${cnp}`);
  }

  public findUsers(cnp: number, name: string, page: number): Observable<User[]> {
    let cnp2
    if (cnp == null)
      cnp2 = ''
    else
      cnp2 = cnp
    let name2
    if (name == null)
      name2 = ''
    else
      name2 = name
    return this.http.get<User[]>(`${this.apiServerUrl}/findUsers/${cnp2}/${name2}/${page}`);
  }
}
