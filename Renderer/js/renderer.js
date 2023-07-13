const draggables = document.querySelectorAll(".card");
const droppables = document.querySelectorAll(".swim-lane");
const form1 = document.getElementById("todo-form1");
const form2 = document.getElementById("todo-form2");
const todoLane1 = document.getElementById("todo-lane1");
const todoLane2 = document.getElementById("todo-lane2");

function saveKanbanData() {
	const lanesData = [todoLane1, todoLane2].map((lane) => {
		const cards = Array.from(lane.querySelectorAll(".card-text"));
		return cards.map((card) => card.innerText);
	});

	localStorage.setItem("kanbanData", JSON.stringify(lanesData));
}

function loadKanbanData() {
	const savedData = localStorage.getItem("kanbanData");

	if (savedData) {
		const lanesData = JSON.parse(savedData);

		[todoLane1, todoLane2].forEach((lane, laneIndex) => {
			lanesData[laneIndex].forEach((cardText) => {
				createKanbanCard(lane, cardText, true);
			});
		});
	}
}

// * Code that was refactored
// function toggleDropDown1() {
// 	const dropDown = document.getElementById("drop-down-1");
// 	dropDown.classList.toggle("hidden");
// }

// function toggleDropDown2() {
// 	const dropDown = document.getElementById("drop-down-2");
// 	dropDown.classList.toggle("hidden");
// }

// document.getElementById("menu-1").addEventListener("click", toggleDropDown1);
// document.getElementById("menu-2").addEventListener("click", toggleDropDown2);

// function toggleLock() {
// 	const menuLock = document.getElementById("lock-menu-1");
// 	const menuLock2 = document.getElementById("lock-menu-2");
// 	const container = document.getElementById("body");

// 	menuLock.addEventListener("click", () => {
// 		container.classList.toggle("no-drag");
// 	});
// 	menuLock2.addEventListener("click", () => {
// 		container.classList.toggle("no-drag");
// 	});
// }

function toggleDropDown(dropDown, menu) {
	menu.addEventListener("click", () => {
		dropDown.classList.toggle("hidden");
	});
}

toggleDropDown(
	document.getElementById("drop-down-1"),
	document.getElementById("menu-1")
);
toggleDropDown(
	document.getElementById("drop-down-2"),
	document.getElementById("menu-2")
);

function toggleLock() {
	const menuLock1 = document.getElementById("lock-menu-1");
	const menuLock2 = document.getElementById("lock-menu-2");
	const container = document.getElementById("body");

	menuLock1.addEventListener("click", () => {
		container.classList.toggle("no-drag");
	});
	menuLock2.addEventListener("click", () => {
		container.classList.toggle("no-drag");
	});
}

draggables.forEach((card) => {
	card.addEventListener("dragstart", (e) => {
		card.classList.add("is-dragging");
		card.classList.add("scale-105");
		card.classList.add("bg-blue-600");
		e.dataTransfer.setDragImage(new Image(), 0, 0);
	});
	card.addEventListener("dragend", () => {
		card.classList.remove("scale-105");
		card.classList.remove("bg-blue-600");
		card.classList.remove("is-dragging");
	});
});

droppables.forEach((zone) => {
	zone.addEventListener("dragover", (e) => {
		e.preventDefault();

		const bottomcard = insertAbovecard(zone, e.clientY);
		const curcard = document.querySelector(".is-dragging");

		if (!bottomcard) {
			zone.appendChild(curcard);
		} else {
			zone.insertBefore(curcard, bottomcard);
		}
	});
});

const insertAbovecard = (zone, mouseY) => {
	const els = zone.querySelectorAll(".card:not(.is-dragging)");

	let closestcard = null;
	let closestOffset = Number.NEGATIVE_INFINITY;

	els.forEach((card) => {
		const { top } = card.getBoundingClientRect();

		const offset = mouseY - top - 10;

		if (offset < 0 && offset > closestOffset) {
			closestOffset = offset;
			closestcard = card;
		}
	});

	return closestcard;
};

function createKanbanCard(lane, cardText, prepend = false) {
	const newTask = document.createElement("p");
	newTask.classList.add("card");
	newTask.setAttribute("draggable", "true");

	const deleteButtonContainer = document.createElement("div");
	deleteButtonContainer.classList.add("delete-button-container");
	newTask.appendChild(deleteButtonContainer);

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete-button");
	deleteButton.innerHTML = `
	<svg
	xmlns="http://www.w3.org/2000/svg"
	width="16"
	height="16"
	viewBox="0 0 16 16"
	version="1.1"
	fill="#ff0000"
>
	<path
		style="fill: gray"
		d="M 5,4 C 4.4477,4 4,4.4477 4,5 4,5.2652 4.1055,5.5195 4.293,5.707 L 10.293,11.707 C 10.48,11.895 10.735,12 11,12 11.552,12 12,11.552 12,11 12,10.735 11.895,10.48 11.707,10.293 L 5.707,4.293 C 5.5195,4.1055 5.2652,4 5,4 Z"
	/>
	<path
		style="fill: gray"
		d="M 5,12 C 4.4477,12 4,11.552 4,11 4,10.735 4.1055,10.48 4.293,10.293 L 10.293,4.293 C 10.48,4.105 10.735,4 11,4 11.552,4 12,4.448 12,5 12,5.265 11.895,5.52 11.707,5.707 L 5.707,11.707 C 5.5195,11.895 5.2652,12 5,12 Z"
	/>
</svg>
`;
	deleteButtonContainer.appendChild(deleteButton);

	const newParagraph = document.createElement("p");
	newParagraph.classList.add("card-text");
	newParagraph.setAttribute("contenteditable", "true");
	newParagraph.innerText = cardText;
	newTask.appendChild(newParagraph);

	// Add the input event listener to save data while typing
	newParagraph.addEventListener("input", () => {
		saveKanbanData();
	});

	deleteButton.addEventListener("click", () => {
		newTask.remove(); // Remove the card from the DOM
		saveKanbanData(); // Save the updated data to local storage
	});

	newTask.addEventListener("dragstart", (e) => {
		newTask.classList.add("is-dragging");
		newTask.classList.add("scale-105");
		newTask.classList.add("bg-blue-600");
		e.dataTransfer.setDragImage(new Image(), 0, 0);
	});
	newTask.addEventListener("dragend", () => {
		newTask.classList.remove("scale-105");
		newTask.classList.remove("bg-blue-600");
		newTask.classList.remove("is-dragging");
		saveKanbanData(); // Save the new card arrangement after dragging
	});

	if (!prepend) {
		lane.prepend(newTask); // Inserts the new task at the beginning of the lane when loading
	} else {
		lane.appendChild(newTask); // Inserts the new task at the end of the lane when creating a new task
	}
}

// * Code that was refactored
// form1.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	createKanbanCard(todoLane1, " ");
// 	saveKanbanData();
// });

// form2.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	createKanbanCard(todoLane2, " ");
// 	saveKanbanData();
// });

function attachSubmitListener(form, todoLane) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		createKanbanCard(todoLane, " ");
		saveKanbanData();
	});
}

attachSubmitListener(form1, todoLane1);
attachSubmitListener(form2, todoLane2);

loadKanbanData();
toggleLock();
