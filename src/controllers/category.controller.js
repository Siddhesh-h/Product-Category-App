const db = require("../config/db");

exports.getCategories = (req, res) => {
    const query = "SELECT * FROM Categories";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.send("Database error");
        }

        res.render("categories/index", {
            categories: results,
            editCategory: null,
        });
    });
};

exports.addCategory = (req, res) => {
    const { CategoryName } = req.body;

    const query = "INSERT INTO Categories (CategoryName) VALUES (?)";

    db.query(query, [CategoryName], (err) => {
        if (err) {
            console.error(err);
            return res.send("Insert failed");
        }
        res.redirect("/categories");
    });
};

exports.editCategoryForm = (req, res) => {
    const id = req.params.id;
    const getOne = "SELECT * FROM Categories WHERE CategoryId = ?";
    const getAll = "SELECT * FROM Categories";

    db.query(getOne, [id], (err, editResult) => {
        if (err || editResult.length === 0) {
            return res.redirect("/categories");
        }

        db.query(getAll, (err, allResults) => {
            res.render("categories/index", {
                categories: allResults,
                editCategory: editResult[0],
            });
        });
    });
};

exports.updateCategory = (req, res) => {
    const { CategoryName } = req.body;
    const id = req.params.id;

    const query = "UPDATE Categories SET CategoryName = ? WHERE CategoryId = ?";

    db.query(query, [CategoryName, id], (err) => {
        if (err) {
            console.error(err);
            return res.send("Update Failed");
        }
        res.redirect("/categories");
    });
};

exports.deleteCategory = (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM Categories WHERE CategoryId = ?";

    db.query(query, [id], (err) => {
        if (err) {
            console.error(err);
            return res.send("Delete failed (category may be in use");
        }
        res.redirect("/categories");
    });
};
