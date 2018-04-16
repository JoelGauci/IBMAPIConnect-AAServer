#!/bin/bash
#
# Copyright 2017 Istio Authors
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

export PROJECT=aaserverproject
export CONTAINER_VERSION=2018.1.3
export SERVICE_NAME=aaserver-service
export SERVICE_VERSION=v1
export IMAGE=jogdocker/$SERVICE_NAME-$SERVICE_VERSION:$CONTAINER_VERSION
export BUILD_HOME=.

echo $IMAGE
docker build -t $SERVICE_NAME -f "${PWD}/Dockerfile" $BUILD_HOME
docker tag $SERVICE_NAME $IMAGE

docker push $IMAGE

# kubectl apply -f <(istioctl kube-inject -f kube/$SERVICE_NAME.yaml)
