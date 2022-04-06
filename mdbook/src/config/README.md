# YAML Config file schema

Use `levis create -f <levis-config-file>.yaml` schema to generate Kubernetes Component Syntax

## Levis Config file Syntax Example
This is an example levis config

```yaml
levis:
  name: "nginx"
  namespace: "kubeops"
  deployment:
    name: "nginx"
    labels:
      app: nginx
      run: nginx
    annotations:
      app: nginx
      nginx.master: "true"
    serviceAccount: microservice
    revisionHistoryLimit: 5
    replicas: 3
    strategy: 
      type: RollingUpdate
      rollingUpdate:
        maxSurge: "80%"
        maxUnavailable: "20%"
    matchLabels:
      app: nginx
      run: nginx
    containers:
      name: "nginx"
      image: "nginx"
      imagePullPolicy: Always
      port: 8080
      env:
        app: nginx
      envField:
        - KEY: "value"
          AGENT_HOST: "status.hostIP"
        - apiVersion: v2
          HOST_NAME: 
      configEnvName: "appsettings"
      secretEnvName: "secretappsettings"
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
      livenessProbe:
        path: /actuator/health/liveness
        port: "8080"
        initialDelaySeconds: 30
        periodSeconds: 10
        successThreshold: 10
        failureThreshold: 10
        timeoutSeconds: 10
      readinessProbe:
        path: /actuator/health/readiness
        port: "8080"
        initialDelaySeconds: 30
        periodSeconds: 10
        successThreshold: 10
        failureThreshold: 10
        timeoutSeconds: 10
  service:
    name: "nginx"
    labels:
      app: nginx
    annotations:
      app: nginx
    selector:
      app: nginx
    type: ClusterIP
    ports:
      name: "nginx"
      port: 80
      targetPort: 80
```


For more information, you can follow levis syntax example from this [link](https://github.com/kubeopsskills/levis/tree/develop/examples)

