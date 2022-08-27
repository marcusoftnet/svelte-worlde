import { writable } from "svelte/store";

const createGrid = () =>  {
  const grid = [];

  for(let row=0; row < 6; row++){
    grid.push([]);
    for(let column=0; column < 5; column++){
      grid[row][column] = "";
    }
  }

  return grid;
}

const createNewGame = () => {
  return {
    char: 0,
    attempts: 0,
  };
}

const wordsList = ['COLOR', 'GREEN', 'GRUMP', 'YIELD', 'TRUST', 'QUEST', 'FOCUS'];
const getRandomWord = () => wordsList[Math.floor(Math.random() * wordsList.length)];

export const resetGame = () => {
  gameInfo.set(createNewGame())
  GAME_WORD.set(getRandomWord());
  guess.set('');
  gameOver.set(false);
  colors.set(createGrid());
  board.set(createGrid());
}

export const gameInfo = writable(createNewGame())
export const GAME_WORD = writable('HELLO');
export const guess = writable('');
export const gameOver = writable(false);
export const colors = writable(createGrid());
export const board = writable(createGrid());