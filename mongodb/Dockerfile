FROM mongo:3.4
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD init.sh /init.sh
ADD ./dump /

RUN \
 chmod +x /init.sh && \
 apt-get update && apt-get dist-upgrade -y && \
 apt-get install dos2unix -y -q && \
 apt-get install psmisc -y -q && \
 apt-get autoremove -y && apt-get clean && \
 rm -rf /var/cache/* && rm -rf /var/lib/apt/lists/* && \
 dos2unix -n /init.sh /initx.sh && chmod +x /initx.sh

ENTRYPOINT ["/initx.sh"]
