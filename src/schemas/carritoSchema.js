import mongoose from "mongoose";

export const carritosSchema = new mongoose.Schema({
    timestamp: {
        type: String,
    },
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productos"
            },
            cantidad: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
});
