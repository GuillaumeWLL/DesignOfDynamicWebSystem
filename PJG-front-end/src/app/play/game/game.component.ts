import { Component } from '@angular/core';
import { CONTROLS, COLORS, BOARD_SIZE, GAME_MODES } from './game.constants' ;
import { GameService } from '../../services/game.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent {
  private interval: number;
  private tempDirection: number;
  private default_mode = 'classic';
  private tabMouv = []; // ce tableau pour instructions init l. 239
  public all_modes = GAME_MODES;
  public getKeys = Object.keys;
  public board = [];
  public obstacles = [];
  public score = 0;
  public showMenuChecker = false ;
  public gameStarted = false;
  public newBestScore = false ;

  private snake = {
    direction: CONTROLS.LEFT,
    parts : [
      {
        x : -1,
        y : -1
      }
    ]
  };

  private objective = {
    x: -1,
    y: -1
  };

  constructor(private gameService: GameService) {
    this.setBoard();
    this.resetFruit();
  }
//tab[0] on prend le prend le dernier element et on shift pour le supprimer
//  handleKeyboardEvents( e: KeyboardEvent){
  movement( tabMouv )
  {
    if( tabMouv[0] === "left()" && this.snake.direction) {
      this.tempDirection = CONTROLS.LEFT;
    } else if ( tabMouv[0] === "up()" && this.snake.direction) {
      this.tempDirection = CONTROLS.UP;
    } else if ( tabMouv[0] === "right()" && this.snake.direction) {
      this.tempDirection = CONTROLS.RIGHT;
    } else if ( tabMouv[0] === "down()" && this.snake.direction) {
      this.tempDirection = CONTROLS.DOWN;
    }
    this.tabMouv.shift();
  }

  setColors(col: number , row: number): string{
<<<<<<< HEAD
   /* if(this.isGameOver){
      return COLORS.GAME_OVER;
    } else*/ if (this.fruit.x === row && this.fruit.y === col){
=======
    /* if(this.isGameOver){
       return COLORS.GAME_OVER;
     } else*/ if (this.objective.x === row && this.objective.y === col){
>>>>>>> Front-End
      return COLORS.FRUIT;
    }else if (this.snake.parts[0].x === row && this.snake.parts[0].y === col){
      return COLORS.HEAD;
    }else if(this.board[col][row] === true){
      return COLORS.BODY;
    }/*else if(this.default_mode === 'obstacles' && this.checkObstacles(row, col)){
      return COLORS.OBSTACLE;
    }*/
    return COLORS.BOARD;
  };

  updatePositions(): void {
    let newHead = this.repositionHead();
    let me = this;

    if(this.default_mode === 'classic' && this.boardCollision(newHead)) {
      return this.gameOver();
    }/*else if(this.default_mode === 'no_walls'){
      this.noWallsTransition(newHead);
    }else if(this.default_mode === 'obstacles'){
      this.noWallsTransition(newHead);*/
    //if(this.obstacleCollision(newHead)){
      //return this.gameOver();
    //}
    if (this.objectiveCollision(newHead)){
      console.log('won !!!');
    }
//  }

    if(this.selfCollision(newHead)){
      return this.gameOver();
    } else if (this.fruitCollision(newHead)){
    this.eatFruit();
  }

    let oldTail = this.snake.parts[0];
    this.board[oldTail.y][oldTail.x] = false;

    this.snake.parts.unshift(newHead);
    this.snake.parts.pop();
    this.board[newHead.y][newHead.x] = true;

    this.snake.direction = this.tempDirection;

    setTimeout(() => {
      if( this.tabMouv.length > 0){
        me.updatePositions();
      }
    }, this.interval);
  }


  repositionHead():any {
    let newHead = Object.assign({}, this.snake.parts[0]);
    this.movement(this.tabMouv);
    if(this.tempDirection === CONTROLS.LEFT){
      newHead.x -= 1;
    }else if(this.tempDirection === CONTROLS.RIGHT){
      newHead.x += 1;
    } else if (this.tempDirection === CONTROLS.UP){
      newHead.y -= 1;
    } else if (this.tempDirection === CONTROLS.DOWN){
      newHead.y += 1;
    }
    return newHead;
  }

  /*noWallsTransition(part: any): void {
    if(part.x === BOARD_SIZE){
      part.x = 0;
    } else if (part.x === -1){
      part.x = BOARD_SIZE - 1;
    }

    if(part.y === BOARD_SIZE){
      part.y = 0;
    }else if (part.y === -1){
      part.y = BOARD_SIZE - 1;
    }
  }*/


  addObjective(): void {
    //let x = this.randomNumber();
    //let y = this.randomNumber();
    let x = 6;
    let y = 7;
    this.board[x][y] = true;
    //if(this.board[y][x] === true || y === 8) {
      //return this.addObjective();
    //}
    /*this.objective.push({
      x: x,
      y: y
    });*/
  }

  checkObstacles(x, y): boolean {
    let res = false;
    /*this.objective.forEach((val) => {
      if(val.x === x && val.y === y) {
        res = true;
      }
    });*/
    return res;
  }
  checkObjective(x, y): boolean {
    let res = false;
    /*this.objective.forEach((val) => {
      if(val.x === x && val.y === y) {
        res = true;
      }
    });*/
    return res;
  }

  obstacleCollision(part: any):boolean{
    console.log('réussi !!!');
    return this.checkObstacles(part.x, part.y);
  }
  objectiveCollision(part: any):boolean{
   // console.log('réussi !!!');
    console.log(this.checkObjective(part.x, part.y));
    return this.checkObjective(part.x, part.y);

  }
  boardCollision(part: any):boolean{
    return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
  }

  selfCollision(part: any):boolean{
    return this.board[part.y][part.x] === true;
  }

  fruitCollision(part: any):boolean{
    return part.x === this.objective.x && part.y === this.objective.y;
  }

  resetFruit(): void {
    let x = this.randomNumber();
    let y = this.randomNumber();

    if(this.board[y][x] === true || this.checkObstacles(x,y)){
      return this.resetFruit();
    }

    this.objective = {
      x: x,
      y: y
    };
  }

  eatFruit(): void {
    alert('You won this level !');
    this.setBoard();
  }

<<<<<<< HEAD
*/  gameOver(): void {
   /* this.isGameOver = true;
    this.gameStarted = false;
    let me = this;
    if(this.score > this.best_score){
      this.best_score = this.score ;
      this.newBestScore = true;
    }

    setTimeout(() => {
      me.isGameOver = false;
    }, 500);
    this.setBoard();
 */ }
=======
  gameOver(): void {
    /* this.isGameOver = true;
     this.gameStarted = false;
     let me = this;
     if(this.score > this.best_score){
       this.best_score = this.score ;
       this.newBestScore = true;
     }

     setTimeout(() => {
       me.isGameOver = false;
     }, 500);
     this.setBoard();
  */ }
>>>>>>> Front-End

  randomNumber(): any{
    return Math.floor(Math.random() * BOARD_SIZE);
  }

  setBoard(): void {
    this.board = [];
    for(let i = 0 ; i < BOARD_SIZE; i++){
      this.board[i] = [];
      for(let j = 0; j < BOARD_SIZE ; j++){
        this.board[i][j] = false;
      }
    }
    //this.board[this.snake.parts[0].x][this.snake.parts[0].y] = false;


   // this.board[6][7] = true;
  }

  showMenu() : void{
    this.showMenuChecker = !this.showMenuChecker;
  }

  reset() {
    this.setBoard();
    this.interval = 500;
    this.snake = {
      direction: CONTROLS.LEFT,
      parts: [ {x: 8, y:8}
      ]
    };
  }
  newGame(/*mode: string*/): void{
    this.setBoard();
    this.tabMouv = [];
    this.tabMouv = this.gameService.instructions;    //['left', 'left', 'left', 'up','up','up','up', 'right', 'down']; // Ici pour set instructions du tableau
<<<<<<< HEAD
    this.tabMouv.unshift(this.tabMouv[0]);
=======
    console.log(this.tabMouv);
    //this.tabMouv.unshift(this.tabMouv[0]);
>>>>>>> Front-End
    this.default_mode =/* mode || */'classic' ;
    //this.newBestScore = false;
    //this.score = 0 ;
    //this.tempDirection;
    this.interval = 500;
    this.snake = {
      direction: CONTROLS.LEFT,
      parts: [ {x: 8, y:8}
      ]
    };
    console.log('1');
    console.log(this.snake);
    //this.snake.parts.push({x: 8 , y: 8});
    /*for(let i = 0; i < 3 ; i++){
      this.snake.parts.push({x: 8 , y:8});
    }*/
      /*if(mode === 'obstacles'){
      this.obstacles = [] ;
      let j = 1 ;
      do {
        this.addObstacles();
      }while(j++<9);
    }*/

    this.updatePositions();
  }
}//end of app
