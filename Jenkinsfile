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
                        .take(2800) // Trim to avoid Slack's max message limit
                        .replace('\\', '\\\\')      // Escape backslashes
                        .replace('"', '\\"')        // Escape double quotes
                        .replace('`', "'")          // Avoid Slack markdown issue
                        .replace('\r', '')          // Remove carriage returns
                        .replace('\n', '\\n')       // Escape newlines

                    def payload = """
                    {
                      "text": "*✅ k6 Load Test Completed*\n```$result```"
                    }
                    """

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
