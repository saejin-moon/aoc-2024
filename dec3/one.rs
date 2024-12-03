use regex::Regex;
use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let contents = fs::read_to_string("input.txt")?;
    let mul_regex = Regex::new(r"mul\(\d{1,3},\d{1,3}\)")?;
    let num_regex = Regex::new(r"\d{1,3}")?;

    let sum: i32 = mul_regex
        .find_iter(&contents.trim())
        .map(|m| {
            let nums: Vec<i32> = num_regex
                .find_iter(m.as_str())
                .map(|n| n.as_str().parse().unwrap())
                .collect();
            nums[0] * nums[1]
        })
        .sum();

    println!("{}", sum);
    Ok(())
}