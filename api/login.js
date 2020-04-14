import request from '@/services/request.service';
const loginService = {
	 
	/**
	 * 登录
	 */
	login(userObj) {
		return request.get('/gxfrTL/login', userObj);
	},
	 
	/**
	 * 退出
	 */
	logout() {
		return request.get('/test/logout');
	},
};

export default loginService;
