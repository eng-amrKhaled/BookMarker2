var bookmarkerNameInput = document.getElementById('bookmarkerName');
var bookmarkerUrlInput = document.getElementById('bookmarkerUrl');

submitContainer = [];

if (localStorage.getItem('submit') != null) {
    submitContainer = JSON.parse(localStorage.getItem('submit'));
    display();

}
console.log(submitContainer);

function submit() {
    if (
        validateForm(bookmarkerNameInput) &&
        validateForm(bookmarkerUrlInput)

    ) {
        var bookmarker = {
            code: bookmarkerNameInput.value,
            url: bookmarkerUrlInput.value
        }
        submitContainer.push(bookmarker);
        localStorage.setItem('submit', JSON.stringify(submitContainer));
        // console.log(submitContainer);
        clearForm();
        display()
    }
    else {


    }
}

function clearForm() {
    bookmarkerNameInput.value = null;
    bookmarkerUrlInput.value = null;

    bookmarkerNameInput.classList.remove('is-valid');
    bookmarkerUrlInput.classList.remove('is-valid');
}

function validateForm(ele) {
    var regix = {
        bookmarkerName: /^[a-z]{3,}$/i,
        bookmarkerUrl: /^https:\/\/[a-z]{3,20}.com$/
    }
    if (regix[ele.id].test(ele.value)) {
        console.log("match");
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')
        return true;

    }
    else {
        console.log("no match");
        ele.classList.remove('is-valid')
        ele.classList.add('is-invalid')
        return false;

    }
}

function display() {
    var cartona = ''
    for (var i = 0; i < submitContainer.length; i++) {
        cartona += `
             <div class="col-md-12 py-3">
                        <div class="move inner d-flex justify-content-around">
                            <span class="fw-bold">${i + 1}</span>
                            <p>${submitContainer[i].code}</p>
                            <button class="btn btn-success visit">
                            <a href ="${submitContainer[i].url}" target = "blank" class="text-decoration-none">
                             <i class="fa-solid fa-eye pe-2"></i> 
                            Visit
                            </a>
                           
                            
                            </button>
                            <button onclick = 'deleteSub(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
                            
                        </div>
                    </div>
        `
        document.getElementById('rowData').innerHTML = cartona;
    }
}

function deleteSub(deletedIndex) {
    submitContainer.splice(deletedIndex, 1);
    display();
    localStorage.setItem('submit', JSON.stringify(submitContainer))
}
