const info = async (req, res) => {
    const { id, id_type } = req.user;
    res.json({
        id,
        id_type,
    });
};

module.exports = info;
