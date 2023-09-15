const model = require("../models/index");
const {Op} = require("sequelize");
const controller = {};

controller.all = async (req, res) => {
    try {
        const postData = await model.post.findAll({
            include: model.user
        });
        if (postData.length > 0) {
            res
                .status(200)
                .json({message: "Connection successful", data: postData});
        } else {
            res.status(200).json({message: "Connection failed", data: []});
        }
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.store = async (req, res) => {
    try {
        await model.post
            .create({
                title: req.body.title,
                text: req.body.text,
                userId: req.body.userId,
            })
            .then((result) => {
                res.status(201).json({
                    message: "user successful created", data: {
                        title: req.body.title,
                        text: req.body.text,
                        userId: req.body.userId,
                    },
                });
            });
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.getById = async (req, res) => {
    try {
        let postData = await model.post.findOne({
            where: {id: req.params.id},
            include: model.user
        });
        if (postData) {
            res.status(200).json({message: "Success", data: postData});
        } else {
            res.status(200).json({message: "Post not found", data: []});
        }
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.update = async (req, res) => {
    try {
        await model.post.findByPk(req.params.id).then(async (result) => {
            if (result) {
                await model.post.update({
                        title: req.body.title,
                        text: req.body.text,
                        userId: req.body.userId,
                    },
                    {
                        where: {
                            id: req.params.id
                        }
                    });
                res.status(200).json({message: "Success"});
            } else {
                res.status(500).json({message: "update failed"});
            }
        });
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.destroy = async (req, res) => {
    try {
        await model.post.findByPk(req.params.id)
            .then(async (result) => {
                if (result) {
                    await model.post.destroy({
                        where: {id: req.params.id}
                    });
                    res.status(200).json({message: "delete post successfully"});
                } else {
                    res.status(404).json({message: "id post not found"});
                }
            });
    } catch (error) {
        res.status(404).json({message: error});
    }
};

module.exports = controller;