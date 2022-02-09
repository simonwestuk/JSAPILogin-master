document.addEventListener('DOMContentLoaded', function() {
    console.log('document is ready. I can sleep now');
 });


frmLogin.onsubmit = async function(e) {
    e.preventDefault()

    let formData = new FormData(frmLogin)
    let data = {}
    formData.forEach((value, key) => {
        data[key] = value;

    })

 
    let response = await fetch('https://localhost:7267/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let result = await response.json()

    if (response.status == 200)
    {
        window.localStorage.setItem('token', result.token)
        alert("You are logged in")
    }
    else
    {
        document.getElementById("error-msg").style.removeProperty("visibility")
        document.getElementById("error-msg").style.visibility = true
        document.getElementById("error-msg").innerHTML = result.message
    }


}

function checkLoggedIn()
{
    let token = window.localStorage.getItem('token')
    if (token == null)
    {
        window.location.href = 'login.html'
    }
    else
    {
        alert('You are already logged in')
    }
}

async function logout()
{
    let response = await fetch('https://localhost:7267/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })


    window.localStorage.removeItem('token')
    window.location.href = 'index.html'
}