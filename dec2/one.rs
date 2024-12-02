use std::fs;

fn main() {
    let file = fs::read_to_string("./input.txt").unwrap();
    let mut count = 0;

    for line in file.trim().lines() {
        let nums: Vec<i32> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let increasing: bool = nums[0] < nums[1];
        let mut safe: bool = true;
        for i in 0..nums.len() - 1 {
            let a: i32 = nums[i];
            let b: i32 = nums[i + 1];
            let diff = (a - b).abs();
            if diff < 1 || diff > 3 {
                safe = false;
                break;
            }
            else if increasing && a > b {
                safe = false;
                break;
            } 
            else if !increasing && a < b {
                safe = false;
                break;
            }
        }
        if safe {
            count += 1;
        }
    }

    println!("{}", count);
}
