const PREFIX = 'cil_'; // chart insight lab

export function saveAnswer(caseId, questionKey, value) {
  const key = `${PREFIX}${caseId}_${questionKey}`;
  localStorage.setItem(key, value);
}

export function loadAnswer(caseId, questionKey) {
  const key = `${PREFIX}${caseId}_${questionKey}`;
  return localStorage.getItem(key) || '';
}

export function loadAllAnswers(caseId) {
  return {
    q1: loadAnswer(caseId, 'q1'),
    q2: loadAnswer(caseId, 'q2'),
    q3: loadAnswer(caseId, 'q3'),
    q4: loadAnswer(caseId, 'q4'),
  };
}

export function markCaseCompleted(caseId) {
  const key = `${PREFIX}completed`;
  const completed = getCompletedCases();
  if (!completed.includes(caseId)) {
    completed.push(caseId);
    localStorage.setItem(key, JSON.stringify(completed));
  }
}

export function getCompletedCases() {
  const raw = localStorage.getItem(`${PREFIX}completed`);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getProgress() {
  const completed = getCompletedCases();
  return completed.length;
}

export function clearCaseAnswers(caseId) {
  ['q1', 'q2', 'q3', 'q4'].forEach(q => {
    localStorage.removeItem(`${PREFIX}${caseId}_${q}`);
  });
}
