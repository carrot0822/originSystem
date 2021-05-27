import axios from "_axios@0.21.1@axios";

// 建立一个不重复的哈希表用于存储当前处于pending的请求
const pendingList = new Map();
// 获取当前请求的key值 用于缓冲队列对比
const getFetchKey = ((config)=>{
    // useCancelToken 用于配置该接口是否需要检测重复请求 这个是写在默认配置拦截器中
    // 或者特殊请求使用特殊的axios实例
    const {useCancelToken} = config
    if(useCancelToken){
        const {headers,url,data,method,params} = config;
        let token;
        if(method === 'GET'){
            token = [method,url].join("&"); // arr的拼装字符串方法
        }else{
             token = [method,url,JSON.stringify(data),JSON.stringify(params)].join("&");
        }
        return token
    }
})
// 添加请求到pendingList
const addPending = (config) =>{
    const fetchKey = getFetchKey(config);
    // 如果fetchKey存在 则证明这是需要缓存的请求
    if(fetchKey){
        // 如果已经用canceltoken就发放一个
        // 如果没有就生成一个对应的取消函数
        config.cancelToken = config.cancelToken || new axios.CancelToken((cancel)=>{
            if(!pendingList.has(fetchKey)){
                pendingList.set(fetchKey,cancel);
            }
        })
    };
}
// 移除pendingList请求
const removePending = (config)=>{
    const fetchKey = getFetchKey(config);
    if(fetchKey){
        if(pendingList.has(fetchKey)){
            pendingList.delete(fetchKey);
        }
    }
}

// 把请求移除并取消该请求 
// 这一步用在请求之前检测
const cancelPending = (config)=>{
    const fetchKey = getFetchKey(config);
    if(fetchKey){
        if(pendingList.has(fetchKey)){
            const cancel = pendingList.get(fetchKey); // 取出对应的取消函数
            cancel(fetchKey);// 取消请求
            pendingList.delete(fetchKey);
        }
    }
}


axios.interceptors.request.use((config) => {
    //发送请求前首先检查该请求是否已经重复，重复则进行取消并移除
    cancelPending(config);
    //添加该请求到pendingList中
    addPending(config);
    return config;
  });
  
  axios.interceptors.response.use((response) => {
    const config = response.config;
    //请求完成后移除该请求
    removePending(config);
    return response;
  });

/*
最后，因取消请求抛出的error我们不应该返回给用户，使用axios.isCancel()判断当前请求是否是主动取消的
  axios.(options).then(...).catch((error) => {
    if (axios.isCancel(error)) {
      console.warn('repeated request: ' + error.message);
      return;
    }

    reject(error);
  });

  */