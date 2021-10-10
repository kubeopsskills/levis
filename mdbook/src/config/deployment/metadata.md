# Metadata
This is metadata about the resource, such as its name, type, api version, annotations, and labels. This contains fields that maybe updated both by the end user and the system (e.g. annotations, labels and so on).

## Example of Metadata
```yaml
deployment:
  name: "nginx"
  labels:
    app: nginx
    run: nginx
  annotations:
    app: nginx
    nginx.master: "true"
```

### Configuration
The following tables list the configurable parameters of the `metadata` chart and their default values.

| Parameter | Type | Description | Default |
| ----------| ---- | ----------- | ------- |
| `levis.name` | String | To name the deployment and service | `undefined` |
| `deployment.name` | String | To name the deployment | `inherit from levis.name` |
| `deployment.labels` | String : String | To define deployment labels | `{}` |
| `deployment.annotations` | String : String | To define deployment annotations | `{}` |

## Labels
You can visualize and manage Kubernetes objects with more tools than kubectl and the dashboard. A common set of labels allows tools to work interoperably, describing objects in a common manner that all tools can understand. 

### Example
```yaml
deployment:
  labels:
    app.kubernetes.io/name: "nginx"
    app.kubernetes.io/instance: "nginx-01"
    app.kubernetes.io/version: "1.1.0-stable"
    app.kubernetes.io/component: "reverse-proxy"
    app.kubernetes.io/part-of: "api-gateway"
    app.kubernetes.io/managed-by: "levis"
    app.kubernetes.io/created-by: "controller-manager"
```

## Annotations
You can use Kubernetes annotations to attach arbitrary non-identifying metadata to objects. Clients such as tools and libraries can retrieve this metadata.

### Example
```yaml
deployment:
  annotations:
    registry: "https://hub.docker.com/"
    credential: "secret-manager"
```

references: 
- [Recommended Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/) 
- [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)