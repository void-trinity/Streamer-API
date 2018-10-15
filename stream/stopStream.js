stopStream = (currentStream) => {
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