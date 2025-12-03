//TODO: This page is currrently managing the update of the google sheet using sheets.best api,
//this must be re-implemented to use the google sheet api directly

export const update_sheet = async(data:any)=>{
        //sheets.best connection url
        const url = "https://api.sheetbest.com/sheets/ec6a92c5-66d4-47ab-b1c5-c984623d8636"
        const json = JSON.stringify(data)

        const res = await fetch(url,{   
            method:"POST",
            headers: {
                "Content-type":"application/json"
            },
            body:json
        })
    }