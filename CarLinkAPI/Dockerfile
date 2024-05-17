# Use a base image with Maven and JDK 17
FROM maven:3.9.6-eclipse-temurin-21-alpine as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy the pom.xml file first to leverage Docker layer caching
COPY pom.xml .

# Resolve dependencies
RUN mvn dependency:go-offline

# Copy the project source code
COPY src src

# Package the application, skipping tests for faster builds
RUN mvn clean package -DskipTests

# Use OpenJDK 17 to run the application
FROM openjdk:21-slim

# Copy the built application from the build environment
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
