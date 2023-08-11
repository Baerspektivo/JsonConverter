const fs = require('fs');


const inputFilePath = '/home/semus/angular-ae/AngularProjektInfos/AufgabenstellungProjekt/LPI-2019-1-102d-QA';

const inputData = fs.readFileSync(inputFilePath, 'utf-8');



const questions = inputData.split('\n\nQUESTION ');


questions.shift();


const jsonData = questions.map(question => {
  const lines: string[] = question.split('\n');
  
  const firstLine = lines[0].replace('QUESTION', '').trim();
  const questionNumber = parseInt(firstLine.split(':')[0]);

  let questionText = '';
  let choices: string[] = [];
  let answer = '';

  for (const line of lines) {
    if (line.startsWith('QUESTION') || line.startsWith('Answer:')) {
        continue;
    }else if ( line.startsWith('A.') || line.startsWith('B.') || line.startsWith ('C.') || line.startsWith('D.') || line.startsWith('E.')){
        choices.push(line.trim());
    }else{
        questionText += line.trim() + ' ';
    }
  }

const answerLine = lines.find(line => line.startsWith('Answer:'));
if(answerLine){
    answer = answerLine.split(': ')[1];
}

  return {
    questionNumber: questionNumber,
    question: questionText.trim(),
    choices: choices,
    answer: answer
  };
});


const outputFilePath = 'LPI-2019-1-102d-QA.json';

fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));

console.log('JSON-Datei wurde erstellt:', outputFilePath);
