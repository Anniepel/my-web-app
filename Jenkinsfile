pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'anniepel/my-web-app'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Make sure this matches your Jenkins credentials ID
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
                bat 'dir'  // For Windows agent
                // If you need npm build, uncomment below
                // bat 'npm install'
                // bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    bat "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Logging in and pushing Docker image..."
                    withDockerRegistry(credentialsId: "${DOCKER_CREDENTIALS_ID}", url: 'https://index.docker.io/v1/') {
                        bat "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Local Docker') {
            steps {
                echo "Deploy stage (add your deploy steps here)"
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded!"
        }
        failure {
            echo "Pipeline failed! Check logs."
        }
    }
}
