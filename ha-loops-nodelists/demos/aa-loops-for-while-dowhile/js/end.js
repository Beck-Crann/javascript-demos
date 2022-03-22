function End(){

let count;
let list = `<ul>`;

list += `<li>for loop</li>`;
for (count = 0; count < 5; count++) {
	list += `<li>${count + 1}</li>`;
}

list += `<li>while loop</li>`;
count = 0;
while (count < 5) {
	list += `<li>${count + 1}</li>`;
	count++;
}

list += `<li>do-while loop</li>`;
count = 0;
do {
	list += `<li>${count + 1}</li>`;
	count++;
} while (count < 5);

list += `</ul>`;

document.querySelector('.output').innerHTML = list;

}

export default End;

<body>
	<nav class="navbar navbar-dark bg-dark mb-3">
    <div class="container w-50">
			<a id="button" href="#" class="navbar-brand">Friends</a>
    </div>
  </nav>
	<div class="container w-50">
		<div id="content"></div>
	</div>
</body>