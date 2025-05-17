const graphTask = (function () {
  let graphCount = 0;

  const objStyle = {
    bgcolor: 'red',
    border: '20px solid white'
  };

  function addGraph() {
    graphCount++;
    const container = document.getElementById('graphContainerArea');
    const graphId = `graph${graphCount}`;

    const html = `
      <div class="graph-block" id="${graphId}" style="border: ${objStyle.border}; margin-bottom: 20px; padding: 10px;">
        <div>
          <div>
            <label>Max X: <input type="number" class="maxX" /></label>
            <label>Max Y: <input type="number" class="maxY" /></label>
          </div>
          <button class="drbutton draw-btn">Draw</button>
          <button class="delete-btn">Delete</button>
        </div>

        <div class="valueInputs" style="display: none;">
          <label>Value X: <input type="number" class="valueX" /></label>
          <label>Value Y: <input type="number" class="valueY" /></label>
        </div>

        <div class="extraButtons" style="display: none;">
          <button class="clear-btn">Clear</button>
          <button class="reset-btn">Reset</button>
        </div>

        <div class="grid" id="${graphId}-grid"></div>
        <div class="barGraph" id="${graphId}-barGraph" style="display: none; margin-top: 20px;"></div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', html);

    const graph = document.getElementById(graphId);
    graph.querySelector('.draw-btn').addEventListener('click', () => handleAction(graphId));
    graph.querySelector('.clear-btn').addEventListener('click', () => clearMark(graphId));
    graph.querySelector('.reset-btn').addEventListener('click', () => resetAll(graphId));
    graph.querySelector('.delete-btn').addEventListener('click', () => deleteGraph(graphId));
  }

  function handleAction(graphId) {
  const graph = document.getElementById(graphId);
  const maxX = parseInt(graph.querySelector('.maxX').value);
  const maxY = parseInt(graph.querySelector('.maxY').value);
  const grid = graph.querySelector('.grid');
  const barGraph = graph.querySelector('.barGraph');
  const drawBtn = graph.querySelector('.draw-btn');

  if (drawBtn.textContent === 'Draw') {
    if (isNaN(maxX) || isNaN(maxY)) {
      alert('Please enter valid Max X and Max Y values.');
      return;
    }

    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`;

    for (let y = maxY - 1; y >= 0; y--) {
      for (let x = 0; x < maxX; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.x = x;
        cell.dataset.y = y;
        // cell.style.borderRight = objStyle.border;
        cell.style.borderLeft = objStyle.border;

        cell.style.height = '';
        grid.appendChild(cell);
      }
    }

    graph.querySelector('.valueInputs').style.display = 'inline-block';
    graph.querySelector('.extraButtons').style.display = 'inline-block';
    barGraph.style.display = 'block';
    drawBtn.textContent = 'Mark';

  } else {
    const valueX = parseInt(graph.querySelector('.valueX').value);
    const valueY = parseInt(graph.querySelector('.valueY').value);

    if (isNaN(valueX) || isNaN(valueY)) {
      alert("Please enter valid values for X and Y.");
      return;
    }

    if (valueX >= maxX || valueY >= maxY) {
      alert("Enter values less than Max X and Max Y.");
      return;
    }

    const cells = grid.querySelectorAll('.cell');
    cells.forEach(cell => {
      const cellX = parseInt(cell.dataset.x);
      const cellY = parseInt(cell.dataset.y);

      if (cellX === valueX && cellY <= valueY) {
        cell.style.backgroundColor = objStyle.bgcolor;
      }
    });

    renderBarGraph(graphId, valueX, valueY, maxY);
  }
}

  function renderBarGraph(graphId, valueX, valueY, maxY) {
    const barGraph = document.getElementById(`${graphId}-barGraph`);
    barGraph.innerHTML = '';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(valueY / maxY) * 100}%`;
    bar.style.width = '30px';
    bar.style.backgroundColor = objStyle.bgcolor;
    bar.style.marginRight = '10px';
    // bar.textContent = `X: ${valueX}, Y: ${valueY}`;
    bar.style.color = '#fff';
    bar.style.textAlign = 'center';

    barGraph.appendChild(bar);
  }

  function clearMark(graphId) {
    const graph = document.getElementById(graphId);
    const cells = graph.querySelectorAll('.cell');
    cells.forEach(cell => cell.style.backgroundColor = 'white');
    graph.querySelector('.valueX').value = '';
    graph.querySelector('.valueY').value = '';
  }

  function resetAll(graphId) {
    const graph = document.getElementById(graphId);
    const grid = graph.querySelector('.grid');
    grid.innerHTML = '';

    graph.querySelector('.maxX').value = '';
    graph.querySelector('.maxY').value = '';
    graph.querySelector('.valueX').value = '';
    graph.querySelector('.valueY').value = '';

    graph.querySelector('.valueInputs').style.display = 'none';
    graph.querySelector('.extraButtons').style.display = 'none';
    graph.querySelector('.barGraph').style.display = 'none';
    graph.querySelector('.draw-btn').textContent = 'Draw';
  }

  function deleteGraph(graphId) {
    const graph = document.getElementById(graphId);
    graph.remove();
  }

  return {
    addGraph,
    handleAction,
    clearMark,
    resetAll
  };
})();

const graphTaskInstance = graphTask;


