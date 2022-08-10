# Node.js Global Mentoring Program
> ⚠️ This repo is still working in progress. Feel welcomed to contribute to it o/

Welcome to the Node.js Global Mentoring Program, this repository aims to have all the contents
and the structure, lectures and other materials for the program. 

## Folder Structure

### Homework
Inside this folder you will find all the files/projects that you should use/base yourself for the homeworks of each lecture.

#### Working with homework API Clients

All the API clients were added by running the following commands using [git-subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt):

add necessary remotes:

```shell
git remote add -f AngularClient git@github.com:EPAM-JS-Competency-center/shop-angular-cloudfront.git
git remote add -f ReactClient git@github.com:EPAM-JS-Competency-center/shop-react-redux-cloudfront.git
git remote add -f VueClient git@github.com:EPAM-JS-Competency-center/shop-vue-vuex-cloudfront.git
```

add subtrees:

```shell
git subtree add --prefix=Homework/Client/angular --squash AngularClient feat/Nodejs-GMP-client
git subtree add --prefix=Homework/Client/react --squash ReactClient feat/Nodejs-GMP-client
git subtree add --prefix=Homework/Client/vue --squash VueClient feat/Nodejs-GMP-client
```

Note, that for GPM purposes the `feat/Nodejs-GMP-client` branch was created in each repository accordingly.

If you wish to make changes to those repositories/branches you'll have two options:

1. Update a branch in an original repo. Push changes and then execute the following command:

```shell
git subtree pull --squash -P Homework/Client/[angular|react|vue] [AngularClient|ReactClient|VueClient] [feat/Nodejs-GMP-client|branchName]
```

E.g.:

```shell
git subtree pull --squash -P Homework/Client/angular AngularClient feat/Nodejs-GMP-client
```

_NB: you should commit all your changes before you proceed with updating subtree (API clients) directories/_

2. Contribute to a client app locally. Commit changes. Then execute the following command:

```shell
git subtree push -P Homework/Client/[angular|react|vue] [AngularClient|ReactClient|VueClient] [feat/Nodejs-GMP-client|branchName]
```

E.g.:

```shell
git subtree push -P Homework/Client/angular AngularClient feat/Nodejs-GMP-client
```

Check out [this](https://www.atlassian.com/git/tutorials/git-subtree) guide for more details.

_NB: to start working with subtree's updates you'll need to add origin(s) as it was shown above._

### Modules
We use [DocuSaurus](https://docusaurus.io/) as platform to document the modules related to the program. Check it's `README.md` inside this folder
in order to get to know more details about it.

### etc
Any extra materials would be added to etc **?**

## Contribute
If you find any `typo` or think that something could be improved or being done differently. Feel free to clone this repo
and open a `Merge Request` and the team will be glad to review and merge it.
