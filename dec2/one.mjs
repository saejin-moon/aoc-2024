import fs from "fs/promises";

(async function () {
    let file = await fs.readFile("./input.txt", "utf-8");
    let count = 0
    file.trim().split("\n").forEach(line => {
        let nums = line.split(" ").map(Number);
        let increasing = nums[0] < nums[1];
        let safe = true;
        for(let i = 0; i < nums.length - 1; i++){
            let a = nums[i], b = nums[i + 1];
            let diff = Math.abs(a - b);
            if(diff < 1 || diff > 3){
                safe = false;
                break;
            }
            else if(increasing && a > b){
                safe = false;
                break;
            }
            else if(!increasing && a < b){
                safe = false;
                break;
            }
        }
        if(safe) count++;
    });
    console.log(count);
})()