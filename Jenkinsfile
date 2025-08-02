pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Run k6 Load Test') {
            steps {
                sh "k6 run --vus ${USERS} --duration 30s sample.test.js"
            }
        }
    }
}
