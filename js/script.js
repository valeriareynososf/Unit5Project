
let employeesData = [];

const gallery = document.querySelector("#gallery");
const searchDiv = document.querySelector(".search-container")
document.body.style.backgroundColor = "#B9D9EB";


//Creates employee info cards
const createCards = (data) => {

    data.forEach(employee => {
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
            createModal(data, data[i], i)
        })
    })
}


//Creates employee modal with more details
const createModal = (employees, employee, i) => {
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

    //close modal
    closeBtn.addEventListener("click", () => {
        gallery.removeChild(modal)
    })


    //next button on modal
    nextBtn.addEventListener("click", () => {
        gallery.removeChild(modal);

        if (i === employees.length-1) {
            createModal(employees, employees[0], 0)
        } else {
        createModal(employees, employees[i+1], i+1)
        }
       
    });

     //prev button on modal
    prevBtn.addEventListener("click", () => {
        gallery.removeChild(modal);

        if (i === 0) {
            createModal(employees, employees[employees.length-1], employees.length-1)
        } else {
        createModal(employees, employees[i-1], i-1)
        }
       
    })

}

//Search input
const search = `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`
searchDiv.insertAdjacentHTML('beforeend', search);
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');

form.addEventListener('submit', (e) => {
   // e.preventDefault();
const values = searchInput.value.trim().toLowerCase().split(' ');

const results = employeesData.filter(employee => {
    for (const value of values) {
      if (employee.name.first.toLowerCase().includes(value) || employee.name.last.toLowerCase().includes(value)) {
      return employee
      }
    }  
  })
    

  gallery.innerHTML =''

createCards(results)
})

//checks when it's clear
searchInput.addEventListener("input", (e) => {
  if (!e.target.value) {
    gallery.innerHTML =''
    createCards(employeesData)}
    })


fetch('https://randomuser.me/api/?results=12&nat=US')
    .then(res => {
        if (res.ok) {
            // console.log("Success!")
           return res.json() 
        } else {
            // console.log(res)
            // console.log("Not successful!")
        }
       
    })
    .then(data =>  {
      employeesData.push(...data.results);
      createCards(data.results)
    })
