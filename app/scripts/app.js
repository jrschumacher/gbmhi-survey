
var app = angular.module('app', [
    'ngRoute',
    'mongolabResourceHttp',
    'ui.select2'
  ])

  .constant('MONGOLAB_CONFIG',{API_KEY:'89IQPVddauDIFW4KBsMTofH_ROwqLYU7', DB_NAME:'gbmhi'})

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/survey', {
        templateUrl: 'templates/survey.html',
        controller: 'SurveyCtrl',
        resolve: {
          survey: function(Survey) { return new Survey(); },
          organization: function(Organization) { return new Organization(); }
        }
      })
      .otherwise({
        templateUrl: 'templates/hello.html',
        controller: 'HelloCtrl'
      })

    $locationProvider
      .html5Mode(false);
  })

  .factory('Survey', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('surveys');
  })

  .factory('Organization', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('organizations');
  })

  .controller('HelloCtrl', function($scope) {
  })

  .controller('SurveyCtrl', function($scope, $location) {

    $scope.organization = {
      connections: []
    };

    $scope.curPage = 0;
    $scope.totalPages = 1;

    $scope.lastPage = function() {
      return $scope.curPage === $scope.totalPages + $scope.organization.connections.length;
    }

    $scope.serviceTags = {
      mentalHealth: "mental health and counseling",
      surgery: "surgery",
      primaryCare: "primary care",
      medicalSpecialty: "medical specialty services",
      spiritualCare: "spiritual care",
      medicationAccess: "medication access",
      healthPromotion: "health promotion",
      violencePrevention: "violence prevention",
      domesticViolence: "domestic violence survivor services",
      addictionRecovery: "addiction recovery",
      sexualReproductive: "sexual and reproductive health",
      insuranceCoverage: "insurance coverage",
      healthDisparities: "health disparities",
      healthcareAdministration: "healthcare administration",
      healthcarePolicy: "healthcare policy",
      infectiousDisease: "infectious disease control",
      medicalInterpretation: "medical interpretation",
      healthcareProfessional: "healthcare professional education",
      refugeeImmigrant: "refugee and immigrant health",
      culturalCompetence: "cultural competence training",
      other: "other"
    };

    $scope.addConnection = function() {
      $scope.organization.connections.push({
        name: '',
        address: '',
        collaborate: {}
      });
    };

    $scope.removeConnection = function() {
      $scope.organization.connections.pop();
    };

    $scope.addConnection();

    $scope.nextPage = function() {
      $scope.currentOrgConnection = {};
      $scope.curPage++;

      if($scope.curPage >= 1) {
        if(angular.isObject($scope.organization.connections[$scope.curPage - 1])) {
          $scope.currentOrgConnection = $scope.organization.connections[$scope.curPage - 1];
        }
        else if($scope.curPage === $scope.totalPages + $scope.organization.connections.length + 1) {
          $scope.organization.connections[$scope.curPage - 1] = {};
        }
      }

    };

    $scope.prevPage = function() {
      $scope.currentOrgConnection = {};
      $scope.curPage--;

      if($scope.curPage >= 0) {
        if(angular.isObject($scope.organization.connections[$scope.curPage - 1])) {
          $scope.currentOrgConnection = $scope.organization.connections[$scope.curPage - 1];
        }
        else {
          $scope.organization.connections[$scope.curPage - 1] = {};
        }
      }

    };

  })



// Boot angular
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});
