import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf8")).trim();
    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ]
    const data = file.split('\n').map(row => row.split('').map(el => el === "." ? -1 : Number(el)))
    let zeroes = [];
    data.forEach((row, i) => row.forEach((cell, j) => { if(cell === 0) return zeroes.push({ x: j, y: i, val: 0 }) }))
    let nines = 0;
    zeroes.forEach((zero, i) => {
        const queue = [zero];
        while(queue.length > 0){
            const { x, y, val } = queue.shift();
            if(val === 9){
                nines++;
                continue;
            }
            directions.forEach(([dx, dy]) => {
                const nx = x + dx;
                const ny = y + dy;
                if(ny >= 0 && ny < data.length && nx >= 0 && ny < data[0].length && data[ny]?.[nx] === val + 1){
                    queue.push({ x: nx, y: ny, val: val + 1 })
                }
            })
        }
    })
    console.log(nines);
})()