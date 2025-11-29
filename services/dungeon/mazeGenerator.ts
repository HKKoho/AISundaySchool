import { CellType, MazeGrid, Position } from '../../types/dungeon';

export const MAZE_SIZE = 15; // Must be odd for this algorithm - larger size for more challenge

export const generateMaze = (size: number = MAZE_SIZE): { grid: MazeGrid; start: Position; exit: Position } => {
  // Initialize grid with walls
  const grid: MazeGrid = Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => ({
      x,
      y,
      type: 'wall' as CellType,
      visited: false,
    }))
  );

  const start: Position = { x: 1, y: 1 };
  
  // Recursive Backtracker
  const stack: Position[] = [start];
  grid[start.y][start.x].type = 'path';
  grid[start.y][start.x].visited = true;

  const directions = [
    { dx: 0, dy: -2 }, // North
    { dx: 2, dy: 0 },  // East
    { dx: 0, dy: 2 },  // South
    { dx: -2, dy: 0 }, // West
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    
    // Shuffle directions
    const shuffledDirs = directions.sort(() => Math.random() - 0.5);
    let found = false;

    for (const dir of shuffledDirs) {
      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;

      if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && !grid[ny][nx].visited) {
        // Carve path
        grid[ny][nx].type = 'path';
        grid[ny][nx].visited = true;
        
        // Carve wall between
        const betweenX = current.x + dir.dx / 2;
        const betweenY = current.y + dir.dy / 2;
        grid[betweenY][betweenX].type = 'path';
        grid[betweenY][betweenX].visited = true;

        stack.push({ x: nx, y: ny });
        found = true;
        break;
      }
    }

    if (!found) {
      stack.pop();
    }
  }

  // Set Start
  grid[start.y][start.x].type = 'start';

  // Set Exit at the furthest point from start using Manhattan distance
  let maxDistance = 0;
  let exitPos: Position = { x: 1, y: 1 };

  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      if (grid[y][x].type === 'path') {
        const distance = Math.abs(x - start.x) + Math.abs(y - start.y);
        if (distance > maxDistance) {
          maxDistance = distance;
          exitPos = { x, y };
        }
      }
    }
  }

  grid[exitPos.y][exitPos.x].type = 'exit';
  return { grid, start, exit: exitPos };
};