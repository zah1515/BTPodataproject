sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'colegeanalytic/test/integration/FirstJourney',
		'colegeanalytic/test/integration/pages/collegeAnalyticsList',
		'colegeanalytic/test/integration/pages/collegeAnalyticsObjectPage'
    ],
    function(JourneyRunner, opaJourney, collegeAnalyticsList, collegeAnalyticsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('colegeanalytic') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThecollegeAnalyticsList: collegeAnalyticsList,
					onThecollegeAnalyticsObjectPage: collegeAnalyticsObjectPage
                }
            },
            opaJourney.run
        );
    }
);