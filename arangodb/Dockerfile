FROM arangodb:latest
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./init/init.sh /docker-entrypoint-initdb.d
ADD ./init/init.js /init.js
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

EXPOSE 8529
