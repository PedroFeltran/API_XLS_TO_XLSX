const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

exports.convertFile = (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.readFile(file.path);
    const newFileName = file.originalname.replace('.xls', '.xlsx');
    const newFilePath = path.join(__dirname, '../uploads', newFileName);

    xlsx.writeFile(workbook, newFilePath);

    res.download(newFilePath, newFileName, (err) => {
        if (err) {
            res.status(500).send(err.message);
        }

        // Remove the temporary files
        fs.unlinkSync(file.path);
        fs.unlinkSync(newFilePath);
    });
};
