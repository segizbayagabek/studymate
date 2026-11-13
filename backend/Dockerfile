# Step 1: build the Spring Boot jar with Maven
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# The cache mount keeps downloaded Maven libraries between builds
RUN --mount=type=cache,target=/root/.m2 mvn -B -q package -DskipTests

# Step 2: run the jar on a small Java runtime image
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
