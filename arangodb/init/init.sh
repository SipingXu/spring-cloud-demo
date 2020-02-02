#!/bin/sh

sed "s/@ARANGO_USER_NAME@/${ARANGO_USER_NAME}/g" /init.js | sed "s/@ARANGO_USER_PASSWORD@/${ARANGO_USER_PASSWORD}/g" > /init-final.js

arangosh --server.endpoint tcp://localhost:8529 --server.username root --server.password ${ARANGO_ROOT_PASSWORD} --javascript.execute /init-final.js