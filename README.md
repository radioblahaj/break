# Human Turn Signals

Ever wanted to become a car? Now YOU can use turn signals & lights as well!  

Toot your horn, and use the break and turn signals to let those around you know where you're walking. (manitej not included)

## Video Demo

Soon

## Features
- Automatically enables brake lights when you slow down
- Physically rotate your phone in the direction of your tuen to trigger the turn signals
- Press the horn button to sound the horn!

## Setup

### Hardware
 
Parts list:
- RPI Pico
- Red LEDs (x24)
- Yello LEDs (x12)
- White LEDs (x12)
- Wires
- NPN transistor
- Resistors
- (Laptops, USB HUB, wifi adapter, etc)

Connect each LED module using wires to be powered with NPN transistors.  
- Brake light: PIN 21
- Left signal: PIN 20
- Right signal: PIN 22

### Software

1. Flash `sy.ino` onto the Pico
2. On a computer teathered to the pico via USB cable, install the node modules (`npm install`) and run the ExpressJS server (`node index.js`)
3. On a mobile device, navigate the https://[computer ip]:3000
