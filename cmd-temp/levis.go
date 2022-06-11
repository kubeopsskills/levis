package main

import (
	"fmt"
	"github.com/aws/constructs-go/constructs/v3"
	"github.com/aws/jsii-runtime-go"
	"github.com/cdk8s-team/cdk8s-core-go/cdk8s"
	"os"
)

type Cdk8sChartProps struct {
	cdk8s.ChartProps
}

func InitCdk8sChart(scope constructs.Construct, id string, props *Cdk8sChartProps) cdk8s.Chart {
	var cprops cdk8s.ChartProps
	if props != nil {
		cprops = props.ChartProps
	}
	chart := cdk8s.NewChart(scope, jsii.String(id), &cprops)

	// define resources here

	return chart
}

func main() {

	argsWithProg := os.Args
	fmt.Println(argsWithProg)

	app := cdk8s.NewApp(nil)
	InitCdk8sChart(app, "levis", nil)
	app.Synth()
}
