
import { gethashCode,judgePorduction } from './tools.js'
import { getEmployee,getAllTranslate,getTimeStamp} from '@/api/user.js';
import { addTranslate } from '@/api/user.js';
// import { judgePorduction } from '@/utils/tools';
async function getAllTranslateList (that){
    let language = {}
    await getEmployee().then(res => {
        if(res.data){
            language = res.data
            sessionStorage.setItem("employee", JSON.stringify(res.data));
        }
    })
    if(language.Language == 'zh-CN') return that.renderDom = true
    let urlTranslate = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/translation/getAllTranslate':'http://api-tools-test.yahee.com.cn:82/tool-api/translation/getAllTranslate'
    await getAllTranslate(urlTranslate,'PMC').then(item => {
        let obj = {}
        for (let item1 in item.data.translateItems){
            obj[item.data.translateItems[item1].id] = item.data.translateItems[item1].str;
        }
        let data = JSON.stringify(obj);
        sessionStorage.setItem("translate" + item.data.language, data); 
        that.renderDom = true
    })
}

function M2(str){
    let employee = JSON.parse(sessionStorage.getItem("employee")) || {};
    let translateList = []
    let strText = null
    let id = gethashCode(str)
    if(id == 0) return str
    translateList = JSON.parse(sessionStorage.getItem("translate" + employee.Language)) || [];
    if(!translateList)return
    if(employee.Language == 'zh-CN') return str
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
                // console.log(localStorageListId,'localStorageListId')
            }
        }) 
        return str
    }
}
export {
    M2,
    getAllTranslateList
}