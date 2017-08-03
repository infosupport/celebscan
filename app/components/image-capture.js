import Ember from 'ember';
import 'npm:pitchly-webcamjs';

export default Ember.Component.extend({
    didInsertElement() {
        let webcam = window.webcam;
        let videoElement = this.$("video")[0];

        webcam.init().then(function() {
            videoElement.src = webcam.videoStream;
            videoElement.play();
        });
    },
    actions: {
        takePicture() {
            let videoElement = this.$("video")[0];
            let canvas = document.createElement("canvas");

            canvas.width = 640;
            canvas.height = 480;

            canvas.getContext("2d").drawImage(videoElement, 0,0, canvas.width, canvas.height);
            this.sendAction('action', canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, ''));
        }
    }
});
