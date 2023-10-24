
import { gethashCode,judgePorduction } from './tools.js'
import { addTranslate } from '@/api/user.js';
function M2(str){
    let employee = JSON.parse(sessionStorage.getItem("employee")) || {};
    let translateList = []
    let strText = null
    let id = gethashCode(str)
    if(id == 0) return str
    translateList = JSON.parse(sessionStorage.getItem("translate" + employee.Language)) || [];
    if(employee.Language == 'zh-CN') return str
    // if(translateList.length > 0) {
    //     strText = translateList.filter(item => {
    //         return item.id == id
    //     })
    // }
    strText = translateList[id]
    if(strText){
        return strText
    }else {
        let  localStorageListId = localStorage.getItem('localStorageListId')
        if (localStorageListId) {
            localStorageListId = localStorageListId.split(',');
        } else {
            localStorageListId = [];
        }
        if (localStorageListId.some(n => n == id)) {
            return str;
        }
        localStorageListId.push(id)
        localStorage.setItem('localStorageListId', localStorageListId);
        let params = {
            projectId: 'PMC',
            id,
            cn:str
        }
        let urlTranslate = judgePorduction() ? 'http://pmcfile.yaheecloud.com/tool-api/translation/addTranslate':'http://api-tools-test.yahee.com.cn:84/tool-api/translation/addTranslate'
        addTranslate(urlTranslate,params).then(res => {
            if(res.code == 200 ){
                console.log(localStorageListId,'localStorageListId')
            }
        }) 
        return str
    }
}
export {
    M2
}