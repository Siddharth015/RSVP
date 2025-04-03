# Use an official OpenJDK runtime as a base image
FROM openjdk:21-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/*.jar app.jar

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
