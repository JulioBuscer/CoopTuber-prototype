let isRunning = false;
let currentState: any = null;

// Función para enviar actualizaciones al servidor
async function sendUpdate() {
    if (!currentState) return;
    
    try {
        await fetch('http://localhost:3001/avatar-state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentState)
        });
    } catch (error) {
        console.error('Error sending state:', error);
    }
}

// Iniciar el bucle de actualización
function startUpdateLoop() {
    if (isRunning) return;
    isRunning = true;
    
    setInterval(() => {
        if (isRunning && currentState) {
            sendUpdate();
        }
    }, 16); // Aproximadamente 60fps
}

// Escuchar mensajes del hilo principal
self.onmessage = (e) => {
    const { type, data } = e.data;
    
    switch (type) {
        case 'start':
            startUpdateLoop();
            break;
        case 'stop':
            isRunning = false;
            break;
        case 'update':
            currentState = data;
            break;
    }
};

// Notificar que el worker está listo
self.postMessage({ type: 'ready' });
