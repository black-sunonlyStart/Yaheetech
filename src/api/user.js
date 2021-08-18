import request from '@/utils/request'
export function fetchList(query) {
    return request({
      url: '/transfer/queryTransferBehaviorPage?pageNum=1&pageSize=20&status=-1',
      method: 'get',
      params: query
    })
  }