# Deployment

A Deployment provides declarative updates for Pods and ReplicaSets.

## Use Case

The following are typical use cases for Deployments:

- [Create a Deployment to rollout a ReplicaSet][u-1]. The ReplicaSet creates Pods in the background. Check the status of the rollout to see if it succeeds or not.
- [Declare the new state of the Pods][u-2] by updating the PodTemplateSpec of the Deployment. A new ReplicaSet is created and the Deployment manages moving the Pods from the old ReplicaSet to the new one at a controlled rate. Each new ReplicaSet updates the revision of the Deployment.
- [Rollback to an earlier Deployment revision][u-3] if the current state of the Deployment is not stable. Each rollback updates the revision of the Deployment.
- [Scale up the Deployment to facilitate more load][u-5].
- [Pause the Deployment][u-5] to apply multiple fixes to its PodTemplateSpec and then resume it to start a new rollout.
- [Use the status of the Deployment][u-6] as an indicator that a rollout has stuck.
- [Clean up older ReplicaSets][u-7] that you don't need anymore.

reference: [link][ref]

[ref]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
[u-1]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment
[u-2]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment
[u-3]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment
[u-4]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#scaling-a-deployment
[u-5]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#pausing-and-resuming-a-deployment
[u-6]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#deployment-status
[u-7]: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#clean-up-policy

## Creating a Deployment

The following is an example of a Deployment. It creates a kubernetes configuration to bring up nginx Pods and Service:

```yaml
levis:
  name: "nginx"
  deployment:
    containers:
      image: "nginx"
  service:
    enable: true
```

this example: [link] (https://github.com/kubeopsskills/levis/blob/develop/examples/levis.yaml)