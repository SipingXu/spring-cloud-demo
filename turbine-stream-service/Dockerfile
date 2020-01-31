FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/turbine-stream-service.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/turbine-stream-service.jar"]

HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:9202/actuator/health || exit 1

EXPOSE 9202