(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath',"https://coursera-jhu-default-rtdb.firebaseio.com/");

NarrowItDownController.$inject=['MenuSearchService','$scope'];
function NarrowItDownController(MenuSearchService,$scope){
  var menu=this;
  $scope.name="";

  menu.searchItem=function searchItem(searchterm){
    var info=$scope.name;
    console.log(info);
    var promise=MenuSearchService.getmenuitems(info);
    promise.then(function(response){
      menu.items=response.data;
    })
    .catch(function (error){
      console.log(error);
    })
    menu.removeItem=function removeItem(itemindex){
      menu.items.splice(itemindex,1)
    }
  }

}

function FoundItems(){
  var ddo={
    templateUrl:'foundItems.html',
    scope:{
      list:'=myList'
    }
  }
  return ddo;
}

MenuSearchService.$inject=['$http','ApiBasePath']
function MenuSearchService($http,ApiBasePath){
  var service=this;
  service.getmenuitems=function(searchterm){
    var response=$http({
      method:"GET",
      url:(ApiBasePath+"menu_items/"+searchterm+"/menu_items.json"),
      param:{
        short_name:searchterm
      }

    })
    return response;
  }
}



})();
