# DNA Matching: CI/CD Deployment

## Project Overview

DNA Matching is a web application built using HTML, CSS, and JavaScript. This project demonstrates automated application delivery using Jenkins, Docker, Docker Hub, and Kubernetes.

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Web server: Nginx
- Version control: Git and GitHub
- CI/CD: Jenkins
- Containerization: Docker
- Container registry: Docker Hub
- Deployment: Kubernetes on Minikube
- Cloud infrastructure: AWS EC2

## CI/CD Pipeline

1. **Checkout:** Jenkins retrieves the source code from GitHub.
2. **Build and Test:** The pipeline verifies required files and checks JavaScript syntax.
3. **Docker Build:** A container image is created using the Dockerfile.
4. **Push Image:** Jenkins publishes versioned images to Docker Hub using stored credentials.
5. **Deploy:** Kubernetes Deployment and Service manifests are applied to Minikube.
6. **Verification:** Jenkins waits for the Deployment rollout and checks Kubernetes resources.

## Deployment Architecture

GitHub → Jenkins on AWS EC2 → Docker Hub → Minikube → DNA Matching Web Application

## Redeployment Demonstration

After the first successful pipeline execution, a visible change was made to the source code and pushed to GitHub. The pipeline was executed again to build and publish a new image and deploy the updated application.

## Access and Verification

The application is accessed through the configured EC2 public IP and port-forwarding service. Kubernetes resources are verified using kubectl.

## Security

Docker Hub and GitHub credentials are stored in Jenkins Credentials rather than committed to the source repository.