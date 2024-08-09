const express = require('express');
const axios = require('axios');

const app = express();

const PORT = 3000;

app.get('/test/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const response = await axios.get('https://sisedevco.ikeasistencia.com/api-swagger/api/v1/controller/test', {
            params: {
                name: name
            }
        });

        if (response.data.nombre === name) {
            res.status(302).json(response.data);
        } else {
            res.status(404).json({ message: 'No se encontró coincidencia' });
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'No se encontró coincidencia' });
        } else {
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Ejecutando ...`);
});
