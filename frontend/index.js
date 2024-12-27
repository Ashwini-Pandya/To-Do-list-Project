const res = document.getElementById("main");
const uploadbtn = document.getElementById("upload-btn");
const taskinput = document.getElementById("task-field");

// Function to fetch and display the todo list
function GetToDoList() {
  fetch("http://localhost:4000/todos/")
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      const todolist = document.createElement("ul"); // Create the <ul> element outside the loop
      data.forEach((task) => {
        const listItem = document.createElement("li"); // Create <li> for each task
        listItem.innerHTML = `${task.task}`; // Use backticks for template literals
        todolist.appendChild(listItem); // Append <li> to <ul>
      });
      res.appendChild(todolist); // Append <ul> to the main element
    })
    .catch((error) => console.error("Error fetching the todo list:", error)); // Handle errors
}

// Function to handle uploading a new task
function uploadtask() {
  const taskInput = taskinput.value;
  if (!taskInput) {
    alert("Task cannot be empty!");
    return;
  }

  const newTask = {
    task: taskInput,
  };

  fetch("http://localhost:4000/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Task uploaded:", data);
      window.location.href = "index.html"; // Redirect to the main page
    })
    .catch((error) => console.error("Error uploading task:", error));
}

// Event listener for the upload button
uploadbtn.addEventListener("click", uploadtask);

// Initial fetch of the todo list
GetToDoList();
