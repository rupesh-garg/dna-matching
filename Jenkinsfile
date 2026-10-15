
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        DOCKERHUB_CREDS = 'dockerhub-creds'
        IMAGE_NAME = 'rupeshgarg/dna-matching'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Build and Test') {
            steps {
                sh '''
                    test -f index.html
                    test -f style.css
                    test -f algorithm.js
                    docker run --rm \
                      -v "$WORKSPACE:/app" \
                      -w /app node:22-alpine \
                      node --check algorithm.js
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                      -t "$IMAGE_NAME:$BUILD_NUMBER" \
                      -t "$IMAGE_NAME:latest" .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DH_USER',
                        passwordVariable: 'DH_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x
                        echo "$DH_TOKEN" | docker login \
                          --username "$DH_USER" \
                          --password-stdin
                        docker push "$IMAGE_NAME:$BUILD_NUMBER"
                        docker push "$IMAGE_NAME:latest"
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh '''
                    sed "s|IMAGE_PLACEHOLDER|$IMAGE_NAME:$BUILD_NUMBER|g" \
                      k8s/deployment.yaml | kubectl apply -f -

                    kubectl apply -f k8s/service.yaml

                    kubectl rollout status deployment/dna-matching \
                      --timeout=180s

                    kubectl get pods
                    kubectl get deployments
                    kubectl get services
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Inspect the failing stage in Console Output.'
        }
    }
}
