// console.log("hey!")
// console.log(fetch('https://randomuser.me/api/'))

const gallery = document.querySelector("#gallery");

    const getData = (data) => {
        console.log("data:", data);
        console.log("data:", data.results[0]);
        const first = data.results[0];
        data.results.forEach(employee => {
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
      
        

        // const html = `
        //     <div class="card">
        //         <div class="card-img-container">
        //             <img class="card-img" src=${first.picture.large} alt="profile picture">
        //         </div>
        //         <div class="card-info-container">
        //             <h3 id="name" class="card-name cap">${first.name.first} ${first.name.last}</h3>
        //             <p class="card-text">${first.email}</p>
        //             <p class="card-text cap">${first.location.city}, ${first.location.state}</p>
        //         </div>
        //     </div>
        // `;
        // gallery.insertAdjacentHTML('beforeend', html)
    };



fetch('https://randomuser.me/api/?results=12&')
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
    .then(data => getData(data))
