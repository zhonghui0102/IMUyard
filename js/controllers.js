angular.module('starter.controllers', [])

/**
 *吐槽控制器
 */
    .controller('TucaoCtrl', function ($scope, $http,$rootScope,$state,$ionicHistory) {

        $scope.tucaoList = [];
        $scope.next = 0;
        $scope.moreDataCanBeLoaded = 1;
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        // 点赞
        $scope.xihuan=function (idd,index) {
            $scope.tucaoList[index].liked=true;
            $scope.tucaoList[index].like_num++;
            $http.get('http://119.28.16.18/tucao_like?data.tid=' + idd + '&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    console.log("已fasong");
                    if (response.data.status == 0) {
                        console.log("已喜欢");
                    }
                });



        }
        //上拉加载
        $scope.loadMore = function () {
            if($rootScope.login==1){

                $http.get('http://119.28.16.18/tucao_getList?data.offset=' + $scope.next + '&data.num=10&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.tucaoList = $scope.tucaoList.concat(response.data.data);
                        if ($scope.next == response.data.next) $scope.moreDataCanBeLoaded = 0;
                        $scope.next = response.data.next;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                });

            }
            else
            {
                $http.get('http://119.28.16.18/tucao_getList?data.offset=' + $scope.next + '&data.num=10')
                    .then(function (response) {
                        if (response.data.status == 0) {
                            $scope.tucaoList = $scope.tucaoList.concat(response.data.data);
                            if ($scope.next == response.data.next) $scope.moreDataCanBeLoaded = 0;
                            $scope.next = response.data.next;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    });

            }

        };



        $scope.doRefresh = function () {
           history.go(0);
            $scope.$broadcast('scroll.refreshComplete');
        }
    })

    /**
     *吐槽详情控制器
     */
    .controller('TucaoDetailCtrl', function ($scope, $stateParams, $http,$rootScope,$ionicHistory) {
        $scope.id = $stateParams.id;
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        //回车事件
        $scope.enterEvent = function(e) {
            console.log("回车！！！");
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.comment();
            }
        };
         // 点赞
        $scope.xihuana=function () {
            console.log($scope.id);
            $scope.item.liked = true;
            $scope.item.like_num++;
            $http.get('http://119.28.16.18/tucao_like?data.tid=' + $scope.id+ '&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    console.log("已fasong");
                    if (response.data.status == 0) {
                        console.log("已喜欢");


                    }
                });
        }
        $scope.deletetucao=function () {
            $http.get('http://119.28.16.18/tucao_delete?data.token=' +$rootScope.token+ '&data.tid='+$scope.id)
                .then(function (response) {
                    if (response.data.status == 0) {
                        alert("删除成功！");
                        $ionicHistory.goBack();
                        history.go(0);
                    }
                });
        }
        $scope.comment=function()
        {
            console.log("我被点击了");

            $http.get('http://119.28.16.18/tucao_addComment?data.tid=' + $scope.id+'&data.comment='+ $scope.data.publishtucaocomment+'&data.token='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;//发表评论成功！！！
                        console.log("发表评论成功了");
                        $scope.data.publishtucaocomment="";

                        $http.get('http://119.28.16.18/tucao_getItem?data.tid=' + $scope.id+'&data.selfToken='+$rootScope.token)
                            .then(function (response) {
                                console.log("zhixing");
                                if (response.data.status == 0) {
                                    $scope.item = response.data.data;
                                }
                            });

                    }
                });
        }
        if($rootScope.login==1){

            $http.get('http://119.28.16.18/tucao_getItem?data.tid=' + $scope.id+'&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    console.log("zhixing");
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                        console.log("zhixing233");
                        console.log($scope.id);
                    }
                });
        }
        else
        {
            $http.get('http://119.28.16.18/tucao_getItem?data.tid=' + $scope.id)
                .then(function (response) {
                    console.log("zhixing");
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                    }
                });
        }

    })

    /**
     *   我的吐槽控制器
     */
    .controller('Tucao-MyCtrl', function ($scope, $stateParams, $http,$rootScope,$window,$state) {
        $scope.goback=function(){
            $state.go("person");
            history.go(0);
        }
        $scope.tucaoListmy = [];
        $http.get('http://119.28.16.18/tucao_getSelf?data.selfToken='+$rootScope.token)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.tucaoListmy = response.data.data;
                }
            });

        // 点赞
        // 点赞
        $scope.xihuan=function (idd,index) {
            $scope.tucaoListmy[index].liked=true;
            $scope.tucaoListmy[index].like_num++;
            $http.get('http://119.28.16.18/tucao_like?data.tid=' + idd + '&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    console.log("已fasong");
                    if (response.data.status == 0) {
                        console.log("已喜欢");
                    }
                })}
        $scope.deletetucao=function (idd) {
            $http.get('http://119.28.16.18/tucao_delete?data.token=' +$rootScope.token+ '&data.tid='+idd)
                .then(function (response) {
                    if (response.data.status == 0) {
                        alert("删除成功！");
                        $window.location.reload();
                    }
                });
        }
    })

    /**
     *   咨询控制器
     */
    .controller('AskCtrl', function ($scope, $stateParams, $http,$rootScope,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $rootScope.askList = [];
        $http.get('http://119.28.16.18/ask_getList')
            .then(function (response) {
                if (response.data.status == 0) {
                    $rootScope.askList = response.data.data;
                }
            });

        $scope.doRefresh = function () {

            history.go(0);
            $scope.$broadcast('scroll.refreshComplete');
        }
    })

    /**
     *   咨询详情控制器
     */
    .controller('AskDetailCtrl', function ($scope, $stateParams, $http,$rootScope,$state,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.id = $stateParams.id;
        //回车事件
        $scope.enterEvent = function(e) {
            console.log("回车！！！");
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.answer();
            }
        };
        $http.get('http://119.28.16.18/ask_getByAid?aid=' + $scope.id+"&token="+$rootScope.token )
            .then(function (response) {
                if (response.data.status == 0) {
                    console.log("请求问题成功");

                    $scope.question=response.data.data;
                    console.log( $scope.question);
                }
            });
        $http.get('http://119.28.16.18/ask_getAnswers?aid=' + $scope.id)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.item = response.data.data;
                    console.log("请求回答成功");
                    console.log( $scope.item);
                }
            });

        $scope.deleteask=function (aid) {
            $http.get('http://119.28.16.18/ask_delete?aid='+ $scope.id+'&token='+ $rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        alert("删除成功！");
                        $ionicHistory.goBack();
                        history.go(0);
                    }
                });

        };
        $scope.answer=function()
        {
            $http.get('http://119.28.16.18/ask_addAnswer?aid=' + $scope.id+'&token='+$rootScope.token+'&detail=' +$scope.data.inputanswer)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;//回答问题成功！！！
                        console.log("回答问题成功了");
                        $scope.data.inputanswer="";
                        


                        $http.get('http://119.28.16.18/ask_getByAid?aid=' + $scope.id+"&token="+$rootScope.token )
            .then(function (response) {
                if (response.data.status == 0) {
                    console.log("请求问题成功");

                    $scope.question=response.data.data;
                    console.log( $scope.question);
                }
            });
        $http.get('http://119.28.16.18/ask_getAnswers?aid=' + $scope.id)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.item = response.data.data;
                    console.log("请求回答成功");
                    console.log( $scope.item);
                }
            });
                    }
                });
        }

    })
    /**
     *   我的咨询控制器
     */
    .controller('Ask-MyCtrl', function ($scope, $stateParams, $http,$rootScope,$window,$state) {
        $scope.goback=function(){
            $state.go("person");
            history.go(0);
        }
        $rootScope.askList = [];
        $http.get('http://119.28.16.18/ask_getSelf?token='+$rootScope.token)
            .then(function (response) {
                if (response.data.status == 0) {
                    $rootScope.askList = response.data.data;
                }
            });

        $scope.deleteask = function (aid) {

            $http.get('http://119.28.16.18/ask_delete?aid='+aid+'&token='+ $rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                      alert("删除成功！");
                        $window.location.reload();
                    }
                });

        }


        $scope.doRefresh = function () {

            $http.get('http://119.28.16.18/ask_getSelf&token='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $rootScope.askList = response.data.data;
                    }
                });
            $scope.$broadcast('scroll.refreshComplete');
        }
    })


    /**
     *   通知控制器
    */
    .controller('NotifyCtrl', function ($scope, $http,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }

        $scope.notifyList = [];

        $http.get('http://119.28.16.18/notification_getList')
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.notifyList = response.data.data;
                }
            });

        $scope.doRefresh = function () {
            $scope.next = 0;
            $scope.notifyList = [];
            $scope.moreDataCanBeLoaded = 1;
            $http.get('http://119.28.16.18/notification_getList')
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.notifyList = response.data.data;
                    }
                });
            $scope.$broadcast('scroll.refreshComplete');
        }
    })
    /**
     *   通知详情控制器
     */
    .controller('NotifyDetailCtrl', function ($scope, $stateParams, $http,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }

        $scope.oid = $stateParams.oid;
        $http.get('http://119.28.16.18/notification_getByOid?oid=' + $scope.oid)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.item = response.data.data;
                }
            });
    })

    /**
     *   搜索咨询控制器
     */
    .controller('Search-AskCtrl', function ($scope, $stateParams, $http,$rootScope,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }

        $scope.data=[];
        $scope.askList=[];
        //回车事件
        $scope.enterEvent = function(e) {
            console.log("回车！！！");
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.search();
            }
        };
        $scope.search=function()
        {  $http.get('http://119.28.16.18/ask_search?key=' + $scope.data.keysearch)
            .then(function (response) {
                $rootScope.ifzixun=1;
                if (response.data.status == 0) {
                    $scope.askList = response.data.data;
                    if(response.data.data.length==0)
                        $rootScope.ifzixun=0;
                }
            });
        }
    })
    /*
	 * 登录控制器
	 */
    .controller('LoginCtrl', function ($scope, $stateParams, $http,$state,$rootScope,$ionicHistory) {
        $scope.data=[];
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.loginfun=function()
        {
            console.log( $scope.data.loginusername);
            $http.get('http://119.28.16.18/user_login?name=' + $scope.data.loginusername + '&password=' + hex_md5($scope.data.loginpassword))
                .then(function (response) {
                    if (response.data.status == 0) {
                        var storage = window.localStorage;
                        storage.setItem("token", response.data.token);
                        storage.setItem("login",1);
                        $rootScope.token=response.data.token;
                        $rootScope.login=1;
                        $rootScope.voidname=0;
                        $rootScope.wrongcode=0;
                        $state.go("tab.tucao");
                        $window.location.reload();
                    }
                    else if (response.data.status == 203) {
                        $rootScope.voidname=1;
                    }
                    else if (response.data.status == 204) {
                        $rootScope.wrongcode=1;
                    }
                });


        }
    })
    /*
	 * 登录fabiao控制器
	 */
    .controller('LoginfabiaoCtrl', function ($scope, $stateParams, $http,$state,$rootScope,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.data=[];
        $scope.loginfun=function()
        {
            $http.get('http://119.28.16.18/user_login?name=' + $scope.data.loginusername + '&password=' + hex_md5($scope.data.loginpassword))
                .then(function (response) {
                    if (response.data.status == 0) {
                        var storage = window.localStorage;
                        storage.setItem("token", response.data.token);
                        storage.setItem("login",1);
                        $rootScope.token=response.data.token;
                        $rootScope.login=1;
                        $rootScope.voidname=0;
                        $rootScope.wrongcode=0;
                        $ionicHistory.goBack();
                    }
                    else if (response.data.status == 203) {
                        $rootScope.voidname=1;
                    }
                    else if (response.data.status == 204) {
                        $rootScope.wrongcode=1;
                    }
                });


        }
    })

	/*
	 * 注册控制器
	 */
	.controller('EnrollCtrl', function ($scope, $stateParams, $http,$state,$rootScope,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.data=[];
        $scope.data.sexSelect="0";
        $scope.enrollfun = function ()
        {
            console.log( $scope.data.sexSelect);
             $http.get('http://119.28.16.18/user_register?name=' + $scope.data.enrollusername + '&password=' + hex_md5($scope.data.enrollpassword) + '&gender='+$scope.data.sexSelect )
              .then(function (response) {
                 if (response.data.status == 0) {
                    var storage = window.localStorage;
                     $rootScope.samename=0;
                     storage.setItem("token", response.data.token);
                     storage.setItem("login",1);
                     $rootScope.token=response.data.token;
                     $rootScope.login=1;
                     $state.go("tab.tucao");
                     history.go(0);
                    console.log(storage.getItem("token"));
                     $scope.data.enrollusername="";
                     $scope.data.enrollpassword="";

                }
                  else if (response.data.status == 201) {
                     $rootScope.samename=1;
                  }
            });
        }
    })
    /*
	 * 发表吐槽页面控制器
	 */
    .controller('PublishTucaoCtrl', function ($scope, $stateParams, $http,$rootScope,$state,$window,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.data=[];
        $scope.fabiaotucaofun=function(){
            $http.get('http://119.28.16.18/tucao_add?data.token='+$rootScope.token+'&data.content='+$scope.data.fabiaotucao)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                        $scope.data.fabiaotucaofun="";
                        history.go(-1);
                        history.go(0);
                        //$window.location.reload();

                    }
                    history.go(-1);
                    history.go(0);
                });
        }
    })

    /*
     * 发表咨询页面控制器
     */
    .controller('PublishZixunCtrl', function ($scope, $stateParams, $http,$rootScope,$state,$window,$ionicHistory) {
        $scope.data=[];
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.fabiaozixun=function(){

            $http.get('http://119.28.16.18/ask_add?title=null&detail='+$scope.data.fabiaozixun+'&token='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                        $scope.data.fabiaozixun="";
                        history.go(-1);
                        history.go(0);
                        //$window.location.reload();
                    }
                    history.go(-1);
                    history.go(0);

                });
        }
    })
    /*
         * 个人中心控制器
         */
    .controller('PersonCtrl', function ($scope, $stateParams, $http,$state,$rootScope,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $http.get('http://119.28.16.18/user_getInfo?token='+$rootScope.token)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.item = response.data.data;
                }
            });
        $scope.fanhui=function () {
            $state.go("tab.tucao");
        }
        $scope.quitlogin=function () {
            var storage = window.localStorage;
            storage.clear();
            $rootScope.login=0;
            $rootScope.token="";
            $state.go("tab.tucao");
        }
    })
    /*
     * 上传头像页面控制器
     */
    .controller('ChangePicCtrl', function ($scope, $http, $timeout,$rootScope,$window,$state,$ionicHistory) {
        $scope.goback=function(){
            $ionicHistory.goBack();
        }
        $scope.uppic = function() {
            var fd = new FormData();
            var file = document.querySelector('input[type=file]').files[0];
            fd.append('token', $rootScope.token);
            fd.append('file', file);
            $http({
                method:'POST',
                url:"http://119.28.16.18/user_setAvatar",
                data: fd,
                headers: {'Content-Type':undefined},
                transformRequest: angular.identity
            })
                .success( function ( response )
                {
                    //上传成功的操作
                    $ionicHistory.goBack();
                    history.go(0);
                });

        }
})
    //关于我们控制器
        .controller('callOwnCtrl', function ($scope, $http,$ionicHistory) {
            $scope.goback=function(){
                $ionicHistory.goBack();
            }
        })



	