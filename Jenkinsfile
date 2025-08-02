pipeline {
    agent any

    environment {
        SLACK_WEBHOOK_URL = credentials('slack-webhook-url')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/divyabharathirekhapalli/K6_AI_Framework.git'
            }
        }

        stage('Run k6 Load Test') {
            steps {
                sh 'k6 run sample.test.js > result.txt'
            }
        }

        stage('Send Results to Slack') {
            steps {
                script {
                    def result = readFile('result.txt')
                    def maxLength = 2800
                    if (result.length() > maxLength) {
                        result = result.take(maxLength) + "\n...truncated..."
                    }
                    result = result.replaceAll("\"", "\\\\\"")

                    def payload = """{
                        "text": "*✅ Load Test Completed*\n```$result```"
                    }"""

                    httpRequest(
                        httpMode: 'POST',
                        url: SLACK_WEBHOOK_URL,
                        contentType: 'APPLICATION_JSON',
                        requestBody: payload
                    )
                }
            }
        }
    }
}
