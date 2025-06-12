/**
 * Configurações iniciais da animação de corações
 */
let heartCount = 0;
const MAX_HEARTS = 30;
let heartInterval;

/**
 * Cria um coração animado que cai na tela principal
 * O coração tem tamanho, posição e duração aleatórios
 */
function createHeart() {
    if (heartCount >= MAX_HEARTS) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Configurações aleatórias para o coração
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * (30 - 15) + 15) + 'px';
    heart.style.animationDuration = (Math.random() * (6 - 3) + 3) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(heart);
    heartCount++;

    // Remove o coração após a animação terminar
    heart.addEventListener('animationend', () => {
        heart.remove();
        heartCount--;
    });
}

/**
 * Cria um coração que sobe na tela inicial e na transição
 * O coração tem tamanho, posição e opacidade aleatórios
 */
function createRisingHeart() {
    const heart = document.createElement('div');
    heart.className = 'rising-heart';
    heart.innerHTML = '❤️';
    
    // Configurações aleatórias para o coração
    heart.style.left = (Math.random() * 80 + 10) + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 1 + 3) + 's';
    heart.style.opacity = (Math.random() * 0.3 + 0.7).toString();
    
    document.querySelector('.initial-screen').appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
}

/**
 * Mostra o conteúdo principal da carta
 * Inclui a música, a mensagem e inicia a animação de corações
 */
function showMainContent() {
    const transitionScreen = document.querySelector('.transition-screen');
    const mainContent = document.querySelector('.main-content');
    
    // Esconde a tela de transição e mostra o conteúdo principal
    transitionScreen.classList.remove('visible');
    mainContent.classList.add('visible');
    
    // Configura e inicia o player do Spotify
    const player = document.getElementById('spotify-player');
    player.style.display = 'block';
    player.src = player.src;
    
    // Mostra a mensagem com um pequeno delay para efeito visual
    const messageContainer = document.getElementById('message-container');
    setTimeout(() => messageContainer.classList.add('visible'), 1000);
    
    // Inicia a animação contínua de corações
    heartInterval = setInterval(createHeart, 300);
}

// Inicia as animações da tela inicial
createRisingHeart();
const initialHeartsInterval = setInterval(createRisingHeart, 600);

/**
 * Manipulador de evento para o clique no botão inicial
 * Inicia a sequência de animações e transições
 */
document.getElementById('main-button').addEventListener('click', function() {
    // Para a animação inicial de corações
    clearInterval(initialHeartsInterval);
    
    // Inicia a transição de telas
    document.querySelector('.initial-screen').classList.add('fade-out');
    document.querySelector('.transition-screen').classList.add('visible');
    
    // Cria o container para os corações da transição
    const transitionHearts = document.createElement('div');
    transitionHearts.className = 'transition-hearts';
    document.querySelector('.transition-screen').appendChild(transitionHearts);
    
    // Cria múltiplos corações com delays para efeito visual
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'rising-heart';
            heart.innerHTML = '❤️';
            heart.style.left = (Math.random() * 80 + 10) + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            transitionHearts.appendChild(heart);
            heart.addEventListener('animationend', () => heart.remove());
        }, i * 300);
    }

    // Mostra o conteúdo principal após 6 segundos
    setTimeout(showMainContent, 6000);
});