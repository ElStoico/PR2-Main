# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:21-jre-alpine

# Copy the JAR file to the container
COPY target/cuponservice-0.0.1-SNAPSHOT.jar cuponservice-0.0.1-SNAPSHOT.jar

# Run the application
ENTRYPOINT [ "java","-jar","cuponservice-0.0.1-SNAPSHOT.jar" ]