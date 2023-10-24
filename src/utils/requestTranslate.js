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

    let urlTranslate = judgePorduction() ? 'http://productdev.yaheecloud.com/tool-api/translation/getAllTranslate':'http://api-tools-test.yahee.com.cn:82/tool-api/translation/getAllTranslate'
    await getAllTranslate(urlTranslate,'PMC').then(item => {
        let obj = {}
        for (let item1 in item.data.translateItems){
            obj[item.data.translateItems[item1].id] = item.data.translateItems[item1].str;
        }
        let data = JSON.stringify(obj);
        sessionStorage.setItem("translate" + item.data.language, data); 
    })
})()