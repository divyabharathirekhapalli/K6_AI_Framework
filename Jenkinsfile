pipeline {
    agent any

    environment {
        SLACK_WEBHOOK_URL = credentials('slack-webhook-url') // DO NOT add `as String` here
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
                    def webhook = SLACK_WEBHOOK_URL as String  // do casting here safely

                    def result = readFile('result.txt')
                        .take(2800)
                        .replace('\\', '\\\\')
                        .replace('"', '\\"')
                        .replace('`', "'")
                        .replace('\r', '')
                        .replace('\n', '\\n')

                    def payload = """
                    {
                      "text": "*✅ k6 Load Test Completed*\n```$result```"
                    }
                    """

                    httpRequest(
                        httpMode: 'POST',
                        url: webhook,
                        contentType: 'APPLICATION_JSON',
                        requestBody: payload
                    )
                }
            }
        }
    }
}
