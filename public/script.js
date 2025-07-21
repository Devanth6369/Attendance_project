document.addEventListener("DOMContentLoaded", () => {
    const takeAttendanceBtn = document.getElementById("takeAttendance");
    const attendanceSection = document.getElementById("attendanceSection");
    const studentListDiv = document.getElementById("studentList");
    const submitAttendanceBtn = document.getElementById("submitAttendance");

    let students = [];

    // Fetch student data from backend
    takeAttendanceBtn.addEventListener("click", async () => {
        const response = await fetch("/students");
        students = await response.json();
        studentListDiv.innerHTML = ""; // Clear previous list
        students.forEach(student => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = true;
            checkbox.id = student;

            const label = document.createElement("label");
            label.htmlFor = student;
            label.textContent = student;

            const div = document.createElement("div");
            div.appendChild(checkbox);
            div.appendChild(label);

            studentListDiv.appendChild(div);
        });
        attendanceSection.classList.remove("hidden");
    });

    // Submit attendance
    submitAttendanceBtn.addEventListener("click", async () => {
        const absentStudents = students.filter(student => !document.getElementById(student).checked);
        
        const response = await fetch("/submit-attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ absentStudents })
        });

        const message = await response.text();
        alert(message);
    });
});
