package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os/exec"
)

var pandocServer string = "http://127.0.0.1:3030"
var relayServer string = "127.0.0.1:3031"

func SendPost(url string, data any) string {
	/*
		Send json post request to specific url
	*/
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Printf("Could not marshall json: %s\n", err)
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		// TODO: Refactor Error handling to return errors and not crash the program
		panic(err)
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		// TODO: ^
		panic(err)
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	return string(body)
}
func RelayReq(writer http.ResponseWriter, reader *http.Request) {
	body, err := io.ReadAll(reader.Body)
	if err != nil {
		fmt.Printf("Could not read body: %s\n", err)
		return
	}
	var data map[string]any
	if err := json.Unmarshal(body, &data); err != nil {
		fmt.Printf("Could not unmarshall json: %s\n", err)
		return
	}
	cssMap := data["css"].(map[string]any)
	delete(data, "css")

	htmlRet := SendPost(pandocServer, data)

	css := fmt.Sprintf(
		"background-color:%s; font-family:%s; font-size:%s; letter-spacing:%s; line-height:%s;",
		cssMap["background-color"],
		cssMap["font-family"],
		cssMap["font-size"],
		cssMap["letter-spacing"],
		cssMap["line-height"],
	)

	ret := fmt.Sprintf(`<body style="%s">%s</body>`, css, htmlRet)

	writer.Write([]byte(ret))

}
func StartPandocServer() {
	cmd := exec.Command("./pandoc-server")
	err := cmd.Run()
	fmt.Printf("Pandoc Server finished with error: %v", err)
}

func main() {
	/*
		Starts the server which redirects requests
	*/
	go StartPandocServer()
	http.HandleFunc("/", RelayReq)
	fmt.Printf("Server output is: %s\n", http.ListenAndServe(relayServer, nil))

}
