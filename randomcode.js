
function removeDuplicates(nums) {
    let j = 1; // Start j at 1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[j] = nums[i];
            j++;
        }
    }

    return j;
}


let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums)); 
console.log(nums); // [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]

//push on the andra develop brach