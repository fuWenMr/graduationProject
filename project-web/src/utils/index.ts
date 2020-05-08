import umbrella from 'umbrella-storage';

// 获取url的参数
export const queryString = () => {
  let _queryString: { [key: string]: any } = {};
  const _query = window.location.search.substr(1);
  const _vars = _query.split('&');
  _vars.forEach((v, i) => {
    const _pair = v.split('=');
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
      _queryString[_pair[0]] = _arr;
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
    }
  });
  return _queryString;
};

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';

/**
 * 把formData转换为JSON
 */
export function formData2JSON(formData: FormData, extraData = {}) {
  let obj = {} as any;
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return JSON.stringify(Object.assign(obj, extraData));
}

/**
 * 从 form中取出JSON
 */
export function getJSONByForm(from: any, extraData?: any) {
  const formData = new FormData(from);
  return formData2JSON(formData, extraData);
}


export function setStateData (reduxSetter: Function, stateName: string, data: any) {
  if (data === undefined) { return; }
  umbrella.setSessionStorage(stateName, data);
  reduxSetter({
    stateName,
    data,
  });
}

/**
 * 浅拷贝一个对象
 * @param obj 
 */
export function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 比较两个数组的差异
 */
export function arrayDiff(preItems: Array<string>, nextItems: Array<string>): { addItems: Array<string>, delItems:Array<string> } {
  let _preItems = {} as any;
  let _nextItems = {} as any;
  preItems.forEach((item) => {
    _preItems[item] = 1;
  });
  nextItems.forEach((item) => {
    _nextItems[item] = 1;
  });
  preItems.forEach((item) => {
    if (_nextItems[item]) {
      delete _nextItems[item];
      delete _preItems[item];
    }
  });
  return { 
    addItems: Object.keys(_nextItems),
    delItems: Object.keys(_preItems),
  }
};

/**
 * 比较两个数组的内容除顺序外是否一致
 * @param arr1 
 * @param arr2 
 */
export function isArrItemSame(arr1: Array<string>, arr2: Array<string>) :boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const diff = arrayDiff(arr1, arr2);
  return (diff.addItems.length === 0) && (diff.delItems.length === 0); 
}

/**
 * 生成 0 -max的随机数
 * @param max 
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 补全图表格的数据  用undefined填充未知项 防止图标断层位置被绘制
 */
type FoldConfig = {
  ticks: Array<string>,
  tickKey: string,
  typeKey: string,
  valueKey: string,
  DV?: any,
}
export function chartDataFold(data: Array<any>, foldConfig: FoldConfig) {
  const {
    ticks,
    tickKey,
    typeKey,
    valueKey,
    DV,
  } = foldConfig;
  if (data.length === 0) {
    return [];
  }
  if(ticks.length === 0) {
    return DV ? new DV().source(data) : data;
  }

  // 首先变成中间形态 [{tickKey: tickValue}], 
  let res = [] as Array<any>;
  let tickMap = {} as any;
  for (let i in ticks) {
    let tickName = ticks[i];
    tickMap[tickName] = i;
    res.push({ [tickKey]: tickName });
  }

  // 再变成中间形态 [{tickKey: tickValue, typ11: 167, type2: 47}],
  let fields = [] as Array<string>;  
  for (let record of data) {
    let currentTickKey = record[tickKey];
    let currentType = record[typeKey];
    let currentValue = record[valueKey];
    if ( !fields.find((t: any) => t === currentType) ) {
      fields.push(currentType);
    }

    let currnetData = res[tickMap[currentTickKey]];
    currnetData[currentType] = currentValue;
  }
  if (!DV) {
    return res;
  }
  // DataSet展开

  const dv = new DV().source(res);
  dv.transform({
    type: "fold",
    fields,
    key: typeKey,
    value: valueKey,
  });

  console.log(dv.rows)

  return dv;
}

// 复制指定文本到剪贴板
export function copyText(text: string) {
  const textarea = document.createElement("textarea"); //创建input对象
  const currentFocus = document.activeElement as any; //当前获得焦点的元素
  document.body.appendChild(textarea); //添加元素
  textarea.value = text;
  textarea.focus();
  if (textarea.setSelectionRange) {
      textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
  } else {
      textarea.select();
  }
  let flag: boolean;
  try {
      flag = document.execCommand("copy"); //执行复制
  } catch (eo) {
      flag = false;
  }
  document.body.removeChild(textarea); //删除元素
  currentFocus.focus();
  return flag;
}
