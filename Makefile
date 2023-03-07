build:
	ssh  root@47.109.22.178 "cd /www/looper/sso-admin-portal/;docker-compose -f docker-compose.yml pull;docker-compose -f docker-compose.yml up -d"
clean:
	ssh  root@47.109.22.178 "docker rm -f  sso-admin-portal-container;docker rmi -f registry.cn-chengdu.aliyuncs.com/octoveau/sso-admin-portal"
test:
	echo "hello makefile"