const express = require('express');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const port = 3000;

app.use('/api/files', fileRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
