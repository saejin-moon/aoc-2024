use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("input.txt")?;
    let mut nums: Vec<i64> = file
        .trim()
        .split_whitespace()
        .map(|s| s.parse::<i64>().unwrap())
        .collect();

    for _ in 0..25 {
        let mut arr = Vec::new();
        for &num in &nums {
            let s = num.to_string();
            if num == 0 {
                arr.push(1);
            } else if s.len() % 2 == 0 {
                let mid = s.len() / 2;
                let first_half = &s[..mid];
                let second_half = &s[mid..];
                arr.push(first_half.parse::<i64>().unwrap());
                arr.push(second_half.parse::<i64>().unwrap());
            } else {
                arr.push(num * 2024);
            }
        }
        nums = arr;
    }
    println!("{}", nums.len());
    Ok(())
}