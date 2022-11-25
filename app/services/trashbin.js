const { ObjectId } = require("mongodb")

class TrashBin {
    constructor(client) {
        this.text = client.db().collection("trashbin")
    }

    extractData(data) {
        const textDoc = {
            documentID: data.documentID,
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

    async find(filter) {
      const cursor = await this.text.find(filter)
      return await cursor.toArray();
    }

    async delete(id) {
        const result = await this.text.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
        return result.value;
    }
}

module.exports = TrashBin
