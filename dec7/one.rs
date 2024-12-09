use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("input.txt")?;
    let mut sum = 0;

    for line in file.lines() {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }

        let mut parts = line.split(": ");
        let res_str = parts.next().unwrap();
        let nums_str = parts.next().unwrap();

        let res: i64 = res_str.parse().unwrap();
        let nums: Vec<i64> = nums_str.split_whitespace().map(|s| s.parse().unwrap()).collect();

        let num_ops = nums.len() - 1;
        let mut found = false;

        for i in 0..(1 << num_ops) {
            let mut value = nums[0];
            for j in 0..num_ops {
                if (i >> j) & 1 == 1 {
                    value += nums[j + 1];
                } else {
                    value *= nums[j + 1];
                }
            }
            if value == res {
                sum += res;
                found = true;
                break;
            }
        }

        if found {
            continue;
        }
    }

    println!("{}", sum);
    Ok(())
}