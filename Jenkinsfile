pipeline {
    agent any

    parameters {
        string(name: 'USERS', defaultValue: '10', description: 'Number of virtual users')
    }

    environment {
        SLACK_BOT_TOKEN = credentials('slack-bot-token') // Use Jenkins credentials store
        SLACK_CHANNEL = '#social'
    }

    stage('Checkout Code') {
    steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
              url: 'https://github.com/divyabharathirekhapalli/K6_AI.git',
              credentialsId: 'github-https-token'
          ]]
        ])
    }
}

        stage('Run k6 Load Test') {
            steps {
                script {
                    def result = sh(
                        script: "k6 run --vus ${params.USERS} --duration 10s script.js",
                        returnStdout: true
                    ).trim()

                    // Extract a summary line from k6 output (adjust this to fit your script)
                    def summary = result.split('\n').find { it.contains('http_reqs') || it.contains('iterations') }

                    def message = ":white_check_mark: Load test completed with *${params.USERS}* users.\n```${summary}```"

                    // Send to Slack using Bot token
                    sh """
                        curl -X POST https://slack.com/api/chat.postMessage \
                        -H "Authorization: Bearer ${SLACK_BOT_TOKEN}" \
                        -H "Content-type: application/json" \
                        --data '{"channel":"${SLACK_CHANNEL}","text":"${message}"}'
                    """
                }
            }
        }
    }
}
