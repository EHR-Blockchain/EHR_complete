# EHR_complete

As our application uses Block Chain it is not currently deployed and you have to follow development procedures to test the application as Deploying Block Chain based solution is not affordable to a student like us. 

Dependencies:
Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
Docker Engine: Version 17.03 or higher
Docker-Compose: Version 1.8 or higher
Node: 8.9 or higher (note version 9 is not supported)
npm: v5.x
git: 2.9.x or higher
Python: 2.7.x


First set up Hyperledger fabric: follow https://hyperledger.github.io/composer/latest/installing/development-tools.html  
Once fabric up and running clone the above git repository EHR_Complete and open another terminal and follow below commands:

1)  composer archive create -t dir -n .
2)  composer network install --card PeerAdmin@hlfv1 --archiveFile medical_chain@0.0.1.bna
3)  composer network start --networkName medical_chain --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
4)  composer card import --file networkadmin.card


To run Composer Rest server:
1)  composer-rest-server
2)  Enter admin@tutorial-network as the card name.
3)  Select never use namespaces when asked whether to use namespaces in the generated API.
4)  Select No when asked whether to secure the generated API.
5)  Select Yes when asked whether to enable event publication.
6)  Select No when asked whether to enable TLS security. 

after that get your wifi IP and change Ip in config file in front_end 

To run front_end(doctor dashboard):
open another terminal and cd to front_end in EHR_complete and run npm run dev -- -p 3001

Hence doctor dash board is up and running 


# Overall workflow of the system
![alt text](https://github.com/EHR-Blockchain/EHR_complete/blob/master/SHERM.png)
