use std::fs;

fn order(nums: &[i32]) -> bool {
    let mut count = 0;
    for i in 0..nums.len() - 1 {
        if nums[i] > nums[i + 1] {
            count -= 1;
        } else if nums[i] < nums[i + 1] {
            count += 1;
        }
    }
    return count > 0
}

fn is_safe(nums: &[i32]) -> bool {
    let mut copy = nums.to_vec();
    if order(nums) {
        copy.reverse();
    }
    for i in 0..copy.len() - 1 {
        let diff = copy[i] - copy[i + 1];
        if diff < 1 || diff > 3 {
            return false;
        }
    }
    return true
}

fn main() {
    let file = fs::read_to_string("./input.txt").unwrap();
    let mut count = 0;

    for line in file.trim().lines() {
        let nums: Vec<i32> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();
        if !is_safe(&nums) {
            let mut counted = false;
            for i in 0..nums.len() {
                let mut copy = nums.clone();
                copy.remove(i);
                if is_safe(&copy) {
                    counted = true;
                    break;
                }
            }
            if counted {
                count += 1;
            }
        } else {
            count += 1;
        }
    }

    println!("{}", count);
}
