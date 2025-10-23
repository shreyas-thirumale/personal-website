let num = Math.floor(Math.random() * 10000) //Math.random() generates a number between 0 and 1 (not including 1)
if ((num % 2) == 0) {
    console.log(`${num} is even`)
} else {
    console.log(`${num} is odd`)
}

function fizzBuzz(n) {
    ans = []
    for (let i = 1; i <= n; i++) {
        if (i%3==0 && i%5==0) {
            ans.push("Fizzbuzz")
        } else if (i%3 == 0) {
            ans.push("fizz")
        } else if (i%5==0) {
            ans.push("buzz")
        } else {
            ans.push(i)
        }
    }
    return ans;
}

console.log(fixxBuzz(15))