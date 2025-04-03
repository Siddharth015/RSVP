# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper files
COPY mvnw mvnw
COPY .mvn .mvn

# Grant execute permissions to the Maven wrapper
RUN chmod +x mvnw

# Copy the project files
COPY pom.xml .
COPY src src

# Install Maven dependencies and build the project
RUN ./mvnw clean install -DskipTests

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "target/RSVP-0.0.1-SNAPSHOT.jar"]
