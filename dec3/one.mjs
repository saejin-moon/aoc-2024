import fs from "fs/promises";

(async function () {
    let file = await fs.readFile("./input.txt", "utf-8");
    let sum = 0;
    file.trim().match(/mul\(\d{1,3},\d{1,3}\)/g).forEach(el => {
        let nums = el.match(/\d{1,3}/g).map(Number);
        sum += nums[0] * nums[1];
    })
    console.log(sum);
})()