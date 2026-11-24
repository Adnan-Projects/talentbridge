import { Student } from '@/data/mockStudents';
import { Volunteer } from '@/data/mockVolunteers';

export interface MatchResult {
  volunteer: Volunteer;
  student: Student;
  score: number; // 0-100
  reasons: string[];
  status: 'Suggested' | 'Connected' | 'Rejected';
}

function categoryMatch(volunteerExpertise: string, studentSkill: string, studentCategory: string): number {
  const exp = volunteerExpertise.toLowerCase();
  const skill = studentSkill.toLowerCase();
  const cat = studentCategory.toLowerCase();

  if (exp === skill) return 40;
  if (exp.includes(skill) || skill.includes(exp)) return 35;

  const categoryGroups: Record<string, string[]> = {
    music:    ['violin', 'guitar', 'piano', 'singing', 'flute', 'drums', 'music'],
    sports:   ['football', 'athletics', 'cricket', 'swimming', 'basketball', 'sports'],
    dance:    ['classical dance', 'contemporary dance', 'hip-hop dance', 'jazz', 'ballet', 'dance'],
    art:      ['painting', 'drawing', 'illustration', 'sculpture', 'art'],
    academic: ['mathematics', 'science', 'biology', 'chemistry', 'physics', 'programming', 'web development'],
  };

  for (const group of Object.values(categoryGroups)) {
    if (group.some(g => exp.includes(g)) && group.some(g => skill.includes(g) || cat.includes(g))) {
      return 25;
    }
  }

  return 0;
}

function availabilityMatch(volunteerAvail: string[], studentAvail: string[]): number {
  const overlap = volunteerAvail.filter(a => studentAvail.includes(a));
  if (overlap.length === 0) return 0;
  if (overlap.length >= 2) return 25;
  return 15;
}

function skillLevelBonus(volunteerExperience: string, studentLevel: string): number {
  const years = parseInt(volunteerExperience.match(/(\d+)/)?.[1] ?? '0', 10);
  if (studentLevel === 'Advanced' && years >= 8) return 15;
  if (studentLevel === 'Intermediate' && years >= 5) return 15;
  if (studentLevel === 'Beginner') return 10;
  return 5;
}

function teachingModeBonus(volunteerMode: string, studentAvail: string[]): number {
  const isOnline = studentAvail.includes('Online');
  if (volunteerMode === 'Both') return 10;
  if (isOnline && volunteerMode === 'Online') return 10;
  if (!isOnline && volunteerMode === 'In-Person') return 10;
  return 0;
}

export function computeMatch(volunteer: Volunteer, student: Student): MatchResult {
  const reasons: string[] = [];
  let score = 0;

  // Category/skill match (up to 40 pts)
  const catScore = categoryMatch(volunteer.expertise, student.specificSkill, student.talentCategory);
  score += catScore;
  if (catScore >= 35) reasons.push(`Direct expertise match: ${volunteer.expertise} ↔ ${student.specificSkill}`);
  else if (catScore >= 25) reasons.push(`Same talent category: ${student.talentCategory}`);

  // Availability (up to 25 pts)
  const avScore = availabilityMatch(volunteer.availability, student.availability);
  score += avScore;
  if (avScore >= 25) reasons.push('Schedules align perfectly');
  else if (avScore >= 15) reasons.push('Partial schedule overlap');

  // Skill level (up to 15 pts)
  const lvlScore = skillLevelBonus(volunteer.experience, student.skillLevel);
  score += lvlScore;
  if (lvlScore >= 15) reasons.push(`${student.skillLevel} level matches volunteer experience`);

  // Teaching mode (up to 10 pts)
  const modeScore = teachingModeBonus(volunteer.teachingMode, student.availability);
  score += modeScore;
  if (modeScore >= 10) reasons.push(`Teaching mode compatible: ${volunteer.teachingMode}`);

  // Active volunteer bonus (up to 10 pts)
  if (volunteer.status === 'Active') { score += 10; reasons.push('Volunteer is currently active'); }

  score = Math.min(100, score);

  return { volunteer, student, score, reasons, status: 'Suggested' };
}

export function findMatchesForVolunteer(volunteer: Volunteer, students: Student[]): MatchResult[] {
  return students
    .map(s => computeMatch(volunteer, s))
    .filter(m => m.score >= 25)
    .sort((a, b) => b.score - a.score);
}

export function findMatchesForStudent(student: Student, volunteers: Volunteer[]): MatchResult[] {
  return volunteers
    .map(v => computeMatch(v, student))
    .filter(m => m.score >= 25)
    .sort((a, b) => b.score - a.score);
}

export function findAllMatches(volunteers: Volunteer[], students: Student[]): MatchResult[] {
  const results: MatchResult[] = [];
  for (const v of volunteers) {
    for (const s of students) {
      const m = computeMatch(v, s);
      if (m.score >= 40) results.push(m);
    }
  }
  return results.sort((a, b) => b.score - a.score);
}
