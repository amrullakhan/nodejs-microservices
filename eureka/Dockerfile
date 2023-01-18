FROM eclipse-temurin:17.0.4.1_1-jre AS build
WORKDIR extraced
ADD target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM eclipse-temurin:17.0.4.1_1-jre
WORKDIR application
COPY --from=build extraced/dependencies/ ./
COPY --from=build extraced/spring-boot-loader/ ./
COPY --from=build extraced/snapshot-dependencies/ ./
COPY --from=build extraced/application/ ./

EXPOSE 8761

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]