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
import { IMessage } from '../interfaces/message.type';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _ws: Subject<IMessage>;

  constructor() {

  }

  public connect(): Subject<IMessage> {
    if (!this._ws) {
      this._ws = this.create();
      console.log("Successfully connected: " + environment.url);
    }
    return this._ws;
  }

  public create(): Subject<IMessage> {
    let ws = new WebSocket(environment.url);

    let observable = Observable.create((obs: Observer<IMessage>) => {
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
