monitode [![Build Status](https://travis-ci.org/hex7c0/monitode.svg?branch=master)](https://travis-ci.org/hex7c0/monitode) [![NPM version](https://badge.fury.io/js/monitode.svg)](http://badge.fury.io/js/monitode)
==============

resource monitor for [nodejs](http://nodejs.org) using a web console based with [expressjs](http://expressjs.com/)

## API

inside expressjs project
```js
var app = require('express')();
var monitode = require('monitode');

app.use(monitode({password:'psw'}));
```

inside nodejs project
```js
var monitode = require('monitode');

monitode({password:'psw'});
```

### monitode(options)

#### Options

  - `port` - Port for accept connection _(default 30000)_
  - `password` - Password for authentication _(default 'admin', 'password')_


#### Examples

Take a look at my [examples](https://github.com/hex7c0/monitode/tree/master/examples)

## License
Copyright (c) 2014 hex7c0
Licensed under the GPLv3 license.