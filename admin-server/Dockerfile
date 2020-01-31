FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/admin-server.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/admin-server.jar"]

EXPOSE 9200