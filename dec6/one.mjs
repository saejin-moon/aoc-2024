import fs from "fs/promises";

(async function () {
    const file = await fs.readFile("./input.txt", "utf-8");
    const map = file.trim().split('\n').map(row => row.split(''));

    const directions = {
        "^": { x: 0, y: -1, turn: "<" },
        "v": { x: 0, y: 1, turn: ">" },
        "<": { x: -1, y: 0, turn: "v" },
        ">": { x: 1, y: 0, turn: "^" }
    };

    let y = map.findIndex(row => row.includes('^'));
    let x = map[y].indexOf('^');
    let steps = 1;
    let direction = "^";

    while (true) {
        map[y][x] = "+";
        const dir = directions[direction];
        const nextX = x + dir.x;
        const nextY = y + dir.y;

        if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map[0].length) break;

        if (map[nextY][nextX] === "#") {
            direction = dir.turn;
        } else {
            x = nextX;
            y = nextY;
            if (map[y][x] !== "+") steps++;
        }
    }
    console.log(steps);
})();
