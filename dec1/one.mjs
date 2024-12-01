import fs from "fs/promises";

(async function () {
    let file = await fs.readFile("./input.txt", "utf-8");
    let one = [];
    let two = [];
    file.split("\n").forEach(line => {
        let nums = line.split(" ");
        one.push(+nums[0]);
        two.push(+nums[3]);
    });
    one.sort((a, b) => a - b);
    two.sort((a, b) => a - b);
    one.shift();
    let res = 0;
    for(let i = one.length; i--;){
        res += Math.abs(one[i] - two[i]);
    }
    console.log(res);
})()
