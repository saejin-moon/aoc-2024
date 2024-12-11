use std::fs;
use std::collections::HashMap;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("input.txt")?.trim().to_string();
    let nums_iter = file.split_whitespace().map(|s| s.parse::<i64>().unwrap());
    let mut nums = HashMap::new();
    for num in nums_iter {
        *nums.entry(num).or_insert(0) += 1;
    }

    for _ in 0..75 {
        let mut counts = HashMap::new();
        for (&num, &count) in &nums {
            let str_num = num.to_string();
            if num == 0 {
                *counts.entry(1).or_insert(0) += count;
            } else if str_num.len() % 2 == 0 {
                let mid = str_num.len() / 2;
                let a = str_num[..mid].parse::<i64>().unwrap();
                let b = str_num[mid..].parse::<i64>().unwrap();
                *counts.entry(a).or_insert(0) += count;
                *counts.entry(b).or_insert(0) += count;
            } else {
                *counts.entry(num * 2024).or_insert(0) += count;
            }
        }
        nums = counts;
    }

    let total: i64 = nums.values().sum();
    println!("{}", total);

    Ok(())
}