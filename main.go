package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"regexp"

	_ "github.com/go-sql-driver/mysql"
)

type Name struct {
	Name string `json:"name,omitempty"`
}


func main() {
	content, err := ioutil.ReadFile("test.json")
	if err != nil {
		fmt.Println(err.Error())
	}

	var Names []Name
	err2 := json.Unmarshal(content, &Names)
	if err2 != nil {
		fmt.Println("Error JSON Unmarshalling")
		fmt.Println(err2.Error())
	}
 
	db, erro := sql.Open("mysql", "root:@/?charset=utf8&parseTime=True&loc=Local")
	if erro != nil{
		panic(erro.Error())
	}
	defer db.Close()

	for _, x := range Names {
	
		statement, erro := db.Prepare(
			"insert into names (name) values (?)",
		)
		if erro != nil {
			panic(erro.Error())
		}
		defer statement.Close()
	
		_, erro = statement.Exec(x.Name)
		if erro != nil {
			panic(erro.Error())
		}

		urlA, err := url.Parse("https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=otaviouss&search_for=profile&limit=1")
		if err != nil {
		log.Fatal(err)
		}		

		values := urlA.Query()

		values.Set("profile", x.Name)

		urlA.RawQuery = values.Encode()

		resp, err := http.Get(urlA.String()); if err != nil { log . Fatalln ( err ) } 
		body, err := ioutil.ReadAll(resp.Body); if err != nil {log.Fatal(err)}

		sb := string (body);

		r := regexp.MustCompile(`""all"\:0\.\d+,|"all"\:1\.0+,"`)

		results := r.FindAllString(sb, -1)
		for i := range(results) {
			fmt.Println(results[i])
		}
	

	}	
}
