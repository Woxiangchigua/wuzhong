### 指定node-sass的下载源：

	yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

### 安装依赖包

	yarn install

### 本地启动

 	1. 开启终端1， 启动server目录服务端 开启8080端口
	 	./funservice-darwin-x64  -p ./plugins serve

 	2. 开机终端2，开启relay 

 		yarn run relay 

 	3. 开启终端3，启动客户端 

 		yarn start
 	
 	4. 访问 http://localhost:3000

### 打包 
	
	`yarn build`
