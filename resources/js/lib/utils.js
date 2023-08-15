import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function removeFirstTwoWords(inputString) {
  // if the string is not provided, and if it's called directly on the string, we can access the text via 'this'
  if (!inputString) { inputString = this; }

  const words = inputString.split(' ');

  if (words.length >= 3) {
    words.splice(0, 2);
    return words.join(' ');
  } else {
    return inputString;
  }
}

// let's add our method on String prototype.
String.prototype.removeFirstTwoWords = removeFirstTwoWords;
