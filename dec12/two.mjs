import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf8")).trim();
    let chars = file.split("\n").map(el => el.split(""));
    const regions = [];
    let set = new Set();
    chars.forEach((line, i) => {
        line.forEach((char, j) => {
            if(!set.has(j + "," + i)){
                let region = getRegion(j, i, char, chars, new Set());
                for(let pos of region) set.add(pos.x + "," + pos.y);
                if(region.length) regions.push(region);
            }
        })
    })
    let sum = regions.reduce((a, b) => {
        let sides = 0, set = new Set();
        const direction = el => el[0] < 0 ? "<" : el[0] > 0 ? ">" : el[1] < 0 ? "^" : el[1] > 0 ? "v" : "?";
        b = b.sort((a, b) => a.x - b.x).sort((a, b) => a.y - b.y);
        for(let pos of b){
            let { x, y } = pos;
            for(let dir of [[0, 1], [1, 0], [0, -1], [-1, 0]]){
                let nx = x + dir[0], ny = y + dir[1];
                let perp1 = `${nx - dir[1]},${ny + dir[0]}.${direction(dir)}`, perp2 = `${nx + dir[1]},${ny - dir[0]}.${direction(dir)}`;
                if(nx < 0 || ny < 0 || nx >= chars[0].length || ny >= chars.length){
                    if(!set.has(perp1) && !set.has(perp2)){
                        sides++;
                    }
                    set.add(`${nx},${ny}.${direction(dir)}`);
                }
                else if(chars[ny][nx] !== chars[y][x]){
                    if(!set.has(perp1) && !set.has(perp2)){
                        sides++;
                    }
                    set.add(`${nx},${ny}.${direction(dir)}`);
                }
            }
        }
        return a + b.length * sides;
    }, 0);
    console.log(sum);
})();

function getRegion(x, y, char, arr, visited){
    if(visited.has(x + "," + y)) return [];
    if(x < 0 || y < 0 || x >= arr[0].length || y >= arr.length) return [];
    if(arr[y][x] !== char) return [];
    visited.add(x + "," + y);
    let res = [{ x, y }];
    for(let dir of [[0, 1], [1, 0], [0, -1], [-1, 0]]){
        res = res.concat(getRegion(x + dir[0], y + dir[1], char, arr, visited));
    }
    return res;
}