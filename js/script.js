let employees = [];
const gallery = document.querySelector("#gallery");


const createCards = (data) => {
    employees.push(...data.results);

    employees.forEach(employee => {
        const html = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${employee.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
            `;
            gallery.insertAdjacentHTML('beforeend', html);
        });

        const cards = document.querySelectorAll(".card");

        cards.forEach((card, i) => {
         card.addEventListener("click", (e) => {
            createModal(employees[i], i)
        })
    })
}

const createModal = (employee, i) => {
    console.log(employee, i)
    const birthday = new Date(employee.dob.date).toLocaleDateString('en-US');
    const phone =  employee.phone.replace( /(\d{3})(\d{3})(\d{4})/,'$1-$2-$3' )

    const html = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${employee.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">
            ${employee.location.street.number}
            ${employee.location.street.name}, 
            ${employee.location.city}, 
            ${employee.location.state}
            ${employee.location.postcode}
            </p>
            <p class="modal-text">Birthday: ${birthday}</p>
        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
    `;

    gallery.insertAdjacentHTML('beforeend', html);

    const modal = document.querySelector(".modal-container");
    const closeBtn = document.querySelector("#modal-close-btn");
    const nextBtn = document.querySelector("#modal-next");
    const prevBtn = document.querySelector("#modal-prev");

    closeBtn.addEventListener("click", () => {
        gallery.removeChild(modal)
    })


    nextBtn.addEventListener("click", () => {
        gallery.removeChild(modal);

        if (i === employees.length-1) {
            createModal(employees[0], 0)
        } else {
        createModal(employees[i+1], i+1)
        }
       
    });

    prevBtn.addEventListener("click", () => {
        gallery.removeChild(modal);

        if (i === 0) {
            createModal(employees[employees.length-1], employees.length-1)
        } else {
        createModal(employees[i-1], i-1)
        }
       
    })

}

// const getUserData = async() => {
//     try {
//         const response = await fetch('https://randomuser.me/api/?results=12&');
//         if (response.ok) {
//             const data = await response.json();
//             employees.push(...data.results)
//             createCards()
//         } else {
//             console.log("Not successful:", response)
//         }
//     } catch (e) {
//         console.log(e)
//     }

// } 
// getUserData()



fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(res => {
        console.log(res)
        if (res.ok) {
            console.log("Success!")
           return res.json() 
        } else {
            console.log(res)
            console.log("Not successful!")
        }
       
    })
    .then(data =>  createCards(data))