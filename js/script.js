// console.log("hey!")
// console.log(fetch('https://randomuser.me/api/'))
let employees = [];
const gallery = document.querySelector("#gallery");

console.log("people?",employees)

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
            console.log("clicked!", e.target)
            createModal(employees[i], i)
        })
    })
}

const createModal = (employee, i) => {
        console.log("employee", employee)
    console.log("index", i)
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
console.log("closeBtn:", closeBtn)
    closeBtn.addEventListener("click", () => {
        console.log("close")
        gallery.removeChild(modal)
    })
}


//     const getData = (data) => {
//         console.log("data:", data);
//         console.log("data:", data.results[0]);
//         const first = data.results[0];
//         data.results.forEach(employee => {
//               const html = `
//         <div class="card">
//             <div class="card-img-container">
//                 <img class="card-img" src=${employee.picture.large} alt="profile picture">
//             </div>
//             <div class="card-info-container">
//                 <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
//                 <p class="card-text">${employee.email}</p>
//                 <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
//             </div>
//         </div>
//         `;

//         gallery.insertAdjacentHTML('beforeend', html);
//         });
//       //   console.log("Card", cards) 
//       Array.from(cards).forEach(card => {
//         console.log(card)
//          card.addEventListener("click", (e) => {
//             console.log("clicked!", e)
//         fetchUserDetails(e.target)
//         })
//       })

// fetch(`https://randomuser.me/api/?seed=${data.info.seed}&&id=${data.results[0].id.value}`)
// .then(res => {
//     console.log(res)
//     if (res.ok) {
//         console.log("Success!")
//        return res.json() 
//     } else {
//         console.log(res)
//         console.log("Not successful!")
//     }
   
// })
// .then(data => console.log(data))

//     };

// const employeeModal = (employee) => {
//     console.log("clicked!", employee)
//     console.log("clicked!", employee.value)
//     const html = `
//     <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src=${employee.picture.large} alt="profile picture">
//             <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
//             <p class="modal-text">${employee.email}</p>
//             <p class="modal-text cap">${employee.location.city}</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>
//     `;

//     gallery.insertAdjacentHTML('beforeend', html);
// }
   

// const fetchData = (url) => fetch(url).then(res => res.json)

// fetch('https://randomuser.me/api/?results=12&')
//     .then(res => {
//         console.log(res)
//         if (res.ok) {
//             console.log("Success!")
//            return res.json() 
//         } else {
//             console.log(res)
//             console.log("Not successful!")
//         }
       
//     })
//     .then(data => employees.push(...data.results))
    // .then(data => getData(data))

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