pipeline {
  agent any
  // tools {nodejs "NODEJS"}
  stages {
    stage('Stop current running application') {
      steps {
        sh 'docker-compose down'
      }
    }
    stage('Get resources') {
      steps {
        sh 'docker-compose down'
        deleteDir()
        git branch: 'develop', credentialsId: 'cf0c89f1-2e4e-4a88-af7d-e85dda47350b', url: 'https://git.morsoftware.com/scm/ta/be-mor-talent-assessment.git'
        sh 'cp .env.dev .env'
      }
    }
    stage('Install dependencies') {
      steps {
        echo 'This feature is not implemented'
        // sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo 'This feature is not implemented'
      }
    }
    stage('Start Application') {
      steps {
        sh 'docker-compose up --build --force-recreate -d'
      }
    }
  }
  post {
    failure {
      sh 'docker-compose down'
      echo 'Processing failed'
    }
    success {
      echo 'Processing succeeded'
      echo 'Server is running on 192.168.0.82:4000'
    }
  }
}