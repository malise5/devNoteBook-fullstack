# ----------- Build Stage ------------
FROM maven:3.9-eclipse-temurin-17 AS build

LABEL maintainer="malise"

WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build the JAR file (skip tests to speed up builds)
RUN mvn clean package -DskipTests

# ----------- Runtime Stage ------------
FROM eclipse-temurin:17-jre

LABEL maintainer="malise"

WORKDIR /app

# Copy the built JAR from the build stage
#COPY --from=build /app/target/*-SNAPSHOT.jar app.jar

# Copy all target files first
COPY --from=build /app/target /app/target

# Dynamically find and rename the actual JAR file to app.jar
RUN cp /app/target/*.jar /app/app.jar


# Expose Spring Boot port
EXPOSE 8080

# Healthcheck using Spring Boot actuator
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the app with memory-aware JVM options
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
