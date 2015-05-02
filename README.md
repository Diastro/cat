# Chrome activity tracker
Elasticsearch based chrome activity tracker.

Combined with Kibana : 
![Kibana](https://i.imgur.com/GGOrfJz.png)

# Setup instruction
[Elasticsearch and Kibana setup instruction to come]

## Server-side
- Clone the repo, install the python dependencies and launch the python server
~~~ sh
$ git clone https://github.com/Diastro/cat.git
$ easy_install flask
$ easy_install elasticsearch
$ python server/main.py
~~~

## Client-side
- Clone the repo
~~~ sh
$ git clone https://github.com/Diastro/cat.git
~~~
- Import the chrome extension : in chrome, open chrome://extensions, select "load upacked extension"
- Set the server's address in the extension's options : in chrome, open chrome://extensions, under chrome activity tracker select "Options" and enter the ip and port of the server

# Attribution
The icon used for the Chrome extention were created by [Prax-08](http://prax-08.deviantart.com/). 
This icon pack can be found [here](http://www.deviantart.com/art/Boolean-1-1-166457851).
