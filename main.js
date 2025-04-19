function getToday() {

    let currentDate = new Date().toISOString().split("T")[0];
    let dateId = document.getElementById("event-date")
    dateId.min = currentDate
    dateId.addEventListener("input", ()=> {
        if(dateId.value < currentDate) { 
            dateId.value = currentDate;
        }
    })
}

function addEvent() {
    let eventName = document.getElementById("event-name").value;
    let orgName = document.getElementById("org-name").value;
    let dateEvent = document.getElementById("event-date").value;
    let timeUntilEvent = new Date(dateEvent).getTime()
    // BIG-BANG ---------- TODAY ---------- TIME UNTIL EVENT

    // Validation
     if (eventName  && orgName  && dateEvent) {
        const event = {
            name: eventName,
            organizer : orgName,
            date : dateEvent,
            timeStamp: timeUntilEvent
        }
        
            // Push the changes
        let events = JSON.parse(localStorage.getItem("events")) || [] ;
        events.push(event)
        localStorage.setItem("events" , JSON.stringify(events)) 
            // Clear the fields after click
        let allInputs = document.querySelectorAll("input");
        allInputs.forEach((input) => (input.value= ""))
            Swal.fire({
                title: "Good job!",
                text: "Your Event Has Been Added!",
                icon: "success"
            });
        displayEvents()
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Looks like some fields are missing",
          });
    }
}

function displayEvents() {
    let eventCont = document.getElementById("events");
    let events = JSON.parse(localStorage.getItem("events")) || [];
    eventCont.innerHTML =''
    events.forEach((event,index)=> {
        let now = new Date().getTime();
        let timeLeft = event.timeStamp - now;
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        let hours = Math.floor(timeLeft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        let mins = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60))
        let secs = Math.floor(timeLeft % (1000 * 60) / (1000)) 
        let cooldown = `${days}D ${hours}H ${mins}M ${secs}S`

        eventCont.innerHTML += `
            <div class="event-con">
            <h3>${event.organizer}</h3>
            <p><b>Event Name: </b> ${event.name}</p>
            <p><span> On </span>${event.date}</p>
            <p><span> Time Left:</span> ${cooldown} </p>
            <button id="delete" onclick="deleteEvent(${index})"> Delete </button>
            </div>
        `
        })
}

function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events"))
    events.splice(index,1)
    localStorage.setItem("events" , JSON.stringify(events))
    Swal.fire({
        title: "Deleted!",
        icon: "success",
        draggable: true
      });
    displayEvents();
}


displayEvents();
getToday();
setInterval(displayEvents , 1000)

