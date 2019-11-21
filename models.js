const mongoose = require("./database");

const attributeSchema = mongoose.Schema({
    key: { type: mongoose.SchemaTypes.String, required: true },
    value: { type: mongoose.SchemaTypes.String, required: false },
});

const optionSchema = mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    image: { type: mongoose.SchemaTypes.String, required: false },
    products: [{ type: mongoose.SchemaTypes.String, required: false }],
    attributes: [attributeSchema],
});

const assistantSchema = mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    options: [optionSchema],
    customCSS: { type: mongoose.SchemaTypes.String, required: false }
});


module.exports = {
    Assistant: mongoose.model("assistant", assistantSchema),
    Option: mongoose.model("option", optionSchema),
    Attribute: mongoose.model("attribute", attributeSchema)
}