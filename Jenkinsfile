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
                bat 'dir'   // for Windows agent
                // Add npm build/test commands if needed
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.withServer('tcp://localhost:2375') { // or use npipe if Docker Desktop uses named pipe
                        echo "Building Docker image..."
                        def dockerImage = docker.build("${DOCKER_IMAGE}:latest", "--no-cache .")
                        
                        docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                            echo "Pushing Docker image to Docker Hub..."
                            dockerImage.push('latest')
                        }
                    }
                }
            }
        }

        stage('Deploy to Local Docker') {
            steps {
                echo "Deploying container locally..."
                bat """
                    docker stop my-web-app || echo "Container not running"
                    docker rm -f my-web-app || echo "No container to remove"
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

