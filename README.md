## @hyrious/shellwords

Ruby's stdlib [shellwords](https://ruby-doc.org/stdlib-2.7.0/libdoc/shellwords/rdoc/Shellwords.html) porting to JS (TS).

### Usage

```js
import Shellwords from "@hyrious/shellwords"
// const Shellwords = require("@hyrious/shellwords")

Shellwords.split('here are "two words"')
// [ 'here', 'are', 'two words' ]
Shellwords.escape("It's better to give than to receive")
// "It\\'s\\ better\\ to\\ give\\ than\\ to\\ receive"
Shellwords.join(['--a=b c', '-d', 'e f'])
// '--a\\=b\\ c -d e\\ f'
```

### Alters

- [marques-work/shellwords](https://github.com/marques-work/shellwords)

### Licence

MIT @ [hyrious](https://github.com/hyrious)
