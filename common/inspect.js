/**
 * 表单数据格式验证
 */

// 日期格式验证  yyyy-MM-dd
function dateFormatCheck(date) {
	let dateReg = /^([1-9]\d{3})-(\d{2})-(\d{2})$/
	return dateReg.test(date)
}

// 身份证格式验证
function idcardFormatCheck(idcard) {
	let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	return idcardReg.test(idcard)
}



module.exports = {
	dateFormatCheck: dateFormatCheck,
	idcardFormatCheck: idcardFormatCheck
}