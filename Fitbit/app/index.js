/*
 * This is an example app to use the companion app to access a server on the hosted phone. I used Nano Htppd, but there are other options.
 * Nano Htppd and the icon is shared according to the BDS-3 license. More info about Nano can be found here.
 * https://github.com/NanoHttpd
 */
import document from "document";
import { peerSocket } from "messaging";

const demotext = document.getElementById("demotext");
const phoneText = document.getElementById("phoneText");
demotext.text = "Fitbit Studio rocks!";
peerSocket.onmessage = evt => {
phoneText.text = evt.data;
  console.log(`App received: ${(evt.data)}`);}
