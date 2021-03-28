const texter = require('.')({subject: 'Test Text'})

texter.verizon('1234567890', 'Awesomest text ever!')
.then(console.log)
.catch(console.error)