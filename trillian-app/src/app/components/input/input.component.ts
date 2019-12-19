import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  public messageModel: string;

  @Output() public onMessageInput: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputMessage', {static: false}) inputMessage: ElementRef;

  constructor() { }

  public ngOnInit(): void {
  }

  public onEnter(): void {
    this.onMessageInput.emit(this.messageModel);
    // clear input afterwards
    this.inputMessage.nativeElement.value = null;
  }
}
