angular.module('starter.controllers', [])

.controller('PianoCtrl', function($scope, $ionicPlatform, $timeout, $cordovaNativeAudio, $cordovaVibration, $cordovaFile) {

  $scope.ruta = "";

$scope.Empezar=function(){
    $scope.Ver = true;

    $("#ion-cont").removeClass("fondo-inicio");
    $("#ion-cont").addClass("fondo-juego");


    /*$ionicPlatform.ready(function(){
      try{
        
        $cordovaFile.checkFile(cordova.file.externalDataDirectory, "rutamp3.txt")
          .then(function (success) {

            $cordovaFile.removeFile(cordova.file.externalDataDirectory, "rutamp3.txt")
              .then(function (success) {
                // success
              }, function (error) {
                // error
              });

          }, function (error) {
            
          });

      } catch(ex){
        console.log(ex.message);
      }

    });*/
  }


$ionicPlatform.ready(function() {

    try{

        $cordovaNativeAudio
          .preloadSimple('armonica', 'mp3/armonica.mp3')
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.log(error);
          });

    } catch(ex){
      console.log(ex);
    }


    try{
        $cordovaNativeAudio
          .preloadSimple('flauta', 'mp3/flauta.mp3')
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.log(error);
          });
    } catch(ex){
      console.log(ex);
    }


    try{
        $cordovaNativeAudio
          .preloadSimple('guitarra', 'mp3/guitarra.mp3')
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.log(error);
          });
    } catch(ex){
      console.log(ex);
    }


    try{
        $cordovaNativeAudio
          .preloadSimple('trombon', 'mp3/trombon.mp3')
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.log(error);
          });
    } catch(ex){
      console.log(ex);
    }


    try{
        $cordovaNativeAudio
          .preloadSimple('trompeta', 'mp3/trompeta.mp3')
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.log(error);
          });
    } catch(ex){
      console.log(ex);
    }


    try{
        $cordovaNativeAudio
          .preloadSimple('violin', 'mp3/violin.mp3')
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.log(error);
          });

    } catch(ex){
      console.log(ex);
    }
        
    });

  $scope.Sonar=function(queSuena){

    try{
      $cordovaNativeAudio.play(queSuena);
    } catch(ex){
      console.log(ex);
    }
    

    try{
        $cordovaVibration.vibrate(1000);
    } catch(ex){
      console.log(ex);
    }

    $scope.toco = true;
      switch(queSuena){

        case 'armonica':

          $("#armonica").addClass("girando");
          $scope.ruta += "mp3/armonica.mp3 - ";

        break;

        case 'flauta':

          $("#flauta").addClass("girando");
          $scope.ruta += "mp3/flauta.mp3 - ";

        break;

        case 'guitarra':

          $("#guitarra").addClass("girando");
          $scope.ruta += "mp3/guitarra.mp3 - ";

        break;

        case 'trombon':

          $("#trombon").addClass("girando");
          $scope.ruta += "mp3/trombon.mp3 - ";

        break;

        case 'trompeta':

          $("#trompeta").addClass("girando");
          $scope.ruta += "mp3/trompeta.mp3 - ";

        break;

        case 'violin':

          $("#violin").addClass("girando");
          $scope.ruta += "mp3/violin.mp3 - ";

        break;

        default:
        break;

      }

    $timeout(function(){
    $scope.toco = false;
    $("#armonica").removeClass("girando");
    $("#flauta").removeClass("girando");
    $("#guitarra").removeClass("girando");
    $("#trombon").removeClass("girando");
    $("#trompeta").removeClass("girando");
    $("#violin").removeClass("girando");

    }, 4000)


    $ionicPlatform.ready(function(){
      try{

        var arrayJson = $scope.ruta.split(" - ");
        var archivoJson = {
          ruta: arrayJson
        };
            /*$cordovaFile.writeExistingFile(cordova.file.externalDataDirectory, "rutamp3.txt", archivoJson)
                .then(function (success) {

                }, function (error) {
                  // error
                });*/
            
            $cordovaFile.createFile(cordova.file.externalDataDirectory, "rutamp3.txt", true)
              .then(function (success) {

              }, function (error) {

              });


            $cordovaFile.writeFile(cordova.file.externalDataDirectory, "rutamp3.txt", archivoJson, true)
              .then(function (success) {

              }, function (error) {

              });

      } catch(ex){
        console.log(ex.message);
      }
      


    });
  }

})

.controller('AutorCtrl', function($scope, $ionicPlatform, $cordovaInAppBrowser) {
  
  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

  $scope.VerGitHub=function(){
    $ionicPlatform.ready(function(){

      $cordovaInAppBrowser.open('https://github.com/fepe15', '_system', options);

    });
    
  }
  
})

 .controller('LecturaCtrl', function($scope, $ionicPlatform, $cordovaFile){

  $ionicPlatform.ready(function(){

    $scope.$on('$ionicView.enter', function(e) {
      $scope.contenido = "";
      try{
      $cordovaFile.checkFile(cordova.file.externalDataDirectory, "rutamp3.txt")
      .then(function (success) {
        
        $cordovaFile.readAsText(cordova.file.externalDataDirectory, "rutamp3.txt")
          .then(function (exito) {
            /*var cadenaExito = JSON.stringify(exito);
            alert(cadenaExito);  */
            var objJson = JSON.parse(exito);
            for(var i = 0; i < objJson.ruta.length - 1; i++){
              $scope.contenido += objJson.ruta[i] + "  ";
            };
            //$scope.contenido = JSON.stringify(objJson.ruta);

          }, function (error) {
            $scope.contenido = "El archivo solocitado no se pudo leer";
            var cadenaError = JSON.stringify(error);
            console.log(cadenaError);
          });



      }, function (error) {
        $scope.contenido = "El archivo solocitado no existe";
        var cadenaError = JSON.stringify(error);
        console.log(cadenaError);
      });

    } catch(ex){
      console.log(ex);
    }

    }); 
    

  })

})

