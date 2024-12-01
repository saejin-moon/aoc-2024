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
    let res = 0;
    one.forEach(num => {
        res += num * two.filter(el => el === num).length
    })
    console.log(res);
})()
