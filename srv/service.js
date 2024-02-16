const cds = require('@sap/cds');
const { log } = require('console');



module.exports = cds.service.impl(async function () {
    let {
        collegeAnalytics
    } = this.entities;

    const c5re = await cds.connect.to('iflow1');

    var data_recieved = true;

    // For college
    if (data_recieved == false) {
        this.before('READ', collegeAnalytics, async (req) => {

            debugger
            try {

                const resp = await c5re.get('/odata/v4/my/collegeAnalytics');

                console.log("Inside collegeAnalytic");
                const read_api = resp.value;

                var arr = [];

                // read_api.forEach(element => {
                //     arr.push({
                //         collegeId: resp.value[0].collegeId,
                //         collegeName: resp.value[1].collegeName,
                //         collegeType: resp.value[2].collegeType,
                //         collegeAnalytics.col
                //     })
                // });
                await INSERT.into(collegeAnalytics).entries(read_api);
                console.log(read_api);
            } catch (error) {
                console.log(error);
            }

        })
    }


    this.on('POST', collegeAnalytics, async (resp) => {
        debugger
        try {
            body = {
                collegeId: resp.data.collegeId,
                collegeName: resp.data.collegeName,
                collegeType: resp.data.collegeType,
                collegeAddress: resp.data.collegeAddress
            }
            await INSERT.into(collegeAnalytics).entries(resp.data);
            await c5re.post('/odata/v4/my/collegeAnalytics', body);
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    })


    this.on(['UPDATE'], collegeAnalytics, async (response) => {
        debugger
        try {
            body = {
                collegeId: response.data.collegeId,
                collegeName: response.data.collegeName,
                collegeType: response.data.collegeType,
                collegeAddress: response.data.collegeAddress
            }
            await UPDATE(collegeAnalytics)
                .set(body)
                .where({ collegeId: response.data.collegeId });

            const updateurl = `/odata/v4/my/collegeAnalytics(collegeId=${response.data.collegeId})`;
            await c5re.put(updateurl, body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    })

    this.on(['DELETE'], collegeAnalytics, async (deleteResopnse) => {
        debugger
        try {
            body = {
                collegeId: deleteResopnse.data.collegeId,
            }
            collegeId = deleteResopnse.data.collegeId;
            console.log(collegeId);
            console.log("Inside Delete reatched 92");
            await DELETE(collegeAnalytics)
                .where({ collegeId: deleteResopnse.data.collegeId });

            var convertedId = Math.max(Math.min(deleteResopnse.data.collegeId, 2147483647), -2147483648);

            console.log("Inside Delete reatched 96" + convertedId);
            const updateurl1 = `/odata/v4/my/collegeAnalytics(collegeId=${convertedId})`;
            await c5re.delete(updateurl1, body);
            console.log("Inside Delete reatched 99");
            return deleteResopnse.data;
        } catch (error) {
            console.log(error);
        }
    })
});

