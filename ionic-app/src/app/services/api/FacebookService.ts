import {Injectable} from '@angular/core'
import {Response} from '@angular/http'
import {ApiService} from './ApiService'
import {Observable} from 'rxjs/Observable'
import {InterceptedHttp} from './InterceptedHttp';

@Injectable()
export class FacebookService {

  constructor(private http: InterceptedHttp) {
    if (http._backend._browserXHR) {
      let _build = http._backend._browserXHR.build;
      this.http._backend._browserXHR.build = () => {
        let _xhr = _build();
        _xhr.withCredentials = true;
        return _xhr;
      };
    }
  }

  checkToken(token: string): Observable<Response> {
    let url = ApiService.getUrl(`facebook/check`, { token })
    return this.http.get(url)
  }

  findFriends(token: string): Observable<Response> {
    let url = ApiService.getUrl(`facebook/link`, { token })
    return this.http.get(url)
  }

}


