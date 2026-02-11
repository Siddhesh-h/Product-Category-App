const { getConnection } = require("../config/db");

exports.getProducts = (req, res) => {
    const pageSize = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * pageSize;

    const countQuery = "SELECT COUNT(*) AS total FROM Products";

    const productQuery = `SELECT p.ProductId, p.ProductName, c.CategoryId, c.CategoryName FROM Products p JOIN Categories c ON p.CategoryId = c.CategoryId LIMIT ? OFFSET ?`;

    getConnection().query(countQuery, (err, countResult) => {
        if (err) return res.send("Count error");

        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords / pageSize);

        getConnection().query(
            productQuery,
            [pageSize, offset],
            (err, products) => {
                if (err) {
                    console.error("Product fetch error", err);
                    return res.send(err.message);
                }

                getConnection().query(
                    "SELECT * FROM Categories",
                    (err, categories) => {
                        res.render("products/index", {
                            products,
                            categories,
                            currentPage: page,
                            totalPages,
                            editProduct: null,
                        });
                    },
                );
            },
        );
    });
};

exports.addProduct = (req, res) => {
    const { ProductName, CategoryId } = req.body;

    const query =
        "INSERT INTO Products (ProductName, CategoryId) VALUES (?, ?)";

    getConnection().query(query, [ProductName, CategoryId], (err) => {
        if (err) return res.send("Insert failed");
        res.redirect("/products");
    });
};

exports.editProductForm = (req, res) => {
    const id = req.params.id;

    const getOne = "SELECT * FROM Products WHERE ProductId = ?";
    const getAllProducts = `SELECT p.ProductId, p.ProductName, c.CategoryId, c.CategoryName FROM Products p JOIN Categories c ON p.CategoryId = c.CategoryId`;

    getConnection().query(getOne, [id], (err, editResult) => {
        if (err || editResult.length === 0) return res.redirect("/products");

        getConnection().query(getAllProducts, (err, products) => {
            getConnection().query(
                "SELECT * FROM Categories",
                (err, categories) => {
                    res.render("products/index", {
                        products,
                        categories,
                        editProduct: editResult[0],
                        currentPage: 1,
                        totalPages: 1,
                    });
                },
            );
        });
    });
};

exports.updateProduct = (req, res) => {
    const { ProductName, CategoryId } = req.body;
    const id = req.params.id;

    const query = `UPDATE Products SET ProductName = ?, CategoryId = ? WHERE ProductID = ?`;

    getConnection().query(query, [ProductName, CategoryId, id], (err) => {
        if (err) return res.send("Update failed");
        res.redirect("/products");
    });
};

exports.deleteProduct = (req, res) => {
    const id = req.params.id;

    getConnection().query(
        "DELETE FROM Products WHERE ProductId = ?",
        [id],
        (err) => {
            if (err) return res.send("Delete failed");
            res.redirect("/products");
        },
    );
};
