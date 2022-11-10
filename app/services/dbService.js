const { ObjectId } = require("mongodb")

class DBService {
    constructor(client) {
        this.text = client.db().collection("text")
    }

    extractData(data) {
        const textDoc = {
            filename: data.filename,
            timeStamp: data.timeStamp,
            content: data.content,
            status: data.status,
        }

        Object.keys(textDoc).forEach(
            (key) => textDoc[key] === undefined && delete textDoc[key]
        );
        return textDoc;
    }

    async create(textDoc) {
        const document = this.extractData(textDoc)
        const result = await this.text.findOneAndUpdate(
            document,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        )
        return result.value
    }

    async update(id, data) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const updateData = this.extractData(data)
        const result = await this.text.findOneAndUpdate(
            filter,
            { $set: updateData },
            { returnDocument: "after" }
        )
        return result.value;
    }
    async delete(id) {
        const result = await this.text.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
        return result.value;
    }
}


module.exports = DBService