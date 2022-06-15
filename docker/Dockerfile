FROM debian:11.3-slim
LABEL maintainer="KubeOps Skills Open Source Software <support@kubeops.guru>"

ARG RELEASE_VERSION=1.4.0-beta
RUN apt-get update && apt-get install curl -y 
RUN curl -L https://github.com/kubeopsskills/levis/releases/download/$RELEASE_VERSION/levis-$RELEASE_VERSION-linux-x64.tar.gz \
    | tar -xvzf - \
    && chmod ugo+x levis \
    && mv levis /opt
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
ENTRYPOINT [ "/opt/levis" ]