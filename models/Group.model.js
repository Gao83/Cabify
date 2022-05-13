const { Schema, model } = require("mongoose")

const GroupSchema = new Schema(
    {
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }

)

const Group = model("Leader", groupSchema)
module.exports = Group
