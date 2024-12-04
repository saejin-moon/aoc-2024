import fs from "fs/promises";

const STRING = "MAS";
const directions = [
    [-1, -1], // up-left
    [-1, 1],  // up-right
    [1, -1],  // down-left
    [1, 1],   // down-right
];

(async function () {
    let file = await fs.readFile("./input.txt", "utf-8");
    let text = file.trim().split("\n");
    let count = 0;
    for(let i = 0; i < text.length; i++) {
        for(let j = 0; j < text[i].length; j++) {
            if(text[i][j] === "M") {
                for(let dir of directions) {
                    if(find(text, j, i, dir, 0)) {
                        if(find(text, j, i + 2 * dir[0], [-dir[0], dir[1]], 0)) {
                            count++;
                        }
                        else if(find(text, j + 2 * dir[1], i, [dir[0], -dir[1]], 0)) {
                            count++;
                        }
                    }
                }
            }
        }
    }
    console.log(count / 2);
})()

function find (text, x, y, dir, index) {
    if(index === STRING.length) return true;
    if(y < 0 || y >= text.length || x < 0 || x >= text[y].length) return false;
    if(text[y][x] !== STRING[index]) return false;
    return find(text, x + dir[1], y + dir[0], dir, index + 1);
}