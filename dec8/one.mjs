import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("./input.txt", "utf-8")).trim();
    let lines = file.split("\n");
    const map = new Map();
    lines.forEach((line, i) => {
        line.split("").forEach((char, j) => {
            if(char !== "."){
                map.get(char) ? map.get(char).push([j, i]) : map.set(char, [[j, i]]);
            }
        });
    });
    const set = new Set();
    const max_x = lines[0].length;
    const max_y = lines.length;
    for(let char of map){
        const entry = char[1];
        for(let i = 0; i < entry.length; i++){
            for(let j = 0; j < entry.length; j++){
                if(i !== j){
                    let x, y;
                    x = entry[i][0] + (entry[i][0] - entry[j][0]);
                    y = entry[i][1] + (entry[i][1] - entry[j][1]);
                    if(x >= 0 && x < max_x && y >= 0 && y < max_y) set.add(`${x},${y}`);
                }
            }
        }
    }
    console.log(set.size);
})()