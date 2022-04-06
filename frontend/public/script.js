
const parseJSON = async (url) => {

    const response = await fetch(url)
    return response.json();
};

const userComponent = ({firstname, surname}) => {

return `
    <div>
        <h1>${firstname}</h1>
        <h2>${surname}</h2>
    </div>
`

};

function addUserComponent() {

        return `
            <div>
                <input type='text' name="firstname" class='firstname' placeholder="firstname">
                <input type='text' name="surname" class='surname' placeholder="surname">
                <div class="addNew">
                <button>Send</button>
                </div>
            </div>        
        `;

};


const loadEvent = async () => {

    if ( window.location.pathname === '/admin/order-view') {

        console.log('admin felület')
    } else {
        console.log('user felület')
    }

    const result = await parseJSON('/api/w1/users')

    const rootElement = document.getElementById('root')

    rootElement.insertAdjacentHTML('beforeend', 

    result.map(user => userComponent(user)).join('')

    );

    rootElement.insertAdjacentHTML('afterend', addUserComponent())


    const button = document.querySelector(".addNew");
    const firstname = document.querySelector(`.firstname`);
    const surname = document.querySelector(`.surname`);

    button.addEventListener("click", e => {
        //e.preventDefault();

        const userData = {
            firstname: firstname.value,
            surname: surname.value
        };

        fetch("/users/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(async data => {
            const user = await data.json();
            /*rootElement.innerHTML = "";
            rootElement.insertAdjacentHTML("beforeend", users.ma(user => userComponent(user)).join(""))*/

            rootElement.insertAdjacentHTML('beforeend', userComponent(user))
        })

    })

    
    
}

window.addEventListener('load', loadEvent)