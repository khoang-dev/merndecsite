url = "https://voluble-paprenjak-89d6c2.netlify.app/.netlify/functions/api/employees"

function fetchEmployees() {

    
    fetch(url)
    .then(res => res.json())
    .then(res => {
        console.table(res)

        output = ''

        for(let i = 0; i < res.length; i++) {

            output += `<tr>
                <td>${res[i]['employee_id']}</td>
                <td>${res[i]['name']}</td>
                <td>${res[i]['contact_number']}</td>
                <td>${res[i]['address']}</td>
                <td>${res[i]['salary']}</td>
                <td>${res[i]['role']}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteEmp('${res[i]['_id']}')"> Delete </button>
                    <a class="btn btn-primary" href="editemp.html?id=${res[i]['_id']}">Edit</a>
                </td>
                </tr>`
        }

        document.getElementById("emps").innerHTML = output
        
    })

}

function fetchEmployee() {

    //http://localhost:8989/employees/65844854d5397aa15ca3e746

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    edit_url = url + "/" + id

    fetch(edit_url)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        document.getElementById("name").value = res['name']
        document.getElementById("salary").value = res['salary']
        
    })

}




function deleteEmp(id) {

    delflag = confirm("Are you sure want to delete this rec?")

    if(delflag == true) {
   
        del_url = url + "?id=" + id
        
        fetch(del_url, {method: "DELETE"})
        .then(res => res.json())
        .then(res => {
            window.location.reload();
            // window.location.href = "https://www.google.co.in";
        })
        
    }
}


function addEmp() {

    data = {
        "name": document.getElementById("name").value,
        "contact_number":"9833910512",
        "address":"mumbai",
        "salary": document.getElementById("salary").value,
        "employee_id":98829,
        "role":"operations"
    }

    fetch(url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
        window.location.href = "frontend.html"
     })
}


function editEmp() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    data = {
        "id": id,
        "name": document.getElementById("name").value,
        "salary": document.getElementById("salary").value
    }

    fetch(url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
        window.location.href = "frontend.html"
     })
}
