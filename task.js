console.log("hello")
const duedate=document.getElementById("duedate")
const d=new Date();
const date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
console.log(date)
const taskinput=document.getElementById("getinput");
const element=document.getElementById("showtask");
const elementleft=document.getElementById("showtaskleft");
const elementdone=document.getElementById("showtaskdone");
const tasks=document.getElementById("totaltask");
const taskleft=document.getElementById("taskleft");
const taskdone=document.getElementById("taskdone");
const descriptionbox=document.getElementById("discription")
const text=document.getElementById("discripttopic")
const user=document.getElementById("userselect")
const completed=document.getElementById("completedtask")
const inprogress=document.getElementById("inprogresstask")
const taskbox=document.getElementById("taskbox")
// the object to store the information of a user
var taskDetail={};
var i=0;
var count=0;

showtask()
if(localStorage.getItem("data")==="")
{
   console.log("clear storage")
   localStorage.clear();
   location.reload();
}
function returntomain()
{
   descriptionbox.style.display="none"
   element.style.display="block"
} 
// To add Discription of task 
function adddiscription(topicdes,destask){
      
      console.log("The discription is :"+destask)
      console.log("The title recieved is :"+topicdes)
      var c
      var des
      for(c=0;c<10;c++)
      {
          var item=JSON.parse(window.localStorage.getItem(c))
          des=item.title
          console.log(des)
         if(des===topicdes){
            console.log("The title is : "+item.title)
              item.discript=destask;
              window.localStorage.setItem(c,JSON.stringify(item))
              SaveData();
              location.reload()
         }
      }
   }
function functask()
{
   elementleft.style.display="none"
   element.style.display="block"
   taskbox.style.height="450px"
}
function funcleft()
{
   count++;
   elementleft.style.display="block"
   element.style.display="none"
   taskbox.style.height="800px"
   console.log(count)
   if(count>=2)
   {
     location.reload();
     alert("Plese click Again to view Tasklist !!")
   }
   addlefttask();
}
// To add new task and its details
function addnewtask()
{
  if(taskinput.value===null)
  {
   alert("Please enter some task input!!")
  }
  else{
   elementleft.style.display="none"
   let li=document.createElement("li");
   li.innerHTML=taskinput.value;
   console.log(li.innerHTML);
   console.log(user.value)
   element.appendChild(li);
   taskinput.value="";
   let edit=document.createElement("img")
   edit.src="edit(1).png"
   edit.style.left="400px"
   edit.style.position="absolute"
   edit.style.transform="translate(1px,-3px)"
   edit.style.height="23px"
   edit.style.width="23px"
   li.appendChild(edit);
   let remove=document.createElement("span");
   li.appendChild(remove);
   let date=document.createElement("div")
   date.style.display="flex"
   date.style.justifyContent="space-between"
   let duedatediv=document.createElement("div")
   duedatediv.innerHTML="duedate :"+duedate.value
   duedatediv.style.color="black"
   duedatediv.style.width="200px"
   let currdatediv=document.createElement("div")
   currdatediv.innerHTML="CurrentDate :"+d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
   currdatediv.style.color="black"
   var des=document.getElementById("myDiv")
   taskDetail.title=li.innerText
   taskDetail.DueDate=duedate.value
   taskDetail.currDate=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
   taskDetail.assigned=user.value
   taskDetail.status="In-progress"
   console.log(taskDetail)
   window.localStorage.setItem(i++,JSON.stringify(taskDetail))
   SaveData();
   }
}
// To Edit , check status and delete the task
element.addEventListener("click",function(eve){
   if(eve.target.tagName==="IMG")
   {
      console.log("you are here")
      descriptionbox.style.display="block"
      element.style.display="none"
      alert("Press 'ENTER KEY' when you are done with your Discrption.")
      text.addEventListener("keypress",function(e)
      {
         if(e.key==="Enter")
         {
            var discription=text.value
      console.log("The discription is : "+discription)
            adddiscription(eve.target.parentElement.innerText,discription);
         }
      })
      
   }
   else if(eve.target.tagName==="LI"){
      console.log("hi")
      eve.target.classList.toggle("checked");
      SaveData();
      for(c=0;c<localStorage.length;c++)
          {
              var item=JSON.parse(window.localStorage.getItem(c))
              if(item.title===eve.target.innerText)
              {
                        console.log(item)
                         item.status="completed";
                         console.log(item)
                         window.localStorage.setItem(c,JSON.stringify(item))
                         
              }
          }
      adddonetask(eve.target.innerText);
      removetask(eve.target.innerText);  
   }
   else if(eve.target.tagName==="SPAN")
   {
      console.log("hi")
      eve.target.parentElement.remove();
     
      console.log("The title elemnet that should be delted is : "+ eve.target.parentElement.innerText)
      for(c=0;c<10;c++)
          {
            if(localStorage.getItem(c)!=null){
              var item=JSON.parse(window.localStorage.getItem(c))
              if(item.title===eve.target.parentElement.innerText)
              {
               console.log("In delete section : "+eve.target.parentElement.innerText)
               console.log("The titl of the item  is:"+item.title)
                  window.localStorage.removeItem(c)
              }
            }
          }
          SaveData();
   }
},false);
// To add items to localStorage
function SaveData()
{
   window.localStorage.setItem("data",element.innerHTML);
}
// To show items to Element on page
function showtask()
{
   elementleft.style.display="none"
   element.style.display="block"
   element.innerHTML=window.localStorage.getItem("data");
}

// To show the Task list and their details 
function addlefttask()
{
   elementleft.style.display="block" 
   element.style.display="none" 
 var j=0;
 if(elementleft.innerText=="")
 {alert("Please enter the task to view them !!!")}
   for(j=0;j<10;j++)
   {
      if(window.localStorage.getItem(j)!=null){
      let li=document.createElement("div");
      li.style.color="black"
      var arr=JSON.parse(window.localStorage.getItem(j))
      var array="\n"+(j+1)+") Title : "+arr.title+"\nAssigned : "+arr.assigned+"\nDue-Date : "+arr.DueDate+"\nCurrent-Date : "+arr.currDate+"\nStatus : "+arr.status+"\nDiscription : "+arr.discript+"\n";
      li.innerText=array
      if(arr.status="In-progress")
      {
         inprogress.appendChild(li)
      }
      else if(arr.status="completed"){
         completed.appendChild(li)
      }
      elementleft.appendChild(li);
      console.log(JSON.parse(window.localStorage.getItem(j)))
      }
   }
   
}

function adddonetask(text)
{
   console.log("The text we got here is : "+text)
   let li=document.createElement("li");
   li.innerHTML=text;
   elementdone.appendChild(li);
}
function funcdone()
{
   elementdone.style.display="block"
   elementleft.style.display="none"
   element.style.display="none"
}