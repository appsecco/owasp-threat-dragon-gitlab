# OWASP Threat Dragon #

This project is a fork of the original [OWASP Threat Dragon](https://github.com/mike-goodwin/owasp-threat-dragon) web application by Mike Goodwin with Gitlab integration instead of Github. You can use it with the [Gitlab.com](https://gitlab.com) or your own instance of Gitlab.

Gitlab will be used as the OAuth provider for authentication and for model storage. For integration with Gitlab, an application must be created in Gitlab. Refer to [this](https://docs.gitlab.com/ee/integration/gitlab.html) for detailed instructions. The Redirect URL is the externally accessible  url your users will be redirected to after authentication (Ex: `http://192.168.56.100:3000/oauth/gitlab`). For local test deployments, you can use `http://127.0.0.1:3000/oauth/gitlab`.

### Environment variables:

- CLIENT_ID : Application ID of the application in Gitlab
- CLIENT_SECRET : Application Secret of the application in Gitlab
- CALLBACK_URL : URL of Threat Dragon Application Gitlab will redirect to aka Reditect URL of your application
- GITLAB_URL : BaseUrl of your Gitlab instance
- SESSION_SECRET : Session secret for all user sessions
- ENCRYPTION_KEY : 256-bit Encryption key used to encrypt the stored sessions
- PORT: Port in which Threat Dragon Listens on (Default: 3000)

## Run a fully automated set up of Threat Dragon and Gitlab using docker:
This is intended for development and testing. Uses `run.sh` ,`apptoken.py` to obtain OAuth creadentials from Gitlab and start the application. Gitlab takes a while to startup, so please be patient.

1. Clone the respository
```
git clone https://github.com/appsecco/owasp-threat-dragon-gitlab.git
cd owasp-threat-dragon-gitlab
```
2. Create `.env` file like the following 
```
GITLAB_USER=root
GITLAB_PASSWORD=Sup3r_s3cur3_P4ssw0rd
CALLBACK_URL=http://127.0.0.1:3000/oauth/gitlab
APPLICATION_NAME=owasp-td-gitlab
GITLAB_ROOT_PASSWORD=Sup3r_s3cur3_P4ssw0rd
SESSION_SECRET=IO2oifsj029r892ohSFIH9infs
ENCRYPTION_KEY=VvB0iJHbXviWJyRsKeypTjNgxJ6ho8mT
```
3. Start the application with automated setup
```
docker-compose up
```

Access the applications on your system:
1. Threat Dragon: http://127.0.0.1:3000
2. Gitlab Server: http://127.0.0.1:3080

## Run using docker with existing Gitlab Server:

1. Clone the respository
```
git clone https://github.com/appsecco/owasp-threat-dragon-gitlab.git
cd owasp-threat-dragon-gitlab
```
2. Create `.env` file like the following
```
GITLAB_URL=https://gitlab.com
CLIENT_ID=5803ee75eac86cf99fcd61cbcb4f6ede2304b84181fd5e3fca356
CLIENT_SECRET=bc2f7f5474e6c9855613a8a2be141dbb2a05f83f5f96855613ab9
CALLBACK_URL=http://127.0.0.1:3000/oauth/gitlab
SESSION_SECRET=IO2oifsj029r892ohSFIH9infs
ENCRYPTION_KEY=VvB0iJHbXviWJyRsKeypTjNgxJ6ho8mT
```
3. Build the image and start the container
```
docker build -t td-gitlab . 
```
4. Start the container
```
docker run -p 3000:3000  --env-file .env --name td-gitlab td-gitlab
```

Visit http://127.0.0.1:3000 to access the application

## Run locally without docker:

1. Clone the respository
```
git clone https://github.com/appsecco/owasp-threat-dragon-gitlab.git
cd owasp-threat-dragon-gitlab
```
2. Setup Environment variables:
```
export GITLAB_URL=https://gitlab.com
export CLIENT_ID=5803ee75eac86cf99fcd61cbcb4f6ede2304b84181fd5e3fca356
export CLIENT_SECRET=bc2f7f5474e6c9855613a8a2be141dbb2a05f83f5f96855613ab9
export CALLBACK_URL=http://127.0.0.1:3000/oauth/gitlab
export SESSION_SECRET=IO2oifsj029r892ohSFIH9infs
export ENCRYPTION_KEY=VvB0iJHbXviWJyRsKeypTjNgxJ6ho8mT
```
3. Install dependencies:
```
npm install
```
4. Start Threat Dragon:
```
npm start
```

Visit http://127.0.0.1:3000 to access the application

Please feel free to make a pull request or tweet to me [@pingsns](https://twitter.com/pingsns) for improvements and suggestions.
