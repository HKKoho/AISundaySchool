import { Direction, GameState, MazeGrid, CellType } from '../types';

/**
 * Draws the maze from a "local" perspective relative to the player,
 * rotated so the player is always facing UP.
 * This helps the AI model generate a consistent first-person view.
 */
export const drawLocalMapForAI = (
  gameState: GameState,
  viewRadius: number = 3
): string => {
  const canvas = document.createElement('canvas');
  const size = (viewRadius * 2 + 1) * 20; // 20px per cell
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Fill Background (Walls)
  ctx.fillStyle = '#000000'; // Walls are black in this schematic
  ctx.fillRect(0, 0, size, size);

  const { playerPos, playerDir, maze } = gameState;
  const cx = size / 2;
  const cy = size / 2;
  const cellSize = 20;

  ctx.translate(cx, cy);

  // Rotate canvas so player faces UP (-90deg is North in canvas)
  const rotation = -playerDir * (Math.PI / 2);
  ctx.rotate(rotation);

  // Draw cells relative to player
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[0].length; x++) {
        // Draw centered on player
        const dx = (x - playerPos.x) * cellSize;
        const dy = (y - playerPos.y) * cellSize;

        // Optimization: only draw visible
        if (Math.abs(x - playerPos.x) > viewRadius + 1 || Math.abs(y - playerPos.y) > viewRadius + 1) continue;

        const cell = maze[y][x];

        if (cell.type === 'wall') {
            ctx.fillStyle = '#1e293b'; // Dark Slate for wall
            ctx.fillRect(dx - cellSize/2, dy - cellSize/2, cellSize, cellSize);
        } else if (cell.type === 'path' || cell.type === 'start') {
            ctx.fillStyle = '#94a3b8'; // Light Slate for path
            ctx.fillRect(dx - cellSize/2, dy - cellSize/2, cellSize, cellSize);
        } else if (cell.type === 'exit') {
            ctx.fillStyle = '#ef4444'; // Red for exit
            ctx.fillRect(dx - cellSize/2, dy - cellSize/2, cellSize, cellSize);
        }
    }
  }
  
  // Draw Player Marker (Always at center, facing UP relative to canvas because we rotated grid)
  ctx.rotate(-rotation); // Undo rotation to draw player relative to View Frame
  
  // Draw "Field of View" cone for visual context to AI
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-15, -30);
  ctx.lineTo(15, -30);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
  ctx.fill();

  return canvas.toDataURL('image/png').split(',')[1];
};

/**
 * Generates a real-time simple 3D view using Raycasting (Wolfenstein 3D style).
 */
