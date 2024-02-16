sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'listpage/test/integration/FirstJourney',
		'listpage/test/integration/pages/studentList',
		'listpage/test/integration/pages/studentObjectPage'
    ],
    function(JourneyRunner, opaJourney, studentList, studentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('listpage') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThestudentList: studentList,
					onThestudentObjectPage: studentObjectPage
                }
            },
            opaJourney.run
        );
    }
);