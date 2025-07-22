let habits = JSON.parse(localStorage.getItem("habits")) || [];

function renderHabits() {
	const container = document.getElementById("habit-list");
	container.innerHTML = "";

	habits.forEach((habit, index) => {
		const habitEl = document.createElement("div");
		habitEl.className = "habit";
		habitEl.innerHTML = `
      <div class="habit-name">${habit.name}</div>
      <div class="habit-days">${renderDays(habit.days, index)}</div>
    `;
		container.appendChild(habitEl);
	});
}

function renderDays(days, habitIndex) {
	const weekDays = 7;
	return [...Array(weekDays)]
		.map((_, i) => {
			const checked = days[i] ? "checked" : "";
			return `<span class="day-checkbox ${checked}" data-habit="${habitIndex}" data-day="${i}"></span>`;
		})
		.join("");
}

function toggleDay(habitIndex, dayIndex) {
	habits[habitIndex].days[dayIndex] = !habits[habitIndex].days[dayIndex];
	saveHabits();
	renderHabits();
}

function saveHabits() {
	localStorage.setItem("habits", JSON.stringify(habits));
}

document.getElementById("habit-list").addEventListener("click", (e) => {
	if (e.target.classList.contains("day-checkbox")) {
		const habitIndex = e.target.dataset.habit;
		const dayIndex = e.target.dataset.day;
		toggleDay(habitIndex, dayIndex);
	}
});

document.getElementById("add-habit").addEventListener("click", () => {
	const name = prompt("Enter new habit:");
	if (name) {
		habits.push({ name, days: Array(7).fill(false) });
		saveHabits();
		renderHabits();
	}
});

renderHabits();