export const generateRaycastView = (gameState: GameState, width: number = 640, height: number = 360): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Draw Ceiling and Floor
  // Ceiling
  const gradientCeil = ctx.createLinearGradient(0, 0, 0, height/2);
  gradientCeil.addColorStop(0, '#020617'); // Very dark slate
  gradientCeil.addColorStop(1, '#0f172a'); // Dark slate
  ctx.fillStyle = gradientCeil;
  ctx.fillRect(0, 0, width, height / 2);

  // Floor
  const gradientFloor = ctx.createLinearGradient(0, height/2, 0, height);
  gradientFloor.addColorStop(0, '#1e293b'); // Floor horizon
  gradientFloor.addColorStop(1, '#334155'); // Floor near
  ctx.fillStyle = gradientFloor;
  ctx.fillRect(0, height / 2, width, height / 2);

  const { maze, playerPos, playerDir } = gameState;
  
  // Direction vectors
  // N: 0 (0, -1), E: 1 (1, 0), S: 2 (0, 1), W: 3 (-1, 0)
  let dirX = 0, dirY = 0, planeX = 0, planeY = 0;
  
  // FOV 66 degrees
  const FOV_SCALE = 0.66; 

  switch (playerDir) {
    case Direction.NORTH: dirX = 0; dirY = -1; planeX = FOV_SCALE; planeY = 0; break;
    case Direction.EAST:  dirX = 1; dirY = 0;  planeX = 0; planeY = FOV_SCALE; break;
    case Direction.SOUTH: dirX = 0; dirY = 1;  planeX = -FOV_SCALE; planeY = 0; break;
    case Direction.WEST:  dirX = -1; dirY = 0; planeX = 0; planeY = -FOV_SCALE; break;
  }

  // Raycasting Loop
  for (let x = 0; x < width; x++) {
    // Camera plane calculation
    const cameraX = 2 * x / width - 1; // x-coordinate in camera space
    const rayDirX = dirX + planeX * cameraX;
    const rayDirY = dirY + planeY * cameraX;

    // Map position
    let mapX = playerPos.x;
    let mapY = playerPos.y;

    // Length of ray from current position to next x or y-side
    let sideDistX;
    let sideDistY;

    // Length of ray from one x or y-side to next x or y-side
    // Avoid division by zero
    const deltaDistX = (rayDirX === 0) ? 1e30 : Math.abs(1 / rayDirX);
    const deltaDistY = (rayDirY === 0) ? 1e30 : Math.abs(1 / rayDirY);
    
    let perpWallDist;

    // Step direction and initial sideDist
    let stepX;
    let stepY;

    let hit = 0;
    let side = 0; // 0 for NS, 1 for EW
    let wallType: CellType = 'wall';

    // Player position assumes center of tile (x+0.5, y+0.5)
    const posX = playerPos.x + 0.5;
    const posY = playerPos.y + 0.5;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (posX - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1.0 - posX) * deltaDistX;
    }
    
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (posY - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1.0 - posY) * deltaDistY;
    }

    // DDA Algorithm
    let loopCount = 0;
    while (hit === 0 && loopCount < 25) { // Max render distance
      loopCount++;
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }

      // Check bounds
      if (mapX < 0 || mapX >= maze[0].length || mapY < 0 || mapY >= maze.length) {
        hit = 1; 
        wallType = 'wall';
      } else {
        const cell = maze[mapY][mapX];
        if (cell.type === 'wall' || cell.type === 'exit') {
            hit = 1;
            wallType = cell.type;
        }
      }
    }

    // Calculate distance projected on camera direction (Euclidean distance would give fisheye effect)
    if (side === 0) {
      perpWallDist = (sideDistX - deltaDistX);
    } else {
      perpWallDist = (sideDistY - deltaDistY);
    }

    // Draw Wall Strip
    const lineHeight = Math.floor(height / perpWallDist);
    // Clamp
    const drawStart = Math.max(0, -lineHeight / 2 + height / 2);
    const drawEnd = Math.min(height, lineHeight / 2 + height / 2);

    // Color Logic
    let color = '';
    
    if (wallType === 'exit') {
        // Glowing Red Portal
        if (side === 1) color = '#b91c1c'; // Darker red
        else color = '#ef4444'; // Red
    } else {
        // Stone Wall
        if (side === 1) color = '#334155'; // Darker Slate (Shadow side)
        else color = '#475569'; // Lighter Slate
    }

    // Simple Distance Fog
    if (perpWallDist > 5) {
        // Blend towards black/background
        // Simple alpha simulation using ctx.globalAlpha or just picking darker colors could work, 
        // but for speed we stick to solid colors or basic logic.
        // Let's just render.
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, drawStart, 1, drawEnd - drawStart);
  }
  
  return canvas.toDataURL();
}

/**
 * Draws the full map for the user to peek at.
 */
export const drawFullMap = (canvas: HTMLCanvasElement, gameState: GameState) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { maze, playerPos, playerDir } = gameState;
    const cellSize = canvas.width / maze.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let y=0; y<maze.length; y++) {
        for(let x=0; x<maze[y].length; x++) {
            const cell = maze[y][x];
            if (cell.type === 'wall') ctx.fillStyle = '#0f172a';
            else if (cell.type === 'exit') ctx.fillStyle = '#ef4444';
            else ctx.fillStyle = '#cbd5e1';
            
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
            ctx.strokeRect(x*cellSize, y*cellSize, cellSize, cellSize);
        }
    }

    // Draw Player
    const px = playerPos.x * cellSize + cellSize/2;
    const py = playerPos.y * cellSize + cellSize/2;
    
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(playerDir * (Math.PI / 2));
    
    ctx.beginPath();
    ctx.moveTo(0, -cellSize/3);
    ctx.lineTo(cellSize/3, cellSize/3);
    ctx.lineTo(-cellSize/3, cellSize/3);
    ctx.closePath();
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.restore();
}