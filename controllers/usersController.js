const model = require("../models/index");
const {Op} = require("sequelize");
const controller = {};

controller.all = async (req, res) => {
    try {
        const userData = await model.user.findAll({
            include: model.post
        });
        if (userData.length > 0) {
            res
                .status(200)
                .json({message: "Connection successful", data: userData});
        } else {
            res.status(200).json({message: "Connection failed", data: []});
        }
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.store = async (req, res) => {
    try {
        await model.user
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            .then((result) => {
                res.status(201).json({
                    message: "user successful created", data: {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    },
                });
            });
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.getById = async (req, res) => {
    try {
        let userData = await model.user.findOne({
            where: {id: req.params.id},
            include: model.post
        });
        if (userData) {
            res.status(200).json({message: "Success", data: userData});
        } else {
            res.status(200).json({message: "User not found", data: []});
        }
    } catch (error) {
        res.status(404).json({message: error});
    }
};

controller.update = async (req, res) => {
    try {
        await model.user.findByPk(req.params.id).then(async (result) => {
            if (result) {
                await model.user.update({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    },
                    {
                        where: {
                            id: req.params.id
                        }
                    });
                res.status(200).json({message: "Success", data: model.user});
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
        await model.user.findByPk(req.params.id)
            .then(async (result) => {
                if (result) {
                    await model.user.destroy({
                        where: {id: req.params.id}
                    });
                    res.status(200).json({message: "delete user successfully"});
                } else {
                    res.status(404).json({message: "id user not found"});
                }
            });
    } catch (error) {
        res.status(404).json({message: error});
    }
};

module.exports = controller;