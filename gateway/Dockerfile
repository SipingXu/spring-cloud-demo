FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/gateway.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/gateway.jar"]

HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8763/actuator/health || exit 1

EXPOSE 8763