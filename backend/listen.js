const express = require('express');
const app = express();
require('dotenv').config({ path: '.env.test' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Listening on port: ${PORT}`);
})
