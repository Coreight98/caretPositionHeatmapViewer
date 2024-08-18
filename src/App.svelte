<script lang="ts">
  import { getCaretPosition, getXPathFromElement, hashStringToColor } from './lib';

  let domBlockElement: HTMLElement;
  let canvas: HTMLCanvasElement;
  let logs = new Map();
  let clickInfo: { offsetNode: Element; offset: number }[] = [];
  let domString = '';

  const draw = () => {
    const context = canvas.getContext('2d');
    if (!context) return;

    const { x, y, width, height } = domBlockElement.getBoundingClientRect();
    const [integerWidth, integerHeight, integerX, integerY] = [
      Math.trunc(width),
      Math.trunc(height),
      Math.trunc(x),
      Math.trunc(y),
    ];

    context.canvas.width = integerWidth;
    context.canvas.height = integerHeight;

    Array.from({ length: integerWidth }, (_, i) => i + integerX).forEach((positionX, i) => {
      Array.from({ length: integerHeight }, (_, j) => j + integerY).forEach((positionY, j) => {
        const caretPosition = getCaretPosition({ x: positionX, y: positionY });
        context.fillStyle = hashStringToColor(
          caretPosition.offset + getXPathFromElement(caretPosition.offsetNode) ?? 'null',
        );
        context.fillRect(i, j, 1, 1);
        logs.set(`${positionX}-${positionY}`, caretPosition);
      });
    });
  };
</script>

<svelte:window
  on:mousedown={(e) => {
    const [positionX, positionY] = [Math.trunc(e.pageX), Math.trunc(e.pageY)];
    const log = logs.get(`${positionX}-${positionY}`);
    if (log) clickInfo = [log, ...clickInfo];
  }} />

<main class="ma1n">
  <h1 class="title">CaretPositionHitmapViewer</h1>
  <div class="left_block">
    <div>
      <h2>Dom Editor</h2>
      <textarea class="dom_textarea" bind:value={domString} />
    </div>
    <button class="visualize_button" on:click={draw}>visualize</button>
    <div>
      <h2>Log</h2>
      <div class="log_info">
        {#each clickInfo as info}
          <div>
            <button on:click={() => console.info(info)}>log</button>
            {info.offsetNode.toString()}
            {info.offset}
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="right_block">
    <h2>Result</h2>
    <div class="result_block">
      <div class="dom_block" bind:this={domBlockElement}>
        {@html domString}
      </div>
      <canvas class="render_area" bind:this={canvas} />
    </div>
  </div>
  <address>
    <a href="https://github.com/Coreight98" target="_blank" rel="noopener noreferrer">Coregit98</a>
    <a
      href="https://github.com/Coreight98/caretPositionHitmapViewer"
      target="_blank"
      rel="noopener noreferrer">Demo Repository</a>
  </address>
</main>

<style>
  .title {
    text-align: center;
    min-height: 50px;
    align-content: center;
    margin: 0px;
  }
  .ma1n {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .ma1n .right_block {
    position: relative;
    margin-left: 50%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
  }
  .ma1n .dom_block {
    box-sizing: border-box;
    margin: auto;
    width: 100%;
    min-width: 300px;
    border: 1px solid grey;
    height: auto;
    min-height: 400px;
  }
  .ma1n .dom_textarea {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-height: 100px;
  }
  .ma1n .visualize_button {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid grey;
  }
  .ma1n .left_block {
    position: absolute;
    width: 50%;
    top: 50px;
    left: 0px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .ma1n .result_block {
    position: relative;
  }
  .ma1n .render_area {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .ma1n .log_info {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid grey;
    overflow: auto;
    height: 400px;
  }
  .ma1n h2 {
    padding: 3px 0px 3px 10px;
    box-sizing: border-box;
    background: #07b53b;
    color: white;
  }
  .ma1n address {
    z-index: 999;
  }
</style>
