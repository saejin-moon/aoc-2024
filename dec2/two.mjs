import fs from "fs/promises";

function order (nums) {
    let count = 0;
    for(let i = 0; i < nums.length - 1; i++){
        if(nums[i] > nums[i + 1]) count--;
        else if(nums[i] < nums[i + 1]) count++;
    }
    return count > 0;
}

function isSafe(nums) {
    let copy = nums.slice();
    if(order(nums)) copy = nums.slice().reverse();
    let safe = true;
    for (let i = 0; i < copy.length - 1; i++) {
        let a = copy[i], b = copy[i + 1];
        let diff = a - b;
        if (diff < 1 || diff > 3) safe = false;
    }
    return safe;
}

(async function () {
    let file = await fs.readFile("./input.txt", "utf-8");
    let count = 0
    file.trim().split("\n").forEach((line, i) => {
        let nums = line.split(" ").map(Number);
        let safe = isSafe(nums);
        if (!safe){
            let counted = false;
            for(let i = 0; i < nums.length; i++){
                let copy = nums.slice();
                copy.splice(i, 1);
                let safe = isSafe(copy);
                if (safe){
                    counted = true;
                    break;
                }
            }
            if(counted){
                count++;
            }
        }
        else count++;
    });
    console.log(count);
})()