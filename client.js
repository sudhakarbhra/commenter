console.log("client.js");
const form = document.querySelector('form');
const news = document.querySelector('.news');
const API_URL = "http://localhost:5000/news";
lme();

// Getting data from FROM after submitting 
form.addEventListener('submit', (event)=>{
event.preventDefault();
const formData = new FormData(form);
const name = formData.get('name');
const content = formData.get('content');
const msg = {
  name,
  content
};
 console.log(msg);

fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        'content-type': 'application/json'
      	}
    }).then(response =>response.json())
		.then(createdMsg =>{
			console.log(createdMsg);

	form.reset();
	lme();
		});

});

function lme() {
	// body...
	news.innerHTML='';
	fetch(API_URL)
	.then(response=>response.json())
	.then(createdMsg => {
		console.log(createdMsg);
		createdMsg.reverse();
		createdMsg.forEach(cre=>{
			const div = document.createElement("div");
			const header = document.createElement("h3");
			const content = document.createElement("p");
			const small = document.createElement("small");
			const hr = document.createElement("hr");

			header.textContent=cre.name;
			content.textContent=cre.content;
			small.textContent=cre.created;

			div.appendChild(header);
			div.appendChild(content);
			div.appendChild(small);
			div.appendChild(hr);
			news.appendChild(div);

		})
	});

}
