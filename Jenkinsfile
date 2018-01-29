pipeline {
    agent any
    stages {
        stage('prepare') {
            steps {
                echo 'Installing Node Modules..'
                sh 'sudo npm install'
            }
        }
        stage('build') {
            steps {
                sh 'sudo npm run build'
            }
        }
        stage('ready-to-deploy') {
            steps {
                echo 'Ready to Deploy!'
            }
        }
    }
     post {
        success {
          echo 'posting success to GitLab'
        }
        failure {
          echo 'posting failure to GitLab'
        }
      }
}
