console.clear();

var app = angular.module('CampaignApp', ['ngMaterial']);
app.controller('AppCtrl', function($scope){
    
    // BUSINESS
    $scope.businessTypes = ['Product', 'Service', 'Online'];
    
    // KEYWORDS
    // #TODO - get some better clickthrough and search volume values
    $scope.keywords = {
        'alpha': {
            ctr: 100,
            sv: 80
        },
        'beta': {
            ctr: 80,
            sv: 100
        },
        'gamma': {
            ctr: 60,
            sv: 40
        },
        'delta': {
            ctr: 60,
            sv: 100
        },
        'epsilon': {
            ctr: 20,
            sv: 40
        },
        'zeta': {
            ctr: 10,
            sv: 60
        }
    };
    $scope.toggleKeyword = function(keywordId) {
        var list = $scope.campaign.keywords,
            idx = list.indexOf(keywordId);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(keywordId);
        }
    };
    
    // RADIUS
    $scope.radiusNames = ['Small', 'Medium', 'Large'];
    
    // AD TYPES
    $scope.adTypes = ['Promotional', 'Inspirational', 'Call-to-action'];
    
    // QUALITY VS QUANTITY
    
    $scope.QVQ = {
        'quality': 50,
        'quantity': 50
    };
    
    // RESULTS
    $scope.results = {
        'rating': 1,
        'maxRating': 3,
        'clicks': 0
    };
    
    // Application state
    // The values the user has selected i.e. the 'shape' of the campaign.
    $scope.campaign = {
        'businessType' :'Product',
        'keywords' : [],
        'radius' : 1,
        'adType': 'Promotional'
    };
    
    // LOGIC
    $scope.$watch('campaign', function(oldVal, newVal) {
        console.log('campaign updated');
        $scope.updateQuality();
        $scope.updateQuantity();
    }, true);
    
    $scope.updateResults = function() {
        calculateRating();
        calculateClicks();
    }
    
    function _getRadiusQuality(type, radiusID) {
        // Product - small is 100%, medium is 75%, large is 25%
        // Service - small is 25%, medium is 100%, large is 75%
        // Online  - small and medium are 25%, large is 100% 
        var RADIUS_RULES = {
            'Product': [100, 75, 25],
            'Service': [25, 100, 75],
            'Online': [25, 25, 100]
        };
        return RADIUS_RULES[type][radiusID]; 
    }
    
    function _getAdTypeQuality(adType) {
        // Assume that each type of ad has a different quality value
        var AD_TYPE_RULES = {
            'Promotional': 33,
            'Inspirational': 66,
            'Call-to-action': 100
        };
        return AD_TYPE_RULES[adType];
    }
    
    $scope.updateQuality = function() {
        var campaign = $scope.campaign;
        
        // Keywords
        // Use the average CTR of the selected keywords.
        // TODO: come up with better logic for this.
        var total = 0, keywordQuality = 0;
        if(campaign.keywords.length) {
            campaign.keywords.forEach(function(word) {
               total += $scope.keywords[word].ctr;                             
            });
            keywordQuality = Math.round(total / campaign.keywords.length);
        }
        
        // Radius
        var radiusQuality = _getRadiusQuality(campaign.businessType, campaign.radius - 1); 
        
        // Ad type
        // Assume that each type of ad has a different quality value
        var adTypeQuality = _getAdTypeQuality(campaign.adType);
        
        $scope.QVQ.quality = Math.round((keywordQuality + radiusQuality + adTypeQuality) / 3);
    };
    
    $scope.updateQuantity = function() {
        var campaign = $scope.campaign;
        
        // Keywords
        // Use the average search volume of the selected keywords.
        // TODO: come up with better logic for this.
        var total = 0, keywordQuantity = 0;
        if(campaign.keywords.length) {
            campaign.keywords.forEach(function(word) {
               total += $scope.keywords[word].sv;                             
            });
            keywordQuantity = Math.round(total / campaign.keywords.length);
        }

        // Radius - larger radius will increase quantity
        var RADIUS_RULES = [33, 66, 100];
        var radiusQuantity = RADIUS_RULES[campaign.radius - 1]; 
        
        // Ad type
        // No effect on this slider
        
        $scope.QVQ.quantity = Math.round((keywordQuantity + radiusQuantity) / 2);
    };
    
    var WEIGHTINGS = {
        keywords: 0.5,
        radius: 0.25,
        adType: 0.25
    };
    
    function calculateRating() {
        console.log('calculate rating');
        
        var campaign = $scope.campaign;
        
        // Use the CTR for all keywords to find the max possible impressions 
        // then work out the % of this based on the keywords the user selected
        // TODO: use better data for this
        var maxTotalCTR = 0, selectedTotalCTR = 0;
        for(var id in $scope.keywords) {
            var word = $scope.keywords[id];
            maxTotalCTR += word.ctr;
            if(campaign.keywords.indexOf(id) > -1) selectedTotalCTR += word.ctr;
        };
        
        var keywordPercent = Math.round(selectedTotalCTR / maxTotalCTR * 100);
        
        
        // Radius - same as Quality rating
        var radiusQuality = _getRadiusQuality(campaign.businessType, campaign.radius - 1);
        
        // Ad type - same as Quality rating
        var adTypeQuality = _getAdTypeQuality(campaign.adType);
        
        var ratingPercent = ((keywordPercent * WEIGHTINGS.keywords)
                             + (radiusQuality * WEIGHTINGS.radius)
                             + (adTypeQuality * WEIGHTINGS.adType));
        
        var rating = Math.ceil(ratingPercent / (100 / $scope.results.maxRating));
        console.log(ratingPercent);

        $scope.results.rating = rating;
    };
    
    function calculateClicks() {
        // TODO
    };
    
  
});