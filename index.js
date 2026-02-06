const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal (Login/Callback do Discord)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para processar a verificação (chamado pelo script.js do frontend)
app.get('/api/verify', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ success: false, message: 'Código não fornecido' });
    }

    try {
        // Simulação de processamento (Aqui você integraria com a API do Discord)
        // No futuro, você pode trocar o código pelo token e salvar no banco

        // Simulando delay de verificação
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Aqui você faria as requisições para:
        // 1. Trocar code por access_token
        // 2. Pegar os dados do usuário (@me)
        // 3. Adicionar o usuário ao servidor (guild join) se necessário

        res.json({ success: true, message: 'Verificação concluída com sucesso!' });
    } catch (error) {
        console.error('Erro na verificação:', error);
        res.status(500).json({ success: false, message: 'Erro interno ao verificar' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Site de verificação rodando na porta ${PORT}`);
});
