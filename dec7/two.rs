use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("input.txt")?.trim().to_string();
    let mut sum = 0;
    for line in file.lines() {
        let (res_str, nums_str) = line.split_once(": ").unwrap();
        let res: i64 = res_str.parse().unwrap();
        let nums: Vec<i64> = nums_str.split_whitespace().map(|s| s.parse().unwrap()).collect();
        let len = nums.len() - 1;
        for i in 0..3_i64.pow(len as u32) {
            let mut value = nums[0];
            let mut current_i = i;
            for j in 0..len {
                let op = current_i % 3;
                current_i /= 3;
                match op {
                    0 => value += nums[j + 1],
                    1 => value *= nums[j + 1],
                    _ => {
                        let value_str = format!("{}{}", value, nums[j + 1]);
                        value = value_str.parse().unwrap();
                    }
                }
            }
            if value == res {
                sum += res;
                break;
            }
        }
    }
    println!("{}", sum);
    Ok(())
}