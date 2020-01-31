FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/auth-service.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/auth-service.jar"]

EXPOSE 9100