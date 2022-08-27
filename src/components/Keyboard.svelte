<script>
  import Key from './Key.svelte';
  import {board, gameInfo } from '../store';

  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3 = ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'DEL'];

  export let makeGuess;

  const handleDelete = () => {
    if($gameInfo.char === 0) return;

    gameInfo.update(prev => {
      return {
        char: prev.char - 1,
        attempts: prev.attempts
      }
    });

    board.update(prev => {
      const newBoard = prev;
      newBoard[$gameInfo.attempts][$gameInfo.char] = "";
      return newBoard;
    });
  }

  const keyPress = (key = "") => {

    if(key == "DEL") {
      handleDelete();
      return;
    }
    if(key == "ENTER") {
      makeGuess();
      return;
    }

    let { attempts, char} = $gameInfo;

    if(char > 4) return;

    board.update(prev => {
      const newBoard = prev;
      newBoard[attempts][char++] = key;
      return newBoard;
    });

    gameInfo.set({attempts, char});
  }
</script>

<div class="keyboard">
  <div class="row">
    {#each row1 as char}
      <Key {char} {keyPress} />
      {/each}
    </div>
    <div class="row">
      {#each row2 as char}
      <Key {char} {keyPress} />
      {/each}
    </div>
    <div class="row">
      {#each row3 as char}
      <Key {char} {keyPress} />
    {/each}
  </div>
</div>

<style>
  .keyboard {
    position: fixed;
    width: fit-content;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>