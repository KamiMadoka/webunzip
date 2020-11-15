let input = document.createElement('input');
input.type = "file";
input.id = "file";
input.onchange = () => {
    let file = document.getElementById('file');
    JSZip.loadAsync(file.files[0]).then(zip => {
        let toRead = Object.keys(zip.files).filter(a => a.endsWith('.hhc'))[0];
        toRead && zip.file(toRead).async('string').then(data => {
            console.log(data)
            let lines = data.split("\r\n");
            lines.forEach(line => {
                let splits = line.split('"');
                let nameIndex = splits.findIndex(s => s.endsWith("name="));
                let linkIndex = splits.findIndex(s => s.endsWith("link="));
                console.log(splits[nameIndex + 1], splits[linkIndex + 1])
            });
            this.data = data;
        })
    })
}
document.body.appendChild(input);