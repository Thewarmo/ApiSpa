const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        // For demo purposes - replace this with your actual user validation
        const { username, password } = req.body;
        
        // Demo credentials - replace with database validation
        if (username === "admin" && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { userId: "1", username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.json({
                estado: true,
                mensaje: 'Login exitoso',
                token
            });
        } else {
            res.status(401).json({
                estado: false,
                mensaje: 'Credenciales inválidas'
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login };