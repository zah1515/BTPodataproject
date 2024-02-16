using OdataProject as proj from '../db/schema';

service MyService {
    @odata.draft.enabled
    entity collegeAnalytics as projection on proj.collegeAnalytics;

}