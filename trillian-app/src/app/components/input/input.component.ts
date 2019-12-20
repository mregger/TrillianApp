import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  public messageModel: string;

  public formControl: FormControl = new FormControl('');

  @Output() public onMessageInput: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputMessage', {static: false}) inputMessage: ElementRef;

  constructor() { }

  public ngOnInit(): void {
  }

  public onEnter(): void {
    if (this.formControl.value && this.formControl.value.length > 0) {
      this.onMessageInput.emit(this.formControl.value);
    }
    // clear input afterwards
    this.inputMessage.nativeElement.value = null;
  }
}
