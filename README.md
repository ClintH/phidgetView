phidgetView
===========

View realtime data from Phidgets connected to the interface kit.

Phidget sensors are connected to a Phidget interface kit, which in turn is connected to computer. That computer runs the phidget dameon software.

A very thin Node.js server connects to the Phidget daemon (in principle this could be running on a different machine) via the phidgetAPI npm module. It then pushes raw data via Socket.io to any client that connects.

Provided is also a simple HTML5 canvas-based graphing visualisation which displays the realtime data from the Phidgets.

Note that data is only sent from the server where there is a change in value.

![screenshot of visualisation](http://thestaticvoid.net/images/387t.png)

The code is a very quick hack, but hopefully it's useful - if not at least for the realtime simple graphing, which I couldn't seem to find a decent implementation for.

Installation
------------

Prereqs: Node, npm, Phidget daemon

Use npm to grab all the Node stuff you need (run in source directory):

    npm install

From there, it's:

    node app.js

...to boot up the Node.js server.

To view the visualisation, access:

     http://localhost:4000

