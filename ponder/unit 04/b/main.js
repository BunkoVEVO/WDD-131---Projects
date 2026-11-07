
const aCourse = {
  code: "WDD131",
  name: "Dynamic Web Fundamentals",
  credits: 2,

  sections: [
    {
      sectionNum: 1,
      enrolled: 95,
      instructor: "Roberto Diaz Rodriguez"
    },
    {
      sectionNum: 2,
      enrolled: 80,
      instructor: "Sarah Gobble"
    }
  ],

  enrollStudent: function(sectionNum) {
    const sectionIndex = this.sections.findIndex(
      section => section.sectionNum == sectionNum
    );

    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
    }
  }
};

// Display course information
function setCourseInformation(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent =
    `Course Code: ${course.code}`;
}

// Create a table row for each section
function sectionTemplate(section) {
  return `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.instructor}</td>
  </tr>`;
}

// Display all course sections
function renderSections(sections) {
  const html = sections.map(sectionTemplate);
  document.querySelector("#sections").innerHTML = html.join("");
}

// Initialize the page
setCourseInformation(aCourse);
renderSections(aCourse.sections);
