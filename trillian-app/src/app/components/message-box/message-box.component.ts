import { Component, Input, OnInit } from '@angular/core';

import { IMessage } from '../../interfaces/message.type';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() message: IMessage;

  @Input() username: string;

  constructor() { }

  public ngOnInit(): void {
    console.dir(this.message.from);
  }

}
