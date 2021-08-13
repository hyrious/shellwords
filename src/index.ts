/**
 * Manipulates strings like the UNIX Bourne shell
 *
 * This module manipulates strings according to the word parsing rules
 * of the UNIX Bourne shell.
 *
 * All credits go to https://github.com/ruby/ruby/blob/master/lib/shellwords.rb
 */

const splitRE = /\s*(?=(([^\s\\\'\"]+)|'([^\']*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S)))\1(\s|$)?/gmy;

/**
 * Splits a string into an array of tokens in the same way the UNIX
 * Bourne shell does.
 * @example
 * Shellwords.split('here are "two words"')
 * // ["here", "are", "two words"]
 */
export function shellsplit(line: string) {
  let words: string[] = [];
  let field = "";
  for (let [, , word, sq, dq, esc, garbage, sep] of line.matchAll(splitRE)) {
    if (garbage) {
      throw new Error(`Unmatched quote: ${JSON.stringify(line)}`);
    }
    // prettier-ignore
    field += word || sq || dq?.replace(/\\([$`"\\\n])/g, "$1") || esc.replace(/\\(.)/g, "$1");
    if (sep) {
      words.push(field);
      field = "";
    }
  }
  if (field) {
    words.push(field);
  }
  return words;
}

export const shellwords = shellsplit;

/**
 * Escapes a string so that it can be safely used in a Bourne shell
 * command line. `str` can be a non-string object that responds to
 * `toString()`.
 * @example
 * Shellwords.escape("It's better to give than to receive")
 * // "It\\'s\\ better\\ to\\ give\\ than\\ to\\ receive"
 */
export function shellescape(str: string) {
  str = String(str);
  if (!str) return "''";
  return str.replace(/[^A-Za-z0-9_\-.,:+\/@\n]/g, "\\$&").replace(/\n/g, "'\n'");
}

/**
 * Builds a command line string from an argument list, `array`.
 */
export function shelljoin(array: string[]) {
  return array.map(shellescape).join(" ");
}

export const Shellwords = {
  shellsplit,
  shellwords,
  shellescape,
  shelljoin,
  split: shellwords,
  escape: shellescape,
  join: shelljoin,
};

export default Shellwords;
