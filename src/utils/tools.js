/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
 import { Message } from 'element-ui';
 import { jsonp } from 'vue-jsonp'

 function createUniqueString () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }
  
  /**
   * 数字存储大小格式化
   * @param {number} num 存储大小 单位：Byte
   * @param {number} digits 保留几位小数
   * @return {string} 2MB
   */
  function toStorage (num, digits) {
    digits = digits || 2
    if (num < 1024) {
      return num + 'B'
    }
    num = (num * 1000 / 1024)
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'K' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
          si[i].symbol + 'B'
      }
    }
  }

  function formatDate(date, fmt) {
	date = new Date(date);
	if (typeof(fmt) === "undefined") {
		fmt = "yyyy-MM-dd HH:mm:ss";
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
		}
	}
	return fmt
}

let conGetExlist = {
    GetHelpTagsUrl: function(Url) {
        var BaseUrl = '';
        var domain = document.domain;
        if (domain.indexOf('localhost') >= 0) {
            BaseUrl = 'http://localhost:4840';
        }
        else if (domain.indexOf('yahee.com') >= 0) {
            BaseUrl = 'http://qas-newerp.yahee.com.cn:8088/PMS/Latest';
        }
        else {
            BaseUrl = 'http://newerp.yaheecloud.com/PMS/Latest'
        }
        return BaseUrl + Url;
    }
}


function globalReportExport(option) {
    let defaultOption = {
        Id: option[0].Value,//导出Id
        Param: [],//输入参数
        Type: 0, //导出类型 0:导出/1:预览/ 
        IsOpenParamWin: false,//是否打开参数选择界面 false:不打开，参数需要自己传入/true:打开，参数可选
        GetParamFun: null,
        WinTitle: null,
        output: 'jsonp',
        parameters:{Id: option[0].Value, Param: [{Field:'ProductId',Value:option[0].Value}]},
        // Callback: function (sUrl) {
        //     window.open(sUrl);
        // }
    }
    defaultOption.Param.push(option)

    var _Option = Object.assign({}, defaultOption, option);

    if (!/^\d+$/.test(_Option.Id)) {
        Message.error('导出Id格式错误，应为大于0的整数!');
        return;
    }
    _Option.Id = parseInt(_Option.Id, 10);
    // if (option.Id <= 0) {
    //     this.Message.error('导出Id错误，应为大于0的整数!');
    //     return;
    // }

    //#region  参数获取
    var _Param = _Option.Param;
    if (_Option != null && typeof _Option.GetParamFun == 'function') {
        _Param = _Option.GetParamFun();
    }
    //#endregion
    if (_Option.IsOpenParamWin) {
        //创建窗口
        // new ParamWin({ Id: _Option.Id, Param: _Param, Type: _Option.Type, WinTitle: _Option.WinTitle }, _Option.Callback).open(_Param);
    } else {
        let  Option = {
            Id: _Option.Id, Data: _Param, Type: _Option.Type,parameters:_Option.parameters,
        }
        Output(Option, _Option.Callback);
    }
}
//导出
function Output(Option) {
    if (Option.Type == 0) {
        var data = {};
        if ( Option.Data.length > 0) {
            for (var i = 0; i < Option.Data[0].length; i++) {
                data[Option.Data[0][i].Field] = Option.Data[0][i].Value;
            }
        }
        Option.output = 'jsonp'
        Option.Data = JSON.stringify(data);
        let url = conGetExlist.GetHelpTagsUrl("/ExportTable/OutputNew").toString()
            jsonp(url,Option,10000).then(res => {  
                if(!res.Url){
                    if(res.Success){
                        Message({
                            type: 'error', 
                            message:res.Message,
                            offset:220
                        })
                    }
                }else{
                    window.open(res.Url)
                }     
            },err => {
                console.log(err)   
            })
        }
    }
// 复制功能
 function copyUrl(data) {
    // 存储传递过来的数据
    let OrderNumber = data;
    // 创建一个input 元素
    // createElement() 方法通过指定名称创建一个元素
    let newInput = document.createElement("input");
    // 讲存储的数据赋值给input的value值
    newInput.value = OrderNumber;
    // appendChild() 方法向节点添加最后一个子节点。
    document.body.appendChild(newInput);
    // 选中input元素中的文本
    // select() 方法用于选择该元素中的文本。
    newInput.select();
    // 执行浏览器复制命令
    //  execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令
    document.execCommand("Copy");
    // 清空输入框
    newInput.remove();
    // 下面是element的弹窗 不需要的自行删除就好
    Message({
        type: 'success', 
        message:'复制成功',
        offset:220
    })
  }

export {
    copyUrl,
    createUniqueString,
    toStorage,
    formatDate,
    globalReportExport,
}
  