window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const statusText = document.getElementById('status-textText');
    const loaderState = document.getElementById('loader-state');
    const successState = document.getElementById('success-state');
    const errorState = document.getElementById('error-state');
    const errorMessage = document.getElementById('error-message');

    if (!code) {
        showError('Link de verificação inválido ou expirado. Por favor, solicite um novo link no Discord.');
        return;
    }

    try {
        statusText.innerText = 'Validando Credenciais...';

        // Chamada para o nosso backend
        const response = await fetch(`/api/verify?code=${code}`);
        const data = await response.json();

        if (data.success) {
            statusText.innerText = 'Segurança Confirmada';
            showSuccess();
        } else {
            showError(data.message || 'Falha na verificação de identidade.');
        }
    } catch (error) {
        console.error('Erro:', error);
        showError('Erro de conexão com o servidor. Tente novamente mais tarde.');
    }
};

function showSuccess() {
    document.getElementById('loader-state').classList.remove('active');
    document.getElementById('success-state').classList.add('active');

    // Pequeno delay para animação fluida
    setTimeout(() => {
        document.getElementById('card').style.border = '1px solid #57F287';
    }, 500);
}

function showError(msg) {
    document.getElementById('loader-state').classList.remove('active');
    document.getElementById('error-state').classList.add('active');
    document.getElementById('error-message').innerText = msg;
    document.getElementById('status-textText').innerText = 'Falha na Verificação';
    document.getElementById('card').style.border = '1px solid #ED4245';
}
