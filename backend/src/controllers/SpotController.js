const Spot = require('../models/Spot');
const User = require('../models/User');



module.exports = {
    async index(req, res) {

        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },



    async store(req, res) {
        const { filename } = req.file;
        const { empresa, techs, preco } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' })
        }

        const spot = await Spot.create({
            user: user_id,
            imagem: filename,
            empresa,
            techs: techs.split(',').map(tech => tech.trim()),
            preco
        })

        return res.json(spot);
    },

    async delete(req, res) {
        const { spot_id } = req.params;
        
        const spot = await Spot.findByIdAndDelete(spot_id);

        return res.json(spot);
    }
};