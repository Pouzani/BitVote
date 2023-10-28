pipeline {
    agent any
    tools {
        // Utilisation de l'outil Maven test
        maven 'maven-3.9.5'
        dockerTool 'Docker'
    }
    stages {
        stage('Change Working Directory') {
            steps {
                script {
                    // Change the working directory to the 'backend' folder
                    dir('Back-end') {
                        // You are now in the 'back-end' folder
                        echo "testing the app ..."
                        sh 'mvn test'
                    }
                }
            }
        }

        stage("build jar") {
            steps {
                script {
                    dir('Back-end') {
                        echo "building the app ..."
                        sh 'mvn package -DskipTests'
                    }
                }
            }
        }

        stage("build image") {
            steps {
                script {
                    dir('Back-end'){
                    echo "building the docker image ..."
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'PASSWORD', usernameVariable: 'USER')]) {
                        sh 'docker build -t pouzani/bitvote-backend:1.0 .'
                        sh 'docker login -u $USER -p $PASSWORD'
                        //sh "echo $PASSWORD | docker login -u $USER --password-stdin"
                        sh 'docker push pouzani/bitvote-backend:1.0'
                    }
                    }
                }
            }
        }

        stage("deploy image") {
            steps {
                script {
                    echo "deploy the image ..."
                    def dockerDownCmd = "docker-compose down"
                    def dockerUpCmd = "docker-compose up -d"
                    //On doit se connecter à dockerhub dans le serveur
                    sshagent(['ec2-dev-server']) {
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@35.181.48.145 ${dockerDownCmd}"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@35.181.48.145 ${dockerUpCmd}"
                }
            }
        }
    }
}
}
