phidgetView
===========

View realtime data from Phidgets connected to the interface kit.

Phidget sensors are connected to a Phidget interface kit, which in turn is connected to computer. That computer runs the
phidget dameon software.

A very thin Node.js server connects to the Phidget daemon (in principle this could be running on a different machine)
via the phidgetAPI npm module. It then pushes raw data via Socket.io to any client that connects.

Provided is also a simple HTML5 canvas-based graphing visualisation which displays the realtime data from the Phidgets.
Note that data is only sent from the server where there is a change in value.
