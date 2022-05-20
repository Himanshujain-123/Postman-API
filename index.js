// get for read
// POST FOR CREATE
// PUT FOR UPDATE
// DELETE FOR DELETE

let addedParamCount = 0;
//utility function
//utility function to get DOM elemnts from string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild;

}

//  hide the parameter box initially
let parameterBox = document.getElementById('parameterBox')
parameterBox.style.display = 'none'

//  if the user click on params box hide the json boxparams
paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    parameterBox.style.display = 'block';

})

jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})
/// if the uer click on +button then add more parameter
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = ` <div class="row my-3">
                                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                                <div class="col-md-4">

                                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} key">
                                </div>
                                <div class="col-md-4">

                                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} value">

                                    </div>
                                    <button id="addParam" class="btn btn-primary deleteParam col-sm-1 " >-</button>

                            </div>`
    let paramElement = getElementFromString(string);
     console.log(paramElement ,12)
    params.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //adda a confirmation box 
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

//if the user click on sumit button
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = "Please Wait... Fetching Response"
    //fetch all the value entered by value
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    //log all the value on console for debugging
    //if param option has been choosed
    data = {};
    if (contentType ==='params') {
        console.log(addedParamCount)
        for (let i = 0; i < addedParamCount + 1; i++) {
            // why i+1 is not working
            if (document.getElementById('parameterKey' +(i+1)) != undefined) {
                 console.log("entered")
                let key = document.getElementById('parameterKey' +(i+1)).value;
                let value = document.getElementById('parameterValue' +(i+1)).value;
                data[key] = value;
                // console.log( "data is" ,data);
             }
        }
        data = JSON.stringify(data);
    }
    else{
        data=document.getElementById('requestJsonText').value;
        
    }
    console.log ("data is" ,data);
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    if(requestType=="GET"){
    fetch(url,{
        method:'GET'
    
    })
    .then(response =>response.text())
    .then((text)=>{
        console.log(text);
         document.getElementById('responsePrism').innerHTML=text;
         Prism.highlightAll();
    });
    }
    else{
   
         fetch(url,{
            method:'POST',
            body:data,
             headers: {
                 'Content-type': 'application/json; charset=UTF-8',
                }
        })
         .then(response =>response.text())
         .then((text)=>{
            console.log(text);
              document.getElementById('responsePrism').innerHTML=text;
              Prism.highlightAll();
       
        });


    }
})


