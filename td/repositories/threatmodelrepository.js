'use strict';
var url = require('../config/url.config.js').gitlabUrl
var gitlab = require('gitlab');
var threatmodelrepository = {};

threatmodelrepository.repos = function (page, accessToken, cb) {

    var client = gitlab({url:url,oauth_token:accessToken});
    client.projects.all(cb);
};

threatmodelrepository.branches = function (repoInfo, accessToken, cb) {
    console.log(repoInfo)
    var client = gitlab({url:url,oauth_token:accessToken});
    var params = {
        projectId: getRepoFullName(repoInfo)
    }
    client.projects.repository.listBranches(params.projectId, cb)
};

threatmodelrepository.models = function (branchInfo, accessToken, cb) {

    var client = gitlab({url:url,oauth_token:accessToken});
    console.log(branchInfo)
    client.projects.repository.listTree(getRepoFullName(branchInfo),{path: 'ThreatDragonModels/',ref:branchInfo.branch},cb)
};

threatmodelrepository.model = function (modelInfo, accessToken, cb) {

    var path = getModelPath(modelInfo);
    var client = gitlab({url:url,oauth_token:accessToken});
    client.projects.repository.showFile({projectId: getRepoFullName(modelInfo),file_path: getModelPath(modelInfo),ref:modelInfo.branch},cb)
};

threatmodelrepository.create = function (modelInfo, accessToken, cb) {

    var path = getModelPath(modelInfo);
    var client = gitlab({url:url,oauth_token:accessToken});
    var message = 'Created by OWASP Threat Dragon';
    var content = getModelContent(modelInfo);
    client.projects.repository.createFile({projectId:getRepoFullName(modelInfo),file_path: getModelPath(modelInfo),branch_name:modelInfo.branch,content: content, commit_message: message },cb)
};

threatmodelrepository.update = function (modelInfo, accessToken, cb) {
    threatmodelrepository.model(modelInfo, accessToken, function (content) {
        if(content){
            var path = getModelPath(modelInfo);
            var client = gitlab({url:url,oauth_token:accessToken});
            var message = 'Updated by OWASP Threat Dragon';
            var newContent = getModelContent(modelInfo);
            client.projects.repository.updateFile({projectId:getRepoFullName(modelInfo),file_path: getModelPath(modelInfo),branch_name:modelInfo.branch,content: newContent, commit_message: message },cb)            
        }
        else{
            console.log('err')
        }
    });
};

threatmodelrepository.deleteModel = function (modelInfo, accessToken, cb) {

    threatmodelrepository.model(modelInfo, accessToken, function (content) {
        if (content) {
            var path = getModelPath(modelInfo);
            var client = gitlab({url:url,oauth_token:accessToken});
            var message = 'Deleted by OWASP Threat Dragon';
            deleteModelHTTP(accessToken,getRepoFullName(modelInfo),modelInfo.branch,path,message,cb)
        }else{
            console.log('err')
        }
    });
};


//private functions

function getRepoFullName(info) {
    return info.organisation + '/' + info.repo;
}

function getModelPath(modelInfo) {
    return 'ThreatDragonModels/' + modelInfo.model + '/' + modelInfo.model + '.json';
}

function getModelContent(modelInfo) {
    return JSON.stringify(modelInfo.body, null, '  ');
}

// Manual HTTP API call to delete model
var request = require('request')
function deleteModelHTTP(accessToken, projectId, branch , path, message, cb) {
  var reqUrl= url + '/api/v4/projects/'+ encodeURIComponent(projectId) +'/repository/files/' + encodeURIComponent(path) + '?access_token=' + accessToken +'&branch=' + branch + '&commit_message=' + 'deleted'
  console.log(reqUrl)
  request({
    method: 'DELETE',
    uri: reqUrl
  },
  function (error, response, body) {
    console.log("LOGGG:  ", error, reqUrl, body)
    if (error) {
      cb('')
    }else{
      cb('success')  
    }
  })
}

module.exports = threatmodelrepository;