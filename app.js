const express = require('express');
const app = express();

app.use(express.json());

function esPalindromo(cadena) {
    const cadenaLimpia = cadena.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cadenaLimpia === cadenaLimpia.split('').reverse().join('');
}

function contarCaracteresEspeciales(cadena) {
    return (cadena.match(/[^a-zA-Z0-9\s]/g) || []).length;
}

app.post('/palindromo', (req, res) => {
    const { palindromo } = req.body;
    
    if (!palindromo) {
        return res.status(400).json({ error: 'Falta el parametro' });
    }

    const lengthCadena = palindromo.length;
    const isPalindromo = esPalindromo(palindromo) ? 1 : 0;
    const lengthCaracteresEspeciales = contarCaracteresEspeciales(palindromo);

    const resultado = {
        lengthCadena,
        isPalindromo,
        lengthCaracteresEspeciales
    };

    res.json(resultado);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Ejecutando ...`);
});
