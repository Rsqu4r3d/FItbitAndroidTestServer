/*
 * Entry point for the companion app
 */
import { me as companion } from "companion";
import { peerSocket } from "messaging";
console.log("Companion code started");

const MILLISECONDS_PER_MINUTE = 1000 * 60;
if (!companion.permissions.granted("run_background")) {
  console.warn("We're not allowed to access to run in the background!");
}
// Tell the Companion to wake after 5 minutes. This is the minimum wake interval.
companion.wakeInterval = 5 * MILLISECONDS_PER_MINUTE;

// Listen for the wake-up
companion.addEventListener("wakeinterval", getMessage);

// Event happens if the companion is launched and has been asleep
if (companion.launchReasons.wokenUp) {
  getMessage()
  console.log("Wake interval happened!");
}
///--------------------------set up the message

//Create a method to retrieve and send the message to the watch when the Peer Socket is open.
function sendText(input){
if (peerSocket.readyState === peerSocket.OPEN) {
   peerSocket.send(input);
  console.log ("Message Sent");
}}

//Make sure we do not overfill the message buffer.
console.log("Max message size=" + peerSocket.MAX_MESSAGE_SIZE);

// Listen for the onopen event

peerSocket.onopen = function() {
  // Now we are ready to send or receive messages
}

//Run the get message from phone method.
 getMessage()

 
//Create a method to connect to the local server, get the output, and pass that to our companion app.
function getMessage(){
fetch('http://127.0.0.1:9013/text.text') //this is the server location.  I could not use "localhost" for some reason.
  //If the server gives an error or we cannot find the server, pass an error.
  .then(response => {
    if (!response.ok) {
      throw new Error("Problems..."); 
    }
    //If the server does not give an error, pass the text.
    return response.text();
  })
  //Create a promise to pass the text into the send Message method.
  .then(myText => {
  sendText(myText);
    console.log(myText);
  }) 
  //Prehaps this is redundant, but if we make it this far, and it still fails, we want to know.
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}
// Message socket closes
peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};



