import { Injectable } from '@angular/core';

import {
  EMPTY,
  fromEvent,
  Observer,
  Observable,
  Subject,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _ws: Subject<string>;

  constructor() {

  }

  public connect(): Subject<string> {
    if (!this._ws) {
      this._ws = this.create();
      console.log("Successfully connected: " + environment.url);
    }
    return this._ws;
  }

  public create(): Subject<string> {
    let ws = new WebSocket(environment.url);

    let observable = Observable.create((obs: Observer<string>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
