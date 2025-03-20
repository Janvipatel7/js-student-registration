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
                        <td>
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
    let gender = document.querySelector("input[name='gender']:checked")?.value || "";
    let dob = document.querySelector("#dob").value.trim();

    if (studentName === "" || gridNo === "" || contactNo === "" || mailId === "" || dob === "" || gender === "") {
        alert("Please Fill Out The Form Correctly!");
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
