import {EventEmitter, Injectable, Output} from '@angular/core';


@Injectable()

export class GameService {

  instructions: string[];

  constructor(){}

  @Output() instructionEvent: EventEmitter<string[]> = new EventEmitter();

  pushInstructions( instructions: string[]) {
    this.instructions = instructions;
    this.instructionEvent.emit(this.instructions);
  }
}
