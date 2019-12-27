import { Component, OnInit } from '@angular/core';

import { Observable, pipe, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatService } from './services/chat.service';
import { IMessage } from './interfaces/message.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'trillian-app';
  public messages: Subject<IMessage>;
  public messageStream: IMessage[];
  public response: string;
  public username: string;

  constructor(
    public chat: ChatService,
  ) {
    this.messageStream = [];
    this.username = 'hackerman';
  }

  public ngOnInit(): void {
    this.messages = <Subject<IMessage>>this.chat.connect().pipe(
      map((m: any): IMessage => {
        const message: IMessage = JSON.parse(m.data);
        console.dir(message);
        this.messageStream.push(message);
        return message;
      }),
    );
    this.messages.subscribe();
  }

  public onEnter(event: any): void {
    const message: IMessage = {
      from: this.username,
      content: event,
      timestamp: Date.now(),
    };
    console.dir('Entered: ', message);
    this.messageStream.push(message);
    this.messages.next(message);

    const fakeMessage: IMessage = {
      from: 'balls',
      content: 'ASDASDASDASDASDasdasdasdasdasdasdASDASDASDASDASDasdasdasdasdasdasdASDASDASDASDASDasdasdasdasdasdasdASDASDASDASDASDasdasdasdasdasdasd',
      timestamp: 123,
    };
    this.messageStream.push(fakeMessage);
    this.messages.next(fakeMessage);
  }
}
