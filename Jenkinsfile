pipeline {
    agent any
    stages {
        stage('prepare') {
            steps {
                sh 'npm --version'
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
              updateGitlabCommitStatus(name: 'jenkins-build', state: 'success')
        }
        failure {
          echo 'posting failure to GitLab'
              updateGitlabCommitStatus(name: 'jenkins-build', state: 'failed')
        }
      }
}
