class Levis < Formula
  desc "Kubernetes Manifest Generator - CLI"
  homepage "https://github.com/kubeopsskills/levis"
  url "https://github.com/kubeopsskills/levis/releases/download/1.0.15-alpha/levis-1.0.15-alpha-macos-x64.tar.gz"
  sha256 "5bd52e9b701d7418dc9d8e8bbefd37a2853c2a6631180bf8324a08ff3de03a29"
  license "MIT"
  version "1.0.15-alpha"

  def install
    bin.install "levis"
  end
end