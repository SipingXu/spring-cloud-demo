FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/notification-service.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/notification-service.jar"]

EXPOSE 9102