let baseUrl="https://latest.currency-api.pages.dev/v1/currencies/"
let dropdowns=document.querySelectorAll('.dropdown #From')
let btn=document.querySelector("form button")

let toCurr=document.querySelector('.from select')
let fromCurr=document.querySelector('.to select')

let msg=document.querySelector('.msg')


for(let select of dropdowns){
    for (currCode in countryList){
       let newOption=document.createElement('option')
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name==="From" && currCode==='USD'){
        newOption.selected="selected"
       }else if(select.name==="To" && currCode==='INR'){
        newOption.selected="selected"
       }
       select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

let updateFlag=(ele)=>{
   let currCode=ele.value;
   let countyCode=countryList[currCode]
   let newSrc=`https://flagsapi.com/${countyCode}/flat/64.png`
  let img= ele.parentElement.querySelector('img')
  img.src=newSrc;
}


btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector('.amount input')
    let amtval= amount.value
    if(amtval==="" || amtval <1){
        amtval=1;
        amount.value="1"
    }

    let url=`${baseUrl}${toCurr.value.toLowerCase()}.json`;
    let resp=await fetch(url);
    let data=await resp.json();
    let rate=data[toCurr.value.toLowerCase()]
    let finalamt=rate.inr*amount.value;
    msg.innerText=`${amtval} ${fromCurr.value}=${finalamt} ${toCurr.value}`

})

