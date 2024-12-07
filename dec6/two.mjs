import fs from "fs/promises";

(async function () {
    const file = (await fs.readFile("./input.txt", "utf-8")).trim();
    const map = file.split('\n').map(row => row.split(''));
    const directions = {
        "^": { x: 0, y: -1, turn: ">" },
        ">": { x: 1, y: 0, turn: "v" },
        "v": { x: 0, y: 1, turn: "<" },
        "<": { x: -1, y: 0, turn: "^" },
    };
    let y = map.findIndex(row => row.includes('^'));
    let x = map[y].indexOf('^');
    const initialX = x;
    const initialY = y;
    let direction = "^";
    let count = 0;
    while (true) {
        map[y][x] = "-";
        const dir = directions[direction];
        const nextX = x + dir.x;
        const nextY = y + dir.y;
        if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map[0].length) break;
        if (map[nextY][nextX] === "#") {
            direction = dir.turn;
        } else {
            x = nextX;
            y = nextY;
        }
    }
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === "-") {
                const set = new Set();
                x = initialX;
                y = initialY;
                direction = "^";
                map[i][j] = "O";
                while (true) {
                    const key = `${x},${y},${direction}`;
                    if (set.has(key)) {
                        count++;
                        break;
                    }
                    set.add(key);
                    const dir = directions[direction];
                    const nextX = x + dir.x;
                    const nextY = y + dir.y;
                    if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map[0].length) break;
                    if (map[nextY][nextX] === "#" || map[nextY][nextX] === "O") {
                        direction = dir.turn;
                    } else {
                        x = nextX;
                        y = nextY;
                    }
                }
                map[i][j] = "-";
            }
        }
    }
    console.log(count);
})();
