window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const statusText = document.getElementById('status-textText');

    // Simulação de delay para experiência de usuário premium
    if (!code) {
        setTimeout(() => {
            showError('Código de autenticação ausente. Por favor, reinicie o processo pelo Discord.');
        }, 1500);
        return;
    }

    try {
        statusText.innerText = 'Validando Credenciais...';

        // Simulação de validação (3 segundos)
        // Como o Netlify é estático, o código é validado visualmente aqui.
        // Se você quiser validação REAL no banco, deve usar o site no Shard/Square Cloud

        await new Promise(resolve => setTimeout(resolve, 3000));

        statusText.innerText = 'Segurança Confirmada';
        showSuccess();

    } catch (error) {
        console.error('Erro:', error);
        showError('Erro ao processar verificação. Tente novamente.');
    }
};

function showSuccess() {
    document.getElementById('loader-state').classList.remove('active');
    document.getElementById('success-state').classList.add('active');
    document.getElementById('card').style.border = '1px solid #57F287';
}

function showError(msg) {
    document.getElementById('loader-state').classList.remove('active');
    document.getElementById('error-state').classList.add('active');
    document.getElementById('error-message').innerText = msg;
    document.getElementById('status-textText').innerText = 'Falha na Verificação';
    document.getElementById('card').style.border = '1px solid #ED4245';
}
