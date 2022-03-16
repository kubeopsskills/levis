export enum LevisCommand {
    CREATE = "create"
}

export enum Path {
    OUTPUT_PATH = "manifests/levis.k8s.yaml",
    CURRENT_PATH = "./dist/levis.k8s.yaml"
}

export enum MetaData {
    DEFAULT_NAMESPACE = "default"
}

export enum Service {
    TYPE_CLUSTER_IP = "ClusterIP"
}

export enum Deployment {
    REVISION_HISTORY_LIMIT = 10,
    STRATEGY_ROLLING_UPDATE = "RollingUpdate",
    ROLLING_UPDATE_MAX_SURGE = "100%",
    ROLLING_UPDATE_MAX_UNAVAILABLE = "0%",
}

export enum Pod {
    DEFAULT_SERVICE_ACCOUNT = "default"
}

export enum Container {
    IMAGE_PULL_POLICY = "Always",

    PROBE_TYPE_HTTP = "http",
    PROBE_TYPE_SOCKET = "tcpsocket",
    PROBE_TYPE_COMMAND = "command",
    PROBE_DEFAULT_COMMAND = "cat /app/package.json",
    
    READINESS_PATH = "/healthz",
    READINESS_INITIAL_DELAY_SECONDS = 0,
    READINESS_PERIOD_SECONDS = 10,
    READINESS_TIMEOUT_SECONDS = 1,
    READINESS_SUCCESS_THRESHOLD = 1,
    READINESS_FAILURE_THRESHOLD = 3,

    LIVENESS_PATH = "/healthz",
    LIVENESS_INITIAL_DELAY_SECONDS = 0,
    LIVENESS_PERIOD_SECONDS = 10,
    LIVENESS_TIMEOUT_SECONDS = 1,
    LIVENESS_SUCCESS_THRESHOLD = 1,
    LIVENESS_FAILURE_THRESHOLD = 3,
}