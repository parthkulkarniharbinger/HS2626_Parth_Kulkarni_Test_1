function longestSub(s) {
  let n = s.length;
  let longestSubstring = '';
  let start = 0;
  let charSet = new Set();
  for (let end = 0; end < n; end++) {
    while (charSet.has(s[end])) {
      charSet.delete(s[start]);
      start++;
    }
    charSet.add(s[end]);
    if (charSet.size > longestSubstring.length) {
      longestSubstring = s.substring(start, end + 1);
    }
  }
  return longestSubstring;
}
let inputString = 'abcabcbb';
let result = longestSub(inputString);
console.log('Longest substring without repeating characters:', result);
