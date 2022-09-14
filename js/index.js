
    async function doRequest() {
        let url = 'http://10.0.0.100/events';
        let res = await fetch(url);

        if (res.ok) {

            let text = await res.text();

            return text;
        } else {
            return `HTTP error: ${res.status}`;
        }
    }

    doRequest().then(data => {
        console.log(data);
    });


