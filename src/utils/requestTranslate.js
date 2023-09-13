import { getEmployee,getAllTranslate,getTimeStamp} from '@/api/user.js';
import { judgePorduction } from '@/utils/tools';
(async function getAllTranslateList (){
    let language = {}
    await getEmployee().then(res => {
        if(res.data){
            language = res.data
            sessionStorage.setItem("employee", JSON.stringify(res.data));
        }
    })
    let urlStamp = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/translation/getTimeStamp' : 'http://api-tools-test.yahee.com.cn:82/tool-api/translation/getTimeStamp'
    getTimeStamp(urlStamp).then(res => {
        let translateList  = JSON.parse(sessionStorage.getItem("translate" + language.Language)) || [];
        let timeStamp = sessionStorage.getItem("timeStamp") != 'undefined' ? JSON.parse(sessionStorage.getItem("timeStamp")) : '';
        let urlTranslate = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/translation/getAllTranslate':'http://api-tools-test.yahee.com.cn:82/tool-api/translation/getAllTranslate'
        if(translateList.length == 0){
            getAllTranslate(urlTranslate,'ProductDev').then(item => {
                let data = JSON.stringify(item.data.translateItems);
                sessionStorage.setItem('timeStamp', JSON.stringify(res.data)); 
                sessionStorage.setItem("translate" + item.data.language, data); 
            })
        }
        if(translateList && timeStamp != res.data){
            getAllTranslate(urlTranslate,'ProductDev').then(item => {
                let data = JSON.stringify(item.data.translateItems);
                sessionStorage.setItem('timeStamp', JSON.stringify(res.data)); 
                sessionStorage.setItem("translate" + item.data.language, data); 
            })
        }
    })
})()