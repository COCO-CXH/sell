import service from './service'

// 登录
// export const login = (params = {}) => service.post('../index.php/api/Login/login', params);

// 商家
export const getSeller = (params = {}) => service.get('../api/seller', params);

// 商品
export const getGoods = (params = {}) => service.get('../api/goods', params);

// 评论
export const getRatings = (params = {}) => service.get('../api/ratings', params);
