/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
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

// function getUrl (Url) {
//     var BaseUrl = '';
//     var domain = document.domain;
//     if (domain.indexOf('localhost') >= 0) {
//         BaseUrl = 'http://localhost:4840';
//     }
//     else if (domain.indexOf('yahee.com') >= 0) {
//         BaseUrl = 'http://qas-newerp.yahee.com.cn:8088/PMS/Latest';
//     }
//     else {
//         BaseUrl = 'http://newerp.yaheecloud.com/PMS/Latest'
//     }
//     return BaseUrl + Url;
// }
// function GlobalReportExport(option) {
//     var defaultOption = {
//         Id: 0,//导出Id
//         Param: null,//输入参数
//         Type: 0, //导出类型 0:导出/1:预览/ 
//         IsOpenParamWin: false,//是否打开参数选择界面 false:不打开，参数需要自己传入/true:打开，参数可选
//         GetParamFun: null,
//         WinTitle: null,
//         Callback: function (sUrl) {
//             window.open(sUrl);
//         }
//     }
//     var _Option = Object.extend({}, defaultOption, option);

//     if (!/^\d+$/.test(_Option.Id)) {
//         this.Message.error('导出Id格式错误，应为大于0的整数!');
//         return;
//     }
//     _Option.Id = parseInt(_Option.Id, 10);
//     if (option.Id <= 0) {
//         this.Message.error('导出Id错误，应为大于0的整数!');
//         return;
//     }

//     //#region  参数获取
//     var _Param = _Option.Param;
//     if (_Option != null && typeof _Option.GetParamFun == 'function') {
//         _Param = _Option.GetParamFun();
//     }
//     //#endregion
//     if (_Option.IsOpenParamWin) {
//         //创建窗口
//         new ParamWin({ Id: _Option.Id, Param: _Param, Type: _Option.Type, WinTitle: _Option.WinTitle }, _Option.Callback).open(_Param);
//     } else {
//         Output({ Id: _Option.Id, Data: _Param, Type: _Option.Type }, _Option.Callback);
//     }
// }
// //导出
// function Output(Option, callback) {
//     if (Option.Type == 0) {
//         var data = {};
//         if (typeof Option.Data == Array && Option.Data.length > 0) {
//             for (var i = 0; i < Option.Data.length; i++) {
//                 data[Option.Data[i].Field] = Option.Data[i].Value;
//             }
//         }
//         Option.Data = JSON.stringify(data);
//         $.ajax({
//             url: this.GetUrl("/ExportTable/OutputNew"),
//             data: Option,
//             dataType: 'jsonp',
//             contentType: 'application/json',
//             type: "get",
//             sync: false,
//             success: function (data) {
//                 if (!data.Success) {
//                     alert(data.Message);
//                     if (callback) {
//                         callback();
//                     }
//                     return;
//                 }
//                 //window.open(data.Url);
//                 if (callback) {
//                     callback(data.Url);
//                 }

//             }
//         });
//     }
// }
  export default {
      createUniqueString,
      toStorage,
      formatDate
  }
  