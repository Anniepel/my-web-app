pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Project') {
            steps {
                echo 'Building the project...'
                bat 'dir'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t anniepel/my-web-app:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging in and pushing Docker image...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD')]) {
                    bat "docker login -u %USERNAME% -p %PASSWORD% https://index.docker.io/v1/"
                    bat "docker push anniepel/my-web-app:latest"
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed! Check logs.'
        }
    }
}
