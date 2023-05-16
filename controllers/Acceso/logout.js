const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
}

module.exports = { logout }