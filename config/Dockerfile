FROM java:8-jre
MAINTAINER Siping Xu <sipingxu@gmail.com>

ADD ./target/config.jar /app/
CMD ["java", "-Xmx256m", "-jar", "/app/config.jar"]

HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8762/actuator/health || exit 1

EXPOSE 8762