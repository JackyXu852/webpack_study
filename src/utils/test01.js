export const add111 = (x, y) => {
	return x + y;
}

export const mul = (x, y) => {
	return x * y;
}


export const promise = new Promise((resolve) => {
	setTimeout(() => {
		console.log('定时器执行完啦~')
		resolve()
	})

})

console.log('test01.js被加载了~~~~~~~~~~~~~~~~~~~~~~~~~~~')

