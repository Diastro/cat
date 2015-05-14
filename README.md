# Chrome activity tracker
Elasticsearch based chrome activity tracker.

Combined with Kibana : 
![Kibana](https://i.imgur.com/GGOrfJz.png)

# Setup instruction
- Setup and start ElasticSearch (i'm running it on a Raspberry PI2)
- Start the python server (you might need to edit the code if the python server isn't running on the same machine as elastic search)
- Install the Chrome extension and in the extension's option, make sure it points to the ip of the machine hosting elastic search
- Start Kibana and import the index. Voila

## Python server setup/dependencies
- Clone the repo, install the python dependencies and launch the python server
~~~ sh
$ git clone https://github.com/Diastro/cat.git
$ easy_install flask
$ easy_install elasticsearch
$ python server/main.py
~~~

## Chrome extension setup
- Clone the repo
~~~ sh
$ git clone https://github.com/Diastro/cat.git
~~~
- Import the chrome extension : in chrome, open chrome://extensions, select "load upacked extension"
- Set the server's address in the extension's options : in chrome, open chrome://extensions, under chrome activity tracker select "Options" and enter the ip and port of the server

# Attribution
The icon used for the Chrome extention were created by [Prax-08](http://prax-08.deviantart.com/). 
This icon pack can be found [here](http://www.deviantart.com/art/Boolean-1-1-166457851).
