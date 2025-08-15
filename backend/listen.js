const app = require('./app.js');
require('dotenv').config({ path: '.env.development' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Listening on port: ${PORT}`);
})
