<script>
  import { GAME_WORD, guess, resetGame } from '../store';
  import Board from "./Board.svelte"

  const playAgain = () => {
    resetGame();
  }

</script>

<div class="center">
  <h3>The correct word was: <strong>{$GAME_WORD}</strong></h3>
  <h3>You guessed: <strong>{$guess}</strong></h3>
</div>

<Board />

<div class="center">
  <button on:click={playAgain}>Play again</button>
</div>

<style>
  strong {
    font-weight: 900;
  }

  h3 {
    font-size: 2em;
  }

  button {
    background-color: var(--orange);
    color: var(--text);
    margin-top: 20px;
    padding: 20px 50px;
    cursor: pointer;
    border: none;
  }

  .center {
    margin: 20px auto;
    width: fit-content;
    text-align: center;
  }
</style>