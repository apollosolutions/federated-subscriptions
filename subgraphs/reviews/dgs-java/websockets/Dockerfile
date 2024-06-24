FROM gradle:8.2-jdk17 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle build --no-daemon

FROM openjdk:24-jdk-slim
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/review-graph.jar
ENTRYPOINT ["java","-jar","/app/review-graph.jar"]
