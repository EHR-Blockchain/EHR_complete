composer card delete -c PeerAdmin@hlfv1
composer card delete -c admin@medical_chain
composer card delete -c restadmin@medical_chain
cd ~/fabric-dev-servers
./teardownAllDocker.sh
export FABRIC_VERSION=hlfv12
./downloadFabric.sh
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh
docker run -d --name mongo --network composer_default -p 27017:27017 mongo
cd ..
source envvars.txt
cd ~/EHR_complete
composer network install --card PeerAdmin@hlfv1 --archiveFile medical_chain@0.0.3.bna
composer network start --card PeerAdmin@hlfv1 --networkName medical_chain --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --file networkadmin.card
composer card import -f networkadmin.card
composer network ping -c admin@medical_chain
composer participant add -c admin@medical_chain -d '{"$class":"org.hyperledger.composer.system.NetworkAdmin", "participantId":"restadmin"}'
composer identity issue -c admin@medical_chain -f restadmin.card -u restadmin -a "resource:org.hyperledger.composer.system.NetworkAdmin#restadmin" -x true
composer card import -f  restadmin.card
composer network ping -c restadmin@medical_chain
cd ~/dockertmp
docker build -t myorg/composer-rest-server .
cd ..
sed -e 's/localhost:7051/peer0.org1.example.com:7051/' -e 's/localhost:7053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/'  -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/admin@medical_chain/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/admin@medical_chain/ 
sed -e 's/localhost:7051/peer0.org1.example.com:7051/' -e 's/localhost:7053/peer0.org1.example.com:7053/' -e 's/localhost:7054/ca.org1.example.com:7054/'  -e 's/localhost:7050/orderer.example.com:7050/'  < $HOME/.composer/cards/restadmin@medical_chain/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/restadmin@medical_chain/ 
docker run \
-d \
-e COMPOSER_CARD=${COMPOSER_CARD} \
-e COMPOSER_NAMESPACES=${COMPOSER_NAMESPACES} \
-e COMPOSER_ADMIN=${COMPOSER_ADMIN} \
-e COMPOSER_AUTHENTICATION=${COMPOSER_AUTHENTICATION} \
-e COMPOSER_MULTIUSER=${COMPOSER_MULTIUSER} \
-e COMPOSER_PROVIDERS="${COMPOSER_PROVIDERS}" \
-e COMPOSER_DATASOURCES="${COMPOSER_DATASOURCES}" \
-v ~/.composer:/home/composer/.composer \
--name rest \
--network composer_default \
-p 3000:3000 \
-p 3001:3001 \
myorg/composer-rest-server
