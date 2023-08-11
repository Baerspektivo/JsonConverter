var fs = require('fs');
var inputFilePath = '/home/semus/angular-ae/AngularProjektInfos/AufgabenstellungProjekt/LPI-2019-1-102d-QA';
var inputData = fs.readFileSync(inputFilePath, 'utf-8');
var questions = inputData.split('\n\nQUESTION ');
questions.shift();
var jsonData = questions.map(function (question) {
    var lines = question.split('\n');
    var firstLine = lines[0].replace('QUESTION', '').trim();
    var questionNumber = parseInt(firstLine.split(':')[0]);
    var questionText = '';
    var choices = [];
    var answer = '';
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.startsWith('QUESTION') || line.startsWith('Answer:')) {
            continue;
        }
        else if (line.startsWith('A.') || line.startsWith('B.') || line.startsWith('C.') || line.startsWith('D.') || line.startsWith('E.')) {
            choices.push(line.trim());
        }
        else {
            questionText += line.trim() + ' ';
        }
    }
    var answerLine = lines.find(function (line) { return line.startsWith('Answer:'); });
    if (answerLine) {
        answer = answerLine.split(': ')[1];
    }
    return {
        questionNumber: questionNumber,
        question: questionText.trim(),
        choices: choices,
        answer: answer
    };
});
var outputFilePath = 'LPI-2019-1-102d-QA.json';
fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
console.log('JSON-Datei wurde erstellt:', outputFilePath);
