const ApiError = require("../apiError")
const MongoDB = require("../utils/mongodb_utils")
const DBService = require("../services/dbService")

exports.create = async (req, res, next) => {
    try {
        const dbService = new DBService(MongoDB.client)
        const document = await dbService.create(req.body)
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, "An error has occured while creating the document")
        )
    }
}

exports.findOne = (req, res) => {
    res.send({ message: "find one" })
}

exports.update = async (req, res, next) => {
    try {
        const dbService = new DBService(MongoDB.client)
        const document = await dbService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Document is not found"))
        }
        return res.send({message: "Document was updated successfully."})
    } catch (error) {
        return next(new ApiError(500, `Error in updating contact with id=${req.params.id}`))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const dbService = new DBService(MongoDB.client)
        const document = await dbService.delete(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Document is not found"))
        }
        return res.send({message: "Document was deleted successfully."})
    } catch (error) {
        return next(new ApiError(500, `Error in deleting this document with id=${req.params.id}.`))
    }
}

