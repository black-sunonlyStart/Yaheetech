
import { gethashCode,judgePorduction } from './tools.js'
import { addTranslate } from '@/api/user.js';
function M2(str){
    let employee = JSON.parse(sessionStorage.getItem("employee")) || {};
    let translateList = []
    let project = ''
    let strText = []
    let id = gethashCode(str)
    if(id == 0) return str
    translateList = JSON.parse(sessionStorage.getItem("translate" + employee.Language)) || [];
    if(translateList.length > 0) {
        strText = translateList.filter(item => {
            return item.id == id
        })
    }
    if(strText && strText.length > 0){
        return strText[0].str || str
    }else {
        project = JSON.parse(sessionStorage.getItem("timeStamp"));
        let params = {
            projectId: 'ProductDev',
            id,
            cn:str
        }
        let urlTranslate = judgePorduction() ? 'http://pmcfile.yaheecloud.com/tool-api/translation/addTranslate':'http://api-tools-test.yahee.com.cn:84/tool-api/translation/addTranslate'
        addTranslate(urlTranslate,params).then(res => {
            console.log(params,res.data)
        })
        return str
    }
}
export {
    M2
}