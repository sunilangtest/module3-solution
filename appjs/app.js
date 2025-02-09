(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath',"https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");

NarrowItDownController.$inject=['MenuSearchService','$scope'];
function NarrowItDownController(MenuSearchService,$scope){
  var menu=this;
  $scope.name="";

  menu.searchItem=function searchItem(searchterm){
    var info=$scope.name;
    var mentitemsinfo=[];
    console.log(info);
    var promise=MenuSearchService.getmenuitems(info);
    promise.then(function(response){
      if(response.data != null && response.data !=undefined && Object.keys(response.data).length >0){
        for (var i=0;i<Object.keys(response.data).length;i++){
          for (var j=0;j<response.data[Object.keys(response.data)[i]].menu_items.length;j++){
          mentitemsinfo.push(  response.data[Object.keys(response.data)[i]].menu_items[j])
        }
        }
      }

      if(mentitemsinfo != null && mentitemsinfo.length >0 && info.trim() !=""){
      menu.items=mentitemsinfo.filter(a=>a.description.includes(info));
    }
    else {
      menu.items=[];
    }
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
      url:(ApiBasePath),
      param:{
        short_name:searchterm
      }

    })

    return response;
  }
}



})();
