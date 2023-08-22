const logout = (req, res) => {
    // Configura los mismos atributos que utilizaste al crear la cookie
    const cookieOptions = {
        // path: '/',       // Ruta original donde se configuró la cookie
        // domain: '.amjor.shop', // Dominio original de la cookie
        // secure: true,    // Si la cookie se configuró como segura (HTTPS)
        // httpOnly: false,  // Si la cookie se configuró como HttpOnly
        // sameSite: 'None' // Valor original de SameSite
    };

    // Elimina la cookie configurando una fecha de expiración en el pasado
    res.clearCookie('token');

    return res.json({ Status: "Success" });
}

module.exports = { logout };