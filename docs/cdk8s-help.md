========================================================================================================

 Your cdk8s typescript project is ready!

   cat help         Print this message
 
  Compile:
   yarn compile     Compile typescript code to javascript (or "yarn watch")
   yarn watch       Watch for changes and compile typescript in the background
   yarn build       Compile + synth

  Synthesize:
   yarn synth       Synthesize k8s manifests from charts to dist/ (ready for 'kubectl apply -f')

 Deploy:
   kubectl apply -f dist/

 Upgrades:
   yarn import        Import/update k8s apis (you should check-in this directory)
   yarn upgrade       Upgrade cdk8s modules to latest version
   yarn upgrade:next  Upgrade cdk8s modules to latest "@next" version (last commit)

========================================================================================================
