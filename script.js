let isGridDrawn = false;

function handleAction() {
  if (!isGridDrawn) {
    drawGrid();
    document.getElementById('actionButton').textContent = 'Mark';
    document.getElementById('valueInputs').style.display = 'inline-block';
    document.getElementById('extraButtons').style.display = 'inline-block';
    isGridDrawn = true;
  } else {
    markCell();
  }
}
function drawGrid() {
  const maxX = parseInt(document.getElementById('maxX').value);
  const maxY = parseInt(document.getElementById('maxY').value);
  const grid = document.getElementById('gridContainer');

  if (isNaN(maxX) || isNaN(maxY) || maxX < 1 || maxY < 1) {
    alert('Please enter valid Max X and Max Y values.');
    return;
  }

  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`;

  for (let y = maxY; y >= 1; y--) {
    for (let x = 1; x <= maxX; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      grid.appendChild(cell);
    }
  }
}

function markCell() {
  const valueX = parseInt(document.getElementById('ValueX').value);
  const valueY = parseInt(document.getElementById('ValueY').value);
  const maxX = parseInt(document.getElementById('maxX').value);
  const maxY = parseInt(document.getElementById('maxY').value);

  if (isNaN(valueX) || isNaN(valueY)) {
    alert("Please enter valid values for X and Y.");
    return;
  }

  if (valueX > maxX || valueY > maxY || valueX < 1 || valueY < 1) {
    alert("Enter the value which is less than or equal to Max X and Max Y.");
    return;
  }

  const cells = document.querySelectorAll('.cell');
  for (const cell of cells) {
    if (parseInt(cell.dataset.x) === valueX && parseInt(cell.dataset.y) === valueY) {
      cell.style.backgroundColor = 'red';
    }
  }
}


function clearMark(){
  const gridCells = document.querySelectorAll('.cell');
  gridCells.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
  document.getElementById('ValueX').value = '';
  document.getElementById('ValueY').value = '';
}

function resetAll() {
  isGridDrawn = false;

  document.getElementById('maxX').value = '';
  document.getElementById('maxY').value = '';
  document.getElementById('ValueX').value = '';
  document.getElementById('ValueY').value = '';

  document.getElementById('valueInputs').style.display = 'none';
  document.getElementById('extraButtons').style.display = 'none';

  const drawBtn = document.getElementById('actionButton');
  drawBtn.textContent = 'Draw';

  const grid = document.getElementById('gridContainer');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = '';
}