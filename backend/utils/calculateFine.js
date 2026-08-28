 

const FINE_PER_DAY = 10; 

function calculateFine(dueDate, returnDate = new Date()) {
  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  if (returned <= due) {
    return 0; 
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((returned - due) / msPerDay);

  return diffDays * FINE_PER_DAY;
}

module.exports = calculateFine;
