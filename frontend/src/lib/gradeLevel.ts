// frontend/src/lib/gradeLevel.ts
//
// Computes a brother's current standing (1st year .. 5th year) from their
// expected graduation year — this is the piece that lets the public site
// show "3rd year" instead of a raw "Class of 2027", which is easy to
// confuse with a pledge class year (e.g. "Pi '27").
//
// grad_year itself only ever lives in the admin dashboard / Supabase; the
// public-facing Brother type (lib/brothers.ts) exposes just the computed
// label from this function, never the raw year.

const GRADE_LABELS = ['1st', '2nd', '3rd', '4th', '5th'] as const;

// UCSC's academic year turns over when Fall quarter starts (late
// September), not on January 1st — someone who's a "4th year" in October
// 2026 is still a 4th year in February 2027, even though the calendar
// year changed. Month is 0-indexed, so 8 = September.
const FALL_QUARTER_START_MONTH = 7;

function currentAcademicYear(today: Date): number {
  const isPastFallStart = today.getMonth() >= FALL_QUARTER_START_MONTH;
  return isPastFallStart ? today.getFullYear() + 1 : today.getFullYear();
}

/**
 * @param gradYear expected graduation year (e.g. 2027), or null/undefined
 *   if it hasn't been set in the admin yet
 * @param today defaults to the real current date — overridable for testing
 */
export function getGradeLabel(
  gradYear: number | null | undefined,
  today: Date = new Date()
): string | undefined {
  if (!gradYear) return undefined;

  const yearsUntilGraduation = gradYear - currentAcademicYear(today);

  // Clamp: 3+ years out reads as "1st year" no matter how far out; already
  // past the expected grad year (taking longer than planned) caps at
  // "5th year" rather than showing something like "7th year".
  const index = Math.min(Math.max(3 - yearsUntilGraduation, 0), GRADE_LABELS.length - 1);
  return GRADE_LABELS[index];
}