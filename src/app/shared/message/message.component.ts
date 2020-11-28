import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
          <div *ngIf="temErro()">
            <p-message severity="error" text="{{text}}"></p-message>
          </div>
  `,
  styles: [
  ]
})
export class MessageComponent  {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
