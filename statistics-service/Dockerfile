FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/statistics-service.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/statistics-service.jar"]

EXPOSE 9103