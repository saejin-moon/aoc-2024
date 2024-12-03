import fs from "fs/promises";

(async function () {
    let file = await fs.readFile("./input.txt", "utf-8");
    let sum = 0, isActive = true;
    file.trim().match(/(do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))/g).forEach(el => {
        if(el === "do()") isActive = true;
        else if(el === "don't()") isActive = false;
        else if(isActive){
            let nums = el.match(/\d{1,3}/g).map(Number);
            sum += nums[0] * nums[1];
        }
    })
    console.log(sum);
})()