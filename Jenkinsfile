pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'anniepel/my-web-app'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Cloning repository..."
                checkout scm
            }
        }

        stage('Build Project') {
            steps {
                echo "Building the project..."
                bat 'dir'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.withServer('tcp://localhost:2375') {

                        echo "Building Docker image..."
                        def dockerImage = docker.build("${DOCKER_IMAGE}:latest")

                        withDockerRegistry([ 
                            credentialsId: "${DOCKER_CREDENTIALS_ID}", 
                            url: 'https://index.docker.io/v1/' 
                        ]) {
                            echo "Pushing image to Docker Hub..."
                            dockerImage.push("latest")
                        }
                    }
                }
            }
        }

        stage('Deploy to Local Docker') {
            steps {
                echo "Deploying container locally..."
                bat """
                    docker stop my-web-app || echo Not running
                    docker rm -f my-web-app || echo None to remove
                    docker run -d --name my-web-app -p 8090:3000 ${DOCKER_IMAGE}:latest
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed! Check logs."
        }
    }
}


