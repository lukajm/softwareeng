//MONGOOSE FOR FILETYPE SCHEMAS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const textSchema = new Schema(
    {
        filePath: String,
    },
    {
        timestamps: true,
    }
);

const moduleFile = mongoose.model('Text', textSchema);

module.exports = moduleFile;

//module.exports = router;
