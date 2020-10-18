TARGET_PATH = bin/target/
BUNDLE_PATH = bin/bundle/
RELEASE_VERSION = $(shell grep version package.json | awk -F \" '{print $$4}')

define bundleProject
	ncc build bin/main.js -o $(BUNDLE_PATH)
endef

buildWindows:
	$(call bundleProject)
	pkg $(BUNDLE_PATH)index.js --output $(TARGET_PATH)levis-win --targets node14-win-x64
	mv $(TARGET_PATH)levis-win.exe $(TARGET_PATH)levis.exe
	cd $(TARGET_PATH) && zip levis-$(RELEASE_VERSION)-win-x64.zip levis.exe
	rm -rf $(TARGET_PATH)levis.exe

buildMacOS:
	$(call bundleProject)
	pkg $(BUNDLE_PATH)index.js --output $(TARGET_PATH)levis-macos --targets node14-macos-x64
	mv $(TARGET_PATH)levis-macos $(TARGET_PATH)levis
	cd $(TARGET_PATH) && tar -zcvf levis-$(RELEASE_VERSION)-macos-x64.tar.gz levis
	rm -rf $(TARGET_PATH)levis

buildLinux:
	$(call bundleProject)
	pkg $(BUNDLE_PATH)index.js --output $(TARGET_PATH)levis-linux --targets node14-linux-x64
	mv $(TARGET_PATH)levis-linux $(TARGET_PATH)levis
	cd $(TARGET_PATH) && tar -zcvf levis-$(RELEASE_VERSION)-linux-x64.tar.gz levis
	rm -rf $(TARGET_PATH)levis

compile:
	yarn run build-all

build: buildWindows buildMacOS buildLinux

clean:
	rm -rf $(BUNDLE_PATH)
	rm -rf $(TARGET_PATH)

all: clean compile buildWindows buildMacOS buildLinux