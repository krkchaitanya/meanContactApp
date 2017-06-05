var myApp=angular.module("myApp",[]);


myApp.controller("mainController",["$scope","$http","$filter",function($scope,$http,$filter){

$scope.inone="";

var refresh=function(){
$http.get("/meanGet").then(function(response){
console.log(response.data);
$scope.getcon=response.data;

});
};

var clearAll=function(){
  $scope.contact={
    email:"",
    name:""
  };
};

refresh();
$scope.addone=function(){
console.log($scope.contact);
$http.post("/meanPost", $scope.contact);
refresh();
clearAll();
};



$scope.remove=function(id){
  $http.delete("/meanDel/"+id);
  refresh();
};


$scope.edit=function(id){
  console.log(id);


$http.get("/meanGet/"+id).then(function(response){

console.log(response.data);
$scope.contact=response.data[0];

});

};


$scope.update=function(){

console.log($scope.contact._id);

$http.put("/meanUpdate/"+$scope.contact._id,$scope.contact).then(function(data){
  console.log(data);
  refresh();
  clearAll();
});

};

}]);
