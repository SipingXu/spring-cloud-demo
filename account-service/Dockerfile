FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/account-service.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/account-service.jar"]

EXPOSE 9101