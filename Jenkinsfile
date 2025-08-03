pipeline {
    agent any

    environment {
        SLACK_WEBHOOK_URL = credentials('https://hooks.slack.com/services/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') // Slack webhook from Jenkins credentials
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
                    // Read the result file and format it for Slack
                    def result = readFile('result.txt')
                        .take(2500)                              // Trim to avoid exceeding Slack limit
                        .replaceAll('`', "'")                    // Replace backticks with apostrophes
                        .replaceAll("\\\\", "\\\\\\\\")          // Escape backslashes
                        .replaceAll("\"", "\\\\\"")              // Escape double quotes
                        .replaceAll("\r", "")                    // Remove carriage returns
                        .replaceAll("\n", "\\n")                 // Escape newlines

                    def payload = """
                    {
                      "text": "*✅ Load Test Completed with k6*\n\\n*Results:*\n```$result```"
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
