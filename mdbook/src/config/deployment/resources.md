# Resources
When you specify a Pod, you can optionally specify how much of each resource a Container needs. The most common resources to specify are `cpu` and `memory` (RAM); there are others.

When you specify the resource `request` for Containers in a Pod, 
- > the scheduler uses this information to decide which node to place the Pod on.

When you specify a resource `limit` for a Container, 
- > the kubelet enforces those limits so that the running container is not allowed to use more of that resource than the limit you set. 

The kubelet also reserves at least the request amount of that system resource specifically for that container to use.

## Requests and limits
If the node where a Pod is running has enough of a resource available, it's possible (and allowed) for a container to use more resource than its `request` for that resource specifies. However, a container is not allowed to use more than its resource `limit`.

- > For example, if you set a `memory` request of 256 MiB for a container, and that container is in a Pod scheduled to a Node with 8GiB of memory and no other Pods, then the container can try to use more RAM.

If you set a `memory` limit of 4GiB for that Container, the kubelet (and container runtime) enforce the limit. The runtime prevents the container from using more than the configured resource limit. 

- > For example: when a process in the container tries to consume more than the allowed amount of memory, the system kernel terminates the process that attempted the allocation, with an `out of memory (OOM)` error.

Limits can be implemented either reactively (the system intervenes once it sees a violation) or by enforcement (the system prevents the container from ever exceeding the limit). Different runtimes can have different ways to implement the same restrictions.

### Example
```yaml
deployment:
  ...
  containers:
  ...
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
  ...
```

### Configuration
The following tables list the configurable parameters of the `resource` chart and their default values.

| Parameter | Description | Type | Default |
| ----------| ----------- | ---- | ------- |
| `requests.memory` | String | To reserve node's memory | `{}` |
| `requests.cpu` | String | To reserve node's cpu | `{}` |
| `limits.memory` | String | To limit node's memory | `{}` |
| `limits.cpu` | String |  To limit node's cpu  | `{}` |


**References:** 
- [Managing Resources for Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Requests and Limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits)