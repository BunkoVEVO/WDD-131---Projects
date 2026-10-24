function convert(grade) {
    let points;

    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('Not a valid grade');
            return null;
    }

    return points;
}

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const students = [
    { last: 'Andrus', first: 'Aaron' },
    { last: 'Masa', first: 'Manny' },
    { last: 'Tanda', first: 'Tamanda' }
];

// 1. Use forEach() to display every word.
words.forEach(function(word) {
    console.log(word);
});

// 2. Use map() to create an array of word lengths.
const wordLengths = words.map(function(word) {
    return word.length;
});
console.log(wordLengths);

// 3. Use filter() to find words with more than five letters.
const longWords = words.filter(function(word) {
    return word.length > 5;
});
console.log(longWords);

// 4. Use reduce() to calculate the total word length.
const totalLength = words.reduce(function(total, word) {
    return total + word.length;
}, 0);
console.log(totalLength);

// 5. Use indexOf() to find the position of apple.
console.log(words.indexOf('apple'));

// 6. Use map() to convert letter grades to points.
const grades = ['A', 'B', 'C', 'D', 'F'];
const gradePoints = grades.map(convert);
console.log(gradePoints);

// 7. Use map() to create full names for students.
const studentNames = students.map(function(student) {
    return `${student.first} ${student.last}`;
});
console.log(studentNames);

// 8. Use forEach() to display student names.
students.forEach(function(student) {
    console.log(`${student.first} ${student.last}`);
});
