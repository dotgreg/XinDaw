export const getUserMedia = () => {
    return new Promise((resolve) => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
        /* use the stream */
        resolve()
    })
    .catch(function(err) {
        /* handle the error */
        console.log(err)
    });
    })
}