<script>
  import Keyboard from "./components/Keyboard.svelte";
  import Board from "./components/Board.svelte";
  import GameOver from "./components/GameOver.svelte";
  import { gameOver, gameInfo, colors, board, GAME_WORD, guess } from "./store";
  import { fade } from 'svelte/transition';

  const makeGuess = () => {
    let {attempts } = $gameInfo;
    if($gameInfo.char !== 5) return;

    gameInfo.set({
      attempts: attempts +1,
      char: 0
    });

    const prevAttempt = $gameInfo.attempts - 1;
    const newColors = $colors;

    const duplicateChars = new Set();

    for (let i = 0; i < 5; i++) {
      let char = $board[prevAttempt][i].toUpperCase();

      guess.update(prev => prev + char);

      if($GAME_WORD[i].toUpperCase() === char){
        newColors[prevAttempt][i] = "correct";
      }
      else if($GAME_WORD.toUpperCase().includes(char)) {
        if(!duplicateChars.has(char)) {
          newColors[prevAttempt][i] = "close";
          duplicateChars.add(char);
        }
      } else {
        newColors[prevAttempt][i] = "incorrect";
      }
    }
    colors.set(newColors);

    if($guess === $GAME_WORD.toUpperCase() || prevAttempt == 5) {
      gameOver.set(true);
    } else {
      guess.set('');
    }
  }

</script>
<main>
  <nav>
    Marcus Worlde Svelte Clone
  </nav>
  {#if $gameOver}
    <div in:fade={{duration:1000}}>
      <GameOver/>
    </div>
  {:else}
    <div in:fade={{duration:800}}>
      <Board />
      <Keyboard {makeGuess} />
    </div>
  {/if}
</main>

<style>
  nav {
    background-color: var(--bg);
    color:  var(--text);
    font-weight: 15px;
    font-size: 2em;
    text-align: center;
  }
</style>