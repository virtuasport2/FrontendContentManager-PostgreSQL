window.onload = function () {
    const canvas = document.getElementById('loginCanvas');
    const ctx = canvas.getContext('2d');
    
    // Impostare la dimensione del canvas per coprire tutta la finestra
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Disegnare un colore di sfondo o forme (esempio: un gradiente)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff7e5f');
    gradient.addColorStop(1, '#feb47b');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
