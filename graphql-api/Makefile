name ?= `node -pe "require('./package.json').name"`
registry ?= ts-one-front-docker-repo.ts-paas.com
version ?= `node -pe "require('./package.json').version"`

image:
	$(call blue, "Building docker image...")
	docker build --no-cache -t ${name}:${version} -f Dockerfile .
	docker tag ${name}:${version} ${name}:latest

publish: image
	$(call blue, "Publishing Docker image to registry...")
	docker tag ${name}:${version} ${registry}/${name}:${version}
	docker tag ${name}:${version} ${registry}/${name}:latest
	docker push ${registry}/${name}:${version} 
	docker push ${registry}/${name}:latest

define blue
	@tput setaf 6
	@echo $1
	@tput sgr0
endef
