class Student {
    constructor(name, grid, contactNo, emailId, gender, dob) {
        this.name = name;
        this.grid = grid;
        this.contactNo = contactNo;
        this.emailId = emailId;
        this.gender = gender;
        this.dob = dob;
    }
}

class stuManage {
    constructor() {
        this.students = [];
    }

    create(studentObj) {
        this.students.push(studentObj);
        this.display();
    }

    display() {
        let studentList = document.getElementById("studentTable");
        studentList.innerHTML = "";

        this.students.forEach((student, idx) => {
            let row = `<tr>
                        <td>${student.name}</td>
                        <td>${student.grid}</td>
                        <td>${student.contactNo}</td>
                        <td>${student.emailId}</td>
                        <td>${student.gender}</td>
                        <td>${student.dob}</td>
                        <td class="d-flex flex-nowrap align-item-center gap-2">
                            <button class="btn btn-sm btn-warning" onclick="updateStudent(${idx})">📝</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${idx})"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>`;
            studentList.innerHTML += row;
        });
    }

    update(idx, studentUpdate) {
        this.students[idx] = studentUpdate;
        this.display();
    }

    delete(idx) {
        this.students.splice(idx, 1);
        this.display();
    }
}

const manage = new stuManage();
let updateIdx = null;

function createUpdateStudent() {
    let studentName = document.querySelector("#name").value.trim();
    let gridNo = document.querySelector("#grid").value.trim();
    let contactNo = document.querySelector("#number").value.trim();
    let mailId = document.querySelector("#mail").value.trim();
    let gender = document.querySelector("input[name='gender']:checked")?.value || null;
    let dob = document.querySelector("#dob").value.trim();

   
    const nameRegex = /^[A-Za-z\s]+$/; 
    const gridRegex =  /^\d{4}$/; 
    const contactNoRegex = /^[0-9]{10}$/; 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!nameRegex.test(studentName)) {
        Swal.fire({
            text: "Please enter a valid name letters and spaces only.",
            icon: "error"
        });
        return;
    }

    if (!gridRegex.test(gridNo)) {
        Swal.fire({
            text: "Please enter a valid grid number.",
            icon: "error"
        });
        return;
    }

    if (!contactNoRegex.test(contactNo)) {
        Swal.fire({
            text: "Please enter a valid 10-digit contact number.",
            icon: "error"
        });
        return;
    }

    if (!emailRegex.test(mailId)) {
        Swal.fire({
            text: "Please enter a valid email address.",
            icon: "error"
        });
        return;
    }

    if (!dobRegex.test(dob)) {
        Swal.fire({
            text: "Enter a valid date of birth.",
            icon: "error"   
        });
        return;
    }
    if(!gender){
        Swal.fire({
            text: "Select gender",
            icon: "error"   
        });
        return;
    }

    let student = new Student(studentName, gridNo, contactNo, mailId, gender, dob);

    if (updateIdx === null) {
        manage.create(student);
    } else {
        manage.update(updateIdx, student);
        updateIdx = null;
        document.getElementById("submit").textContent = "Register";
    }
    resetForm();
}

function deleteStudent(idx) {
    manage.delete(idx);
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("grid").value = "";
    document.getElementById("number").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("dob").value = "";
    document.querySelectorAll("input[name='gender']").forEach((el) => el.checked = false);
}

function updateStudent(idx) {
    let student = manage.students[idx];

    document.getElementById("name").value = student.name;
    document.getElementById("grid").value = student.grid;
    document.getElementById("number").value = student.contactNo;
    document.getElementById("mail").value = student.emailId;
    document.getElementById("dob").value = student.dob;

    document.querySelector(`input[name='gender'][value='${student.gender}']`).checked = true;

    updateIdx = idx;
    document.getElementById("submit").textContent = "Update";
}

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    createUpdateStudent();
});
