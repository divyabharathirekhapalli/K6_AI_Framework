pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Run k6 Test') {
            steps {
                sh 'k6 run sample.test.js'  // change script.js to your actual file name
            }
        }
    }
}
