var parse = require('validator').default
var Buffer = require('buffer').Buffer
global.window.parseEmail = parse
global.window.Buffer = Buffer