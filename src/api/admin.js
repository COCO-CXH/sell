import service from './service'

export const getAll = (params = {}) => service.get('https://www.easy-mock.com/mock/5b4edede7a6a8d141aa0753f/api/getAll', params);
