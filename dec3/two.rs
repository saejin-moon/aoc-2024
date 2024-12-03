use std::fs;
use regex::Regex;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("./input.txt")?;
    let mut sum = 0;
    let mut is_active = true;

    let re = Regex::new(r"(do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))")?;
    let nums_re = Regex::new(r"\d{1,3}")?;

    for str_match in re.find_iter(file.trim()) {
        let el = str_match.as_str();
        if el == "do()" {
            is_active = true;
        } else if el == "don't()" {
            is_active = false;
        } else if is_active {
            let nums: Vec<i32> = nums_re
                .find_iter(el)
                .filter_map(|n| n.as_str().parse::<i32>().ok())
                .collect();
            sum += nums[0] * nums[1];
        }
    }

    println!("{}", sum);
    Ok(())
}