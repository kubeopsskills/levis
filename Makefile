TARGET_PATH = bin
GOARCH = GOARCH=amd64
VERSION = 2.0.0
GOMODULE = github.com/kubeopsskills/levis/cmd

buildWindows:
	env GOOS=windows $(GOARCH) go build -o ./$(TARGET_PATH)/levis.exe $(GOMODULE)
	cd $(TARGET_PATH) && zip levis-Windows-$(VERSION).zip ./levis.exe
	rm -rf ./$(TARGET_PATH)/levis.exe

buildMacOS:
	env GOOS=darwin $(GOARCH) go build  -o ./$(TARGET_PATH)/levis $(GOMODULE)
	cd $(TARGET_PATH) && tar -zcvf levis-MacOS-$(VERSION).tar.gz ./levis
	rm -rf ./$(TARGET_PATH)/levis

buildLinux:
	env GOOS=linux $(GOARCH) go build -o ./$(TARGET_PATH)/levis $(GOMODULE)
	cd $(TARGET_PATH) && tar -zcvf levis-Linux-amd64-$(VERSION).tar.gz ./levis
	rm -rf ./$(TARGET_PATH)/levis

buildARM:
	env GOOS=linux GOARCH=arm64 go build -o ./$(TARGET_PATH)/levis $(GOMODULE)
	cd $(TARGET_PATH) && tar -zcvf levis-Linux-arm64-$(VERSION).tar.gz ./levis
	rm -rf ./$(TARGET_PATH)/levis

build: buildWindows buildMacOS buildLinux buildARM

run: 
	go run cmd/levis.go

test:
	go test -v ./...

test-coverage:
	go test -v -coverpkg=./... -coverprofile=coverage.out ./... && go tool cover -func coverage.out

html-coverage: 
	go tool cover -html=coverage.out -o coverage.html
	open coverage.html

clean:
	rm -rf bin

all: clean build