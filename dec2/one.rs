use std::fs;

fn main() {
    let file = fs::read_to_string("./input.txt").unwrap();
    let mut count = 0;

    for line in file.trim().lines() {
        let nums: Vec<i32> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();
        let increasing: bool = nums[0] < nums[1];
        let safe: bool = (0..nums.len() - 1).all(|i| {
            let a: i32 = nums[i];
            let b: i32 = nums[i + 1];
            let diff: i32 = (a - b).abs(); // absolute value of the difference
            // diff between 1 & 3, and increasing or decreasing following the pattern of the rest of the vector
            (diff >= 1 && diff <= 3) && !(increasing && a > b) && !(!increasing && a < b)
        });
        if safe {
            count += 1;
        }
    }

    println!("{}", count);
}
