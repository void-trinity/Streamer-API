stopStream = (currentStream) => {
    console.log('------------Inside stopStream()-----------');
    if(currentStream) {
        currentStream.stop();
        currentStream.on('reconnect', () => {
            currentStream.stop();
        });
        return true;
    } else {
        return false;
    }
}

module.exports = stopStream;