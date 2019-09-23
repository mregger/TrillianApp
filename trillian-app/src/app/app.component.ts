import { Component, OnInit } from '@angular/core';

import { Observable, pipe, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'trillian-app';
  public messages: Subject<string>;
  public messageStream: string[];
  public response: string;

  constructor(
    public chat: ChatService,
  ) {
    this.messageStream = [];
  }

  public ngOnInit(): void {
    this.messages = <Subject<string>>this.chat.connect().pipe(
      map((m: any): string => {
        console.dir(m.data);
        this.messageStream.push(m.data);
        return m.data;
      }),
    );
    this.messages.subscribe();
  }

  public onEnter(event: any): void {
    console.dir('Entered: ', event);
    this.messageStream.push(event);
    this.messages.next(event);
  }
}
