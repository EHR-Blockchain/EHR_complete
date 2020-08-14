FROM vrkarthik14/composer-rest-server
EXPOSE 3001
RUN npm install --production loopback-connector-mongodb passport-google-oauth2 && \
npm cache clean --force && \
ln -s node_modules .node_modules
