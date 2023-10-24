// 导入http中创建的axios实例
import http from '../api';

export const getTableData = (params) => http("get", `/api/getTableData`, params)//分页查询获取人物信息，带有搜索
export const getTotalCount = (params) => http("get", `/api/getTotalCount`, params)//分页查询获取人物信息总条目数，带有搜索
export const deleteData = (params) => http("get", `/api/deleteData`, params)//删除人物信息
export const selectDelete = (params) => http("get", `/api/selectDelete`, params)//勾选批量删除
export const addData = (params) => http("post", `/api/addData`, params)//新增人物信息
export const editData = (params) => http("post", `/api/editData`, params)//编辑人物信息
export const downExcelTemp = (params) => http("get", `/api/downExcelTemp`, params, 'application/json; charset=UTF-8', "arraybuffer")//下载excel模板
export const exportExcel = (params) => http("post", `/api/exportExcel`, params, 'application/json; charset=UTF-8', "arraybuffer")//导出表格数据
// export const uploadExcel = (params) => http("post", `/api/uploadExcel`,params,'application/json; charset=UTF-8',"arraybuffer")//上传excel表格(两种上传)

export const recover = () => http("get", `/api/recover`)//分页查询获取人物信息，带有搜索





