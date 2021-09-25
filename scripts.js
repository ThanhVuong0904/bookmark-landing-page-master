//Global variables
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Features
const tabsHeading = $$(".features-tab-item");
const tabsHeadingSpan = $$(".features-tab-item > span");
const tabContent = $$(".features-tab-content");

//Questions
const questionsItem = $$(".questions-item");
const questionsAnswer = $$(".questions-answer");
const arrowNormal = $$(".arrow-normal");
const pathNormal = $$(".path-normal");
//Contact
const contactAction = $(".contact-action");
const btnContact = $(".btn-contact");
const contactInput = $(".contact-input");
const formGroup = $(".form-group")
const formGroupSpan = $(".form-group > span");
const messenger = $(".messenger");
const style = window.getComputedStyle(contactAction);
let checkStyle = '';

function runApp() {
     handleFeatures();
     handleQuestions();
     handleContact();
}
function handleFeatures() {
     tabsHeading.forEach((tab, index) => {
          const content = tabContent[index];
          tab.addEventListener('click', ()=>{
               //If have class active in span, then remove it
               $(".features-tab-item > span.active").classList.remove('active');
               $(".features-tab-content.active-tab").classList.remove('active-tab');
               //And add another span
               tabsHeadingSpan[index].classList.add("active");
               content.classList.add('active-tab')
          })
     })
}
function handleQuestions() {
     questionsItem.forEach((item, index) =>{
          const currentHeight = item.offsetHeight;
          let newHeight = '';
          const answer = questionsAnswer[index];
          const arrow = arrowNormal[index];
          const path = pathNormal[index];
          item.addEventListener('click', ()=>{
               //offsetTop => padding-top
               console.log(answer.offsetTop)
               newHeight = (answer.offsetHeight + answer.offsetTop) + 'px';
               if(item.offsetHeight != currentHeight) {
                    item.style.height = currentHeight + "px";
               }
               else {
                    item.style.height = newHeight;
               }
               arrow.classList.toggle("route-arrow");
               path.classList.toggle("svg-color");
          })
     })
}
function ValidateEmail(mail) 
{
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
     {
          return true;
     }
     return false;
}
function showMess(text, type, color) {
     messenger.style.opacity = 1;
     messenger.innerHTML = text;
     messenger.classList.add(type)
     contactInput.style.border = `2px solid ${color}`;
}
function unShowMess() {
     messenger.style.opacity = 0;
     messenger.innerHTML = "";
     messenger.classList.remove("error")
     messenger.classList.remove("success")
     contactInput.style.border = `2px solid transparent`;
}
function formGroupMarginBottomRow(flexDirectionStyle, element) {
     if(flexDirectionStyle === "row") {
          element.style.marginBottom  = '0';
     }
}
function formGroupMarginBottomColumnHaveMess(flexDirectionStyle, element) {
     if(flexDirectionStyle === "column") {
          element.style.marginBottom  = '45px';
     }
}
function formGroupMarginBottomColumnNoMess(flexDirectionStyle, element) {
     if(flexDirectionStyle === "column") {
          element.style.marginBottom  = '15px';
     }
}
function handleContact() {
     //Button
     btnContact.addEventListener('click', ()=> {
          const contactValue = contactInput.value;
          const SoftRed = 'hsl(0, 94%, 66%)';
          if(!ValidateEmail(contactValue)) {
               showMess("Whoops, make sure it's an email", "error", SoftRed);
          }
          else {
               showMess("Successful", "success", "#28a745");
          }
          checkStyle = style.getPropertyValue('flex-direction');
          //margin-bottom current => 15px
          //if have messenger =>margin-bottom: 45px
          formGroupMarginBottomColumnHaveMess(checkStyle, formGroup);
          formGroupMarginBottomRow(checkStyle, formGroup);

     })
     //Input
     contactInput.addEventListener('keyup', (e)=> {
          unShowMess();
          formGroupMarginBottomColumnNoMess(checkStyle, formGroup);
          formGroupMarginBottomRow(checkStyle, formGroup);
     })
}

window.onresize = function() {
     checkStyle = style.getPropertyValue('flex-direction');
     unShowMess();
     //default flex-direction = row
     //=> don't need margin-bottom
     formGroupMarginBottomRow(checkStyle, formGroup);
     //flex-direction = column => is responsive
     //=> margin-bottom = 15px;
     formGroupMarginBottomColumnNoMess(checkStyle, formGroup);

}

runApp();