import readline from "readline";
import { stdin, stdout } from "process";

const rl = readline.createInterface({ input: stdin, output: stdout });

console.info("== PALINDROME ==");

/**
 * @param {number}
 * @return {boolean}
 */
const isPalindrome = (x) => {
  for (let i = 0; i < x.length / 2; i++) {
    const initialIndex = i;
    const finalIndex = x.length - i - 1;

    if (x.charAt(initialIndex) !== x.charAt(finalIndex)) {
      return false;
    }
  }

  return true;
};

const askAgain = () => {
  rl.question("try again? (y/n) : ", (q) => {
    if (q.toLowerCase() === "n") rl.close();
    else if (q.toLowerCase() === "y") {
      rl.question("Input: x = ", (input) => {
        const output = isPalindrome(input);
        console.info(`Output: ${output}`);
        askAgain();
      });
    } else {
      console.info("your input is invalid!!");
      rl.close();
    }
  });
};

rl.question("Input: x = ", (input) => {
  const output = isPalindrome(input);
  console.info(`Output: ${output}`);
  askAgain();
});
