import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf8")).trim();
    let nums = file.split(' ').map(Number);
    let obj = {};
    for(let num of nums) obj[num] = (obj[num] || 0) + 1;
    nums = obj;
    for(let _ = 75; _--;){
        let counts = {};
        for(let num in nums){
            let str = num.toString();
            if(+num === 0){
                counts[1] = (counts[1] || 0) + nums[num];
            }
            else if(str.length % 2 === 0){
                let a = +str.slice(0, str.length / 2), b = +str.slice(str.length / 2);
                counts[a] = (counts[a] || 0) + nums[num];
                counts[b] = (counts[b] || 0) + nums[num];
            }
            else {
                counts[num * 2024] = (counts[num * 2024] || 0) + nums[num];
            }
        }
        nums = counts;
    }
    console.log(Object.values(nums).reduce((a, b) => a + b));
})()