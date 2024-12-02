use std::fs;

fn order(nums: &[i32]) -> bool {
    nums.windows(2).map(|w| w[1].cmp(&w[0]) as i32).sum::<i32>() > 0
}

fn is_safe(nums: &Vec<i32>) -> bool {
    let mut copy = nums.clone();
    if order(nums) {
        copy.reverse();
    }
    copy.windows(2).all(|w| (1..=3).contains(&(w[0] - w[1])))
}

fn main() {
    let file = fs::read_to_string("./input.txt").unwrap();
    let mut count = 0;

    for line in file.trim().lines() {
        let nums: Vec<i32> = line.split_whitespace().map(|x| x.parse().unwrap()).collect();
        if !is_safe(&nums) {
            for i in 0..nums.len() {
                let mut copy = nums.clone();
                copy.remove(i);
                if is_safe(&copy) {
                    count += 1;
                    break;
                }
            }
        } else {
            count += 1;
        }
    }

    println!("{}", count);
}
