# Levis
## Kubernetes Manifest Generator

**Levis** is Kubernetes Manifest Generator for simply creating Kubernetes applications. Levis generates pure Kubernetes YAML - you can use Levis to define Kubernetes applications with YAML syntax for any Kubernetes clusters running anywhere.

This is an project built with ❤️ by [KubeOps Skills](https://www.kubeops.guru). We encourage you to [try it out](#getting-started), [leave feedback](#help--feedback), and [jump in to help](#contributing)!

### Contents
- [Levis](#levis)
  - [Kubernetes Manifest Generator](#kubernetes-manifest-generator)
    - [Contents](#contents)
  - [Versioning](#versioning)
  - [Demo](#demo)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Help & Feedback](#help--feedback)
  - [Examples](#examples)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [License](#license)

## Versioning
| Levis Release |cdk8s Version | construct Version | log4js Version | minimist Version | yaml Version |
|----------------|------------ |---------------------|----------------------|------------------|------------------|
| 1.0.15-alpha | 0.30.0 | 3.0.14 | 6.3.0 | 1.2.5 | 2.0.0-6 |

## Demo


## Getting Started
### Installation
Levis is available on Linux, macOS and Windows platforms.
- Binaries for Linux, Windows and Mac are available as tarballs in the [release](https://github.com/kubeopsskills/levis/releases) page.

### Usage
after install levis you can use
- `levis create -f <levis-config.yaml> -o <output.yaml>`
- **-f** levis config yaml see [Examples Directory](./examples)
- **-o** name of kubernetes config generated from levis
- **-v** log level
  -  1 for info (default)
  -  2 for debug

## Help & Feedback
Interacting with the community and the development team is a great way to
contribute to the project. Please consider the following venues (in order):

* Search [open issues](https://github.com/kubeopsskills/levis/issues)
* Slack: #project channel in [levis](https://levis-k8s.slack.com)

## Examples

See our [Examples Directory](./examples/README.md).

## Roadmap

See our [roadmap](https://github.com/kubeopsskills/levis/projects/1) for details about our plans for the project

## Contributing

We welcome community contributions and pull requests. See our [contribution
guide](./CONTRIBUTING.md) for more information on how to report issues, set up a
development environment and submit code.

## License

This project is distributed under the [MIT License, Copyright (c) 2021 KUBEOPS SKILLS Co., Ltd.](./LICENSE)