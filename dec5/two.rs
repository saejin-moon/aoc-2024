use std::collections::HashMap;
use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input = fs::read_to_string("./input.txt")?;
    let binding = input.trim().replace("\r", "");
    let file_parts = binding.split("\n\n").collect::<Vec<_>>();
    
    let lookups = file_parts[1].lines().collect::<Vec<_>>();
    let mut rules: HashMap<i32, Vec<i32>> = HashMap::new();

    file_parts[0].lines().for_each(|rule| {
        let mut parts = rule.split("|").map(|s| s.trim().parse::<i32>().unwrap());
        let key = parts.next().unwrap();
        let value = parts.next().unwrap();
        rules.entry(key).or_insert_with(Vec::new).push(value);
    });

    let sum: i32 = lookups.iter()
        .filter_map(|&line| {
            let nums: Vec<i32> = line.split(',').map(|n| n.parse().unwrap()).collect();
            let mut past = vec![nums[0]];
            let mut should_include = false;

            for &num in &nums[1..] {
                if let Some(rule_set) = rules.get(&num) {
                    let last = *past.last().unwrap();
                    if !rules.get(&last).map_or(false, |lst| lst.contains(&num)) || past.iter().any(|&n| rule_set.contains(&n)) {
                        should_include = true;
                        break;
                    }
                    past.push(num);
                }
            }

            if should_include {
                let mut sorted_nums = nums.clone();
                sorted_nums.sort_by(|&a, &b| {
                    let a_contains_b = rules.get(&a).map_or(false, |lst| lst.contains(&b));
                    let b_contains_a = rules.get(&b).map_or(false, |lst| lst.contains(&a));
                    a_contains_b.cmp(&b_contains_a).reverse()
                });
                Some(sorted_nums[sorted_nums.len() / 2])
            } else {
                None
            }
        })
        .sum();

    println!("{}", sum);
    Ok(())
}
