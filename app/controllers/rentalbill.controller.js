const db = require("../models");
const RentalBill = db.RentalBills;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.username) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Admin
    const rentalBill = {
        name: req.body.name,
        price: req.body.price,
        electricityFee: req.body.electricity_fee,
        waterFee: req.body.water_fee,
        internetFee: req.body.internet_fee,
        otherFee: req.body.other_fee,
        feeDesc: req.body.fee_desc,
        prepay: req.body.prepay,
        discountPrice: req.body.discount_price,
        totalPrice: req.body.total_price,
        note: req.body.note,
        status: req.body.status,
        
    };

    // Save Admin in the database
    RentalBill.create(rentalBill)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rental Bill."
            });
        });
};

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
    // var condition = username ? {
    //     username: {
    //         [Op.like]: `%${username}%`
    //     }
    // } : null;
    var condition=null;

    RentalBill.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rental bills."
            });
        });
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    RentalBill.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rental Bill with id=" + id
            });
        });
};

// Update a Admin by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    RentalBill.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental Bill was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Rental Bill with id=${id}. Maybe Rental Bill was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Rental Bill with id=" + id
            });
        });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    RentalBill.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rental Bill was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Rental Bill with id=${id}. Maybe Rental Bill was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Rental Bill with id=" + id
            });
        });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
    RentalBill.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Rental Bills were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all rental bills."
            });
        });
};

// find all published Admin
// exports.findAllPublished = (req, res) => {
//     RentalBill.findAll({
//             where: {
//                 published: true
//             }
//         })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving rental bills."
//             });
//         });
// };