# This script is to automate the Application Token generation and configuration

import requests
import os,time
from bs4 import BeautifulSoup

baseUrl = os.environ['GITLAB_URL']
username = os.environ['GITLAB_USER']
password = os.environ['GITLAB_PASSWORD']
appName = os.environ['APPLICATION_NAME']
redirectUrl = os.environ['CALLBACK_URL']
appTrusted = '0'
url_login = baseUrl + '/users/sign_in'
url_application = baseUrl + '/profile/applications'
r = requests.Response()

def get_token(r):
	soup = BeautifulSoup(r.text, "lxml")
	metas = soup.find_all('meta')
	authenticity_token = [ meta.attrs['content'] for meta in metas if 'name' in meta.attrs and meta.attrs['name'] == 'csrf-token' ]
	return authenticity_token[0]

def set_app_env(r):
	soup = BeautifulSoup(r.text, "lxml")
        print 'CLIENT_ID=' + soup.find("code", {"id":"application_id"}).text
        print 'CLIENT_SECRET=' + soup.find("code", {"id":"secret"}).text
        print 'GITLAB_URL=' + baseUrl
    
if username=='root':
	url_application = baseUrl + '/admin/applications'
	appTrusted = '1'

s = requests.Session()
counter = 0
while (r.status_code!=200 and counter<120):
	try:
		r = s.get(url_login)
	except:
		pass
	time.sleep(5)
	counter+=1


s.post(url_login,data = {'utf8':'%E2%9C%93', 'user[login]': username,'user[password]':password,'user[remember_me]':'0','authenticity_token':get_token(r)})
r = s.get(url_application)
r = s.post(url_application, data= {'utf8':'%E2%9C%93', 'authenticity_token': get_token(r), 'doorkeeper_application[name]': appName, 'doorkeeper_application[redirect_uri]': redirectUrl, 'doorkeeper_application[trusted]': appTrusted })
set_app_env(r)
