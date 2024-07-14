$(document).ready(function() {

    closeSideNav();

    $('.loading .loader')
        .fadeOut(1000,function(){
            $(this).parent()
                .fadeOut(1000,function(){
                    $('body')
                        .css('overflow','auto');
                    $(this).remove(); // Remove the loader element from the DOM
                });
        });

    const navTab = document.getElementById('navTab');
    const sideNav = document.getElementById('sideNav');
    const openTab = document.getElementById('openTab');
    const closeTab = document.getElementById('closeTab');
    const container1 = document.getElementById('container1');
    const container2 = document.getElementById('container2');
    const rowData = document.getElementById('rowData');
    const searchName = document.getElementById('searchh');
    const category = document.getElementById('Category');
    const area = document.getElementById('Area');
    const Description = document.getElementById('Description');
    var nameInput = document.getElementById('nameInput')
    var emailInput = document.getElementById('emailInput')
    var phoneInput = document.getElementById('phoneInput')
    var ageInput = document.getElementById('ageInput')
    var passInput = document.getElementById('passInput')
    var Repass = document.getElementById('Repass')
    var Submit = document.getElementById('Submit')
    var ContactUsBtn = document.getElementById('ContactUsBtn')
    var Contact = document.getElementById('Contact')




    
    async function apiFetchSearch() {
        var mealName = document.getElementById('MealName').value.toLowerCase();
        var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        
        if (!res.ok) {
            throw new Error('Failed to fetch: ' + res.status);
        }
    
        var data = await res.json();
        const mealImages = document.getElementById('mealImages');
        mealImages.innerHTML = ''; // Clear previous images
    
        if (data.meals && data.meals.length > 0) {
            data.meals.forEach(meal => {
                const mealHtml = `
                    <div class="col-md-3">
                        <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal">
                            <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}">
                            <div class="meal-layer d-flex justify-content-center align-items-center position-absolute text-center text-black p-2">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `;
                mealImages.insertAdjacentHTML('beforeend', mealHtml);
            });
        } else {
            mealImages.innerHTML = 'No meals found';
        }
    }
    

    document.getElementById('MealName').addEventListener('input', async function() {
        await new Promise(resolve => setTimeout(resolve, 300));
        await apiFetchSearch();
    });

    searchName.addEventListener('click', function() {
        container1.classList.replace('d-block', 'd-none');
        container2.classList.replace('d-none', 'd-block');
    });

    async function displayData() {
        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();
            let cartoona = "";

            for (let i = 0; i < data.meals.length; i++) {
                cartoona += `
                    <div class="col-md-3">
                        <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal">
                            <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
                            <div class="meal-layer position-absolute text-center text-black p-2">
                                <h3>${data.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `;
            }

            rowData.innerHTML = cartoona;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getCategories() {
        try {
            var res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            if (!res.ok) {
                throw new Error('failed to fetch categories');
            }
            const data = await res.json();
            let cartoona = "";

            for (var i = 0; i < data.categories.length; i++) {
                cartoona += `
                    <div class="col-md-3">
                        <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal">
                            <img src="${data.categories[i].strCategoryThumb}" class="w-100" alt="${data.categories[i].strCategory}">
                            <div class="meal-layer position-absolute text-center text-black p-2">
                                <h3>${data.categories[i].strCategory}</h3>
                                <p>${data.categories[i].strCategoryDescription.split(' ').splice(0,20).join(' ')}....etc</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            rowData.innerHTML = cartoona;
            container1.classList.replace('d-none', 'd-block');
            container2.classList.replace('d-block', 'd-none');
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    category.addEventListener('click', getCategories);
    displayData();

    async function getArea() {
        try {
            rowData.innerHTML = '';
            var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
            if (!res.ok) {
                throw new Error('failed to fetch Areas');
            }

            var data = await res.json();
            let cartoona = '';
            for (var i = 0; i < data.meals.length; i++) {
                cartoona += `
                    <div class="col-md-3">
                        <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal">
                            <i class="fa-solid fa-4x fa-house-laptop"></i>
                            <p>${data.meals[i].strArea}</p>
                        </div>
                    </div>
                `;
            }
            rowData.innerHTML = cartoona;
            container1.classList.replace('d-none', 'd-block');
            container2.classList.replace('d-block', 'd-none');
        } catch (err) {
            console.log(err);
        }
    }

    area.addEventListener('click', getArea);

    async function getDescription() {
        try {
            rowData.innerHTML = '';
            var res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            if (!res.ok) {
                throw new Error('failed to fetch Desc');
            }

            var data = await res.json();
            let cartoona = '';
            for (var i = 0; i < data.categories.length; i++) {
                cartoona +=  `
                <div class="col-md-3">
                    <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal">
                        <div class="d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-4x fa-drumstick-bite"></i>
                        </div>
                            <h3 class="text-center">${data.categories[i].strCategory}</h3>
                            <p class="text-center">${data.categories[i].strCategoryDescription.split(' ').splice(0,20).join(' ')}...etc</p>
                    </div>
                </div>
            `;
            }
            rowData.innerHTML = cartoona;
            container1.classList.replace('d-none', 'd-block');
            container2.classList.replace('d-block', 'd-none');
        } catch (err) {
            console.log(err);
        }
    }

    Description.addEventListener('click', getDescription);






    function inputCheck() {
        var nameValue = nameInput.value.trim();
        var emailValue = emailInput.value.trim();
        var ageValue = ageInput.value.trim();
        var phoneValue = phoneInput.value.trim();
        var passValue = passInput.value.trim();
        var repassValue = Repass.value.trim();
    
        var nameRegex = /^[a-zA-Z\s]+$/; 
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        var ageRegex = /^\d+$/;  
        var phoneRegex = /^01[0125][0-9]{8}$/;  
        var passRegex = /^.{6,}$/;  
        var repassRegex = new RegExp('^' + passValue + '$'); 
    
        var nameValid = nameRegex.test(nameValue);
        var emailValid = emailRegex.test(emailValue);
        var ageValid = ageRegex.test(ageValue);
        var phoneValid = phoneRegex.test(phoneValue);
        var passValid = passRegex.test(passValue);
        var repassValid = repassRegex.test(repassValue);
    
        var additionalValidation = true; 
    
        if (nameValid && emailValid && ageValid && phoneValid && passValid && repassValid && additionalValidation) {
            Submit.classList.remove('disabled');
            Submit.classList.add('d-block');
        } else {
            Submit.classList.remove('d-block');
            Submit.classList.add('disabled');
        }
    }
    
    // Function to show contact form
    function showContacts() {
        rowData.innerHTML = `
            <div id="Contact" class="container justify-content-center align-items-center min-vh-100 w-75 text-center container3">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input type="text" id="nameInput" class="form-control bg-white text-black" placeholder="Enter Your Name">
                    </div>
                    <div class="col-md-6">
                        <input type="email" id="emailInput" class="form-control bg-white text-black" placeholder="Enter Your Email">
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="phoneInput" class="form-control bg-white text-black" placeholder="Enter Your Phone">
                    </div>
                    <div class="col-md-6">
                        <input type="number" id="ageInput" class="form-control bg-white text-black" placeholder="Enter Your Age">
                    </div>
                    <div class="col-md-6">
                        <input type="password" id="passInput" class="form-control bg-white text-black" placeholder="Enter Your Password">
                    </div>
                    <div class="col-md-6">
                        <input type="password" id="Repass" class="form-control bg-white text-dark-emphasis" placeholder="Enter Your Repassword">
                    </div>
                    <button id="Submit" class="btn btn-outline-danger disabled">Submit</button>
                </div>
            </div>`;
        
        nameInput = document.getElementById('nameInput');
        emailInput = document.getElementById('emailInput');
        ageInput = document.getElementById('ageInput');
        phoneInput = document.getElementById('phoneInput');
        passInput = document.getElementById('passInput');
        Repass = document.getElementById('Repass');
        Submit = document.getElementById('Submit');
    
        nameInput.addEventListener('keyup', inputCheck);
        emailInput.addEventListener('keyup', inputCheck);
        ageInput.addEventListener('keyup', inputCheck);
        phoneInput.addEventListener('keyup', inputCheck);
        passInput.addEventListener('keyup', inputCheck);
        Repass.addEventListener('keyup', inputCheck);
    }
    
    ContactUsBtn.addEventListener('click', showContacts);





    async function displayData() {
        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await res.json();
            let cartoona = "";
    
            for (let i = 0; i < data.meals.length; i++) {
                cartoona += `
                    <div class="col-md-3">
                        <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal" onclick="displayMealDetails('${data.meals[i].idMeal}')">
                            <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
                            <div class="meal-layer position-absolute text-center text-black p-2">
                                <h3>${data.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `;
            }
    
            rowData.innerHTML = cartoona;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    

    async function displayData() {
        try {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();
            let cartoona = "";

            for (let i = 0; i < data.meals.length; i++) {
                cartoona += `
                    <div class="col-md-3">
                        <div class="position-relative overflow-hidden rounded-2 cursor-pointer meal" onclick="displayMealDetails('${data.meals[i].idMeal}')">
                            <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
                            <div class="meal-layer position-absolute text-center text-black p-2">
                                <h3>${data.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
                `;
            }

            rowData.innerHTML = cartoona;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    
});

async function displayMealDetails(mealId) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch meal details');
        }
        const data = await res.json();
        const mealDetails = document.getElementById('mealDetails');
        let cartoona = '';

        for (let i = 0; i < data.meals.length; i++) {
            cartoona += `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                    <div class="col-md-8">
                        <h3>Instructions</h3>
                        <p>${data.meals[i].strInstructions}</p>
                        <h3>Area: ${data.meals[i].strArea}</h3>
                        <h3>Category: ${data.meals[i].strCategory}</h3>
                        <h3>Recipes:</h3>
                             <ul class="list-unstyled d-flex g-3 flex-wrap">
                            ${data.meals[i].strTags ? data.meals[i].strTags.split(',').map(tag => `<li class="alert alert-info m-2 p-1">${tag.trim()}</li>`).join('') : ''}
                        </ul>
                       <h3>Tags:</h3>

                        <a class="btn btn-success" target="_blank" href="${data.meals[i].strSource}">Source</a>
                        <a class="btn btn-danger" target="_blank" href="${data.meals[i].strYoutube}">YouTube</a>
                    </div>
                </div>
            `;
        }

        mealDetails.innerHTML = cartoona;
        $('#container1').removeClass('d-block').addClass('d-none');
        $('#mealDetails').removeClass('d-none').addClass('d-block');
    } catch (error) {
        console.error('Error displaying meal details:', error);
    }
}
function openSideNav() {
    $("#navTab").animate({
        left: 0
    }, 500).addClass('open');

    $("#navHeader").animate({
        left: '250px'
    }, 500).addClass('open');

    $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

    $(".links li").each(function (index) {
        $(this).delay((index + 1) * 100).animate({
            top: 0
        }, 300);
    });
}

function closeSideNav() {
    let boxWidth = $("#navTab").outerWidth();
    $("#navTab").animate({
        left: -boxWidth
    }, 2000).removeClass('open');

    $("#navHeader").animate({
        left: 0
    }, 2000).removeClass('open');

    $(".open-close-icon").removeClass("fa-x").addClass("fa-align-justify");

    $(".links li").animate({
        top: 300
    }, 2000);
}

function toggleSideNav() {
    if ($("#navTab").hasClass('open')) {
        closeSideNav();
    } else {
        openSideNav();
    }
}

