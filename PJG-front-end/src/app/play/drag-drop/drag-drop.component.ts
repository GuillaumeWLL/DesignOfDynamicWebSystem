import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {

  todo = [
    'left',
    'left',
    'left',
    'up',
    'up',
    'up',
    'up',
    'right',
    'down'
  ];

  done = [
  ];

  constructor(private gameService: GameService){}
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('dans le else');
      console.log(this.done);
      this.gameService.pushInstructions(this.done);
    }
  }
}
