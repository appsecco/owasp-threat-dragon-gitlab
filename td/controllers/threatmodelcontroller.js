'use strict';
var repository = require('../repositories/threatmodelrepository');
var threatmodelcontroller = {};
var demoModel = require('../helpers/demo.helper')

threatmodelcontroller.repos = function (req, res) {
    
    var page = req.query.page || 1;
    repository.repos(page, req.user.accessToken, function (repos) {
        if (repos) {
            var responseRepos = [];
            repos.forEach(function (repo, index) {
                responseRepos[index] =  repo.path_with_namespace;
            });
            res.send({repos: responseRepos, pagination: getPagination(req.headers, page)});
        } else {
            res.status(err.statusCode || 500).json(err);
        }
    });
};

threatmodelcontroller.branches = function (req, res){
    
    var repoInfo = {
        organisation: req.params.organisation,
        repo: req.params.repo,
        page: req.query.page || 1
    };
    
    repository.branches(repoInfo, req.user.accessToken, function(branches) {
        if(branches) {
            var responseBranches = [];
            branches.forEach(function (branch, index) {
                responseBranches[index] = branch.name;
            });
            res.send({branches: responseBranches, pagination: getPagination(req.headers, repoInfo.page)});
        } else {
            res.status(err.statusCode || 500).json(err);
        }     
    }); 
};

threatmodelcontroller.models = function (req, res){
    
    var branchInfo = {
        organisation: req.params.organisation,
        repo: req.params.repo,
        branch: req.params.branch
    };
    
    repository.models(branchInfo, req.user.accessToken, function(models) {
        if(models) {
            var responseModels = [];
            models.forEach(function (model, index) {
                responseModels[index] = model.name;
            });
            res.send(responseModels);
        } else {
            res.status(500).json("error");
        }     
    }); 
};
 
threatmodelcontroller.model = function (req, res) {
    var modelInfo = {
        organisation: req.params.organisation,
        repo: req.params.repo,
        branch: req.params.branch,
        model: req.params.model
    };

    if ((modelInfo.organisation=="td-demo-model-org")&&(modelInfo.repo=="owasp-threat-dragon-demo")&&(modelInfo.branch=="master")&&(modelInfo.model="Demo Threat Model")){
        demoModel(res)
    }else{
        repository.model(modelInfo, req.user.accessToken, function (data) {
            if (data) {
                var model= (new Buffer(data.content, 'base64')).toString();
                res.send(model);
            } else {
                res.status(500).json("err");
            }
        });       
    }
};

threatmodelcontroller.create = function(req, res) {
    var modelInfo = {
        organisation: req.params.organisation,
        repo: req.params.repo,
        branch: req.params.branch,
        model: req.params.model,
        body: req.body        
    };
    
    repository.create(modelInfo, req.user.accessToken, function (data) {
        if (data) {
            res.send(data);
        } else {
            res.status(500).send('err');
        }        
    }); 
};

threatmodelcontroller.update = function(req, res) {
    var modelInfo = {
        organisation: req.params.organisation,
        repo: req.params.repo,
        branch: req.params.branch,
        model: req.params.model,
        body: req.body        
    };
    
    repository.update(modelInfo, req.user.accessToken, function (data) {
        if (data) {
            res.send(data);
        } else {
            res.status(500).send('err');
        }        
    }); 
};

threatmodelcontroller.deleteModel = function(req, res) {
    var modelInfo = {
        organisation: req.params.organisation,
        repo: req.params.repo,
        branch: req.params.branch,
        model: req.params.model,      
    };
    
    repository.deleteModel(modelInfo, req.user.accessToken, function (data) {
        if (data) {
            res.send(data);
        } else {
            res.status(500).json('err');
        }        
    }); 
};

//private methods
function getPagination(headers, page) {
    
    var pagination = { page: page, next: false, prev: false };
    var linkHeader = headers.link;
    
    if(linkHeader) {
        
        linkHeader.split(',').forEach(function(link) {
           if (isLinkType('"next"')) {
               pagination.next = true;
           }
           
           if (isLinkType('"prev"')) {
               pagination.prev = true;
           }
           
           function isLinkType(type) {
               return link.split(';')[1].split('=')[1] === type;
           }
        });
    }
    
    return pagination;  
}
 
module.exports = threatmodelcontroller;