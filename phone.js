// ------display correction when spinner Showing------//
const spinnerShowing = (info) => {
    document.getElementById("spinner").style.display = info;
}
const productBoxShowing = (info) => {
    document.getElementById("product-box").style.display = info;
}
const moreDetailsShowing = (info) => {
    document.getElementById("more-details").style.display = info;
}
// ---phones info findout by search result from Phones API------//
const phonesApi = () => {
    spinnerShowing("block");
    productBoxShowing("none");
    moreDetailsShowing("none");
    document.getElementById("show-more").style.display = "none";
    const input = document.getElementById("input-box");
    const inputValue = input.value;
    // console.log(inputValue);
    // input.value = "";
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => apiInformation(data.data))
}

// ----------showing searching phones-----------//

const apiInformation = (info) => {
    const data = info.slice(0, 20);
    // console.log(info.length);
    // ----no result found error handle----//
    if (data.length == 0) {
        spinnerShowing("none");
        const input = document.getElementById("input-box");
        input.value = "";
        alert("No Result Found");
        document.getElementById("show-more").style.display = "none";

    }
    const productsfield = document.getElementById("product-box");
    productsfield.innerHTML = "";

    //---------------- phones appending-------------//

    const appending = (data) => {
        data.forEach(phone => {
            // console.log(phone);
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                    <div class="card h-100 shadow rounded border-0">
                        <img  class="w-75" src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand}</p>
                            <button onclick="moreDetails('${phone.slug}')" class="btn btn-primary" type="submit">Details</button>
                        </div>
                    </div>
                `;
            productsfield.appendChild(div);
            productBoxShowing("flex");
            spinnerShowing("none");

        })
    }
    appending(data);
    // ---------------see more showing-------------//
    if (info.length > 20) {
        const data1 = info.slice(20, info.length);
        // console.log(data1.length);
        document.getElementById("show-more").style.display = "block";
        const someInput = document.getElementById('show-more');
        someInput.addEventListener('click', myFunc, false);
        someInput.myParam = data1;
        function myFunc(evt) {
            console.log(evt.currentTarget.myParam);
            appending(evt.currentTarget.myParam);
            document.getElementById("show-more").style.display = "none";
            document.getElementById("previous").style.display = "block";
            const productsfield = document.getElementById("product-box");
            productsfield.scrollIntoView();
        }
    }
    document.getElementById("previous").style.display = "none";
}

// ---------More Details collect from API----------//
const moreDetails = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => moreformation(data.data))
}
//---------- More Details showing -------------// 
const moreformation = (data) => {
    // console.log(data);
    const moreDetailsfield = document.getElementById("more-details");
    moreDetailsfield.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mx-auto shadow rounded border-0" style="width: 18rem;">
    <img  class="w-75 p-1" src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.brand}</p>
      <p>ReleaseDate:${data.releaseDate ? data.releaseDate : " Release Date not Found"}</p>
    </div>
    <p class="text-center text-danger">Main Features:</p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="text-primary">Storage: </span> ${data.mainFeatures.storage}</li>
      <li class="list-group-item"><span class="text-primary">DisplaySize: </span>${data.mainFeatures.displaySize}</li>
      <li class="list-group-item"><span class="text-primary">ChipSet: </span>${data.mainFeatures.chipSet}</li>
      <li class="list-group-item"><span class="text-primary">Memory: </span>${data.mainFeatures.memory}</li>
      <li class="list-group-item"><span class="text-primary">Sensors: </span>${data.mainFeatures.sensors}</li>
    </ul>
    <p class="text-center text-danger">Others:</p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="text-primary">WLAN: </span> ${data.others?.WLAN}</li>
      <li class="list-group-item"><span class="text-primary">Bluetooth: </span>${data.others?.Bluetooth}</li>
      <li class="list-group-item"><span class="text-primary">GPS: </span>${data.others?.GPS}</li>
      <li class="list-group-item"><span class="text-primary">USB: </span>${data.others?.USB}</li>
    </ul>
  </div>
        `;
    moreDetailsfield.appendChild(div);
    moreDetailsShowing("block");
    moreDetailsfield.scrollIntoView();
}
