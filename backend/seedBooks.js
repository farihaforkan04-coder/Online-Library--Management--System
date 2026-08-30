const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");

dotenv.config();

const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", category: "Fiction", quantity: 5, available: 5, publishedYear: 1925 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", category: "Fiction", quantity: 4, available: 4, publishedYear: 1960 },
  { title: "1984", author: "George Orwell", isbn: "9780451524935", category: "Dystopian", quantity: 6, available: 6, publishedYear: 1949 },
  { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", category: "Romance", quantity: 3, available: 3, publishedYear: 1813 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", category: "Fantasy", quantity: 7, available: 7, publishedYear: 1937 },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780590353427", category: "Fantasy", quantity: 8, available: 8, publishedYear: 1997 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488", category: "Fiction", quantity: 4, available: 4, publishedYear: 1951 },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", isbn: "9780544003415", category: "Fantasy", quantity: 5, available: 5, publishedYear: 1954 },
  { title: "Animal Farm", author: "George Orwell", isbn: "9780451526342", category: "Political Satire", quantity: 6, available: 6, publishedYear: 1945 },
  { title: "Brave New World", author: "Aldous Huxley", isbn: "9780060850524", category: "Dystopian", quantity: 4, available: 4, publishedYear: 1932 },
  { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780062315007", category: "Adventure", quantity: 7, available: 7, publishedYear: 1988 },
  { title: "The Da Vinci Code", author: "Dan Brown", isbn: "9780307474278", category: "Thriller", quantity: 5, available: 5, publishedYear: 2003 },
  { title: "The Kite Runner", author: "Khaled Hosseini", isbn: "9781594631931", category: "Drama", quantity: 4, available: 4, publishedYear: 2003 },
  { title: "Life of Pi", author: "Yann Martel", isbn: "9780156027328", category: "Adventure", quantity: 3, available: 3, publishedYear: 2001 },
  { title: "The Book Thief", author: "Markus Zusak", isbn: "9780375842207", category: "Historical Fiction", quantity: 5, available: 5, publishedYear: 2005 },
  { title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780062316097", category: "Non-Fiction", quantity: 6, available: 6, publishedYear: 2011 },
  { title: "Atomic Habits", author: "James Clear", isbn: "9780735211292", category: "Self-Help", quantity: 8, available: 8, publishedYear: 2018 },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", isbn: "9781612680194", category: "Finance", quantity: 5, available: 5, publishedYear: 1997 },
  { title: "The Power of Habit", author: "Charles Duhigg", isbn: "9780812981605", category: "Self-Help", quantity: 4, available: 4, publishedYear: 2012 },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", isbn: "9780374533557", category: "Psychology", quantity: 3, available: 3, publishedYear: 2011 },
  { title: "Educated", author: "Tara Westover", isbn: "9780399590504", category: "Memoir", quantity: 4, available: 4, publishedYear: 2018 },
  { title: "Becoming", author: "Michelle Obama", isbn: "9781524763138", category: "Memoir", quantity: 5, available: 5, publishedYear: 2018 },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", isbn: "9780062457714", category: "Self-Help", quantity: 7, available: 7, publishedYear: 2016 },
  { title: "Can't Hurt Me", author: "David Goggins", isbn: "9781544512280", category: "Motivation", quantity: 6, available: 6, publishedYear: 2018 },
  { title: "The Psychology of Money", author: "Morgan Housel", isbn: "9780857197689", category: "Finance", quantity: 5, available: 5, publishedYear: 2020 },
  { title: "Ikigai", author: "Héctor García", isbn: "9780143130727", category: "Philosophy", quantity: 4, available: 4, publishedYear: 2016 },
  { title: "Deep Work", author: "Cal Newport", isbn: "9781455586691", category: "Productivity", quantity: 4, available: 4, publishedYear: 2016 },
  { title: "The Lean Startup", author: "Eric Ries", isbn: "9780307887894", category: "Business", quantity: 3, available: 3, publishedYear: 2011 },
  { title: "Zero to One", author: "Peter Thiel", isbn: "9780804139298", category: "Business", quantity: 4, available: 4, publishedYear: 2014 },
  { title: "The Art of War", author: "Sun Tzu", isbn: "9781590302255", category: "Strategy", quantity: 5, available: 5, publishedYear: -500 },
  { title: "Meditations", author: "Marcus Aurelius", isbn: "9780140449334", category: "Philosophy", quantity: 3, available: 3, publishedYear: 180 },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", isbn: "9780807014271", category: "Psychology", quantity: 4, available: 4, publishedYear: 1946 },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", isbn: "9780743269513", category: "Self-Help", quantity: 5, available: 5, publishedYear: 1989 },
  { title: "How to Win Friends and Influence People", author: "Dale Carnegie", isbn: "9780671027036", category: "Self-Help", quantity: 6, available: 6, publishedYear: 1936 },
  { title: "The Intelligent Investor", author: "Benjamin Graham", isbn: "9780060555665", category: "Finance", quantity: 3, available: 3, publishedYear: 1949 },
  { title: "A Brief History of Time", author: "Stephen Hawking", isbn: "9780553380163", category: "Science", quantity: 4, available: 4, publishedYear: 1988 },
  { title: "Cosmos", author: "Carl Sagan", isbn: "9780345539434", category: "Science", quantity: 3, available: 3, publishedYear: 1980 },
  { title: "The Selfish Gene", author: "Richard Dawkins", isbn: "9780199291151", category: "Science", quantity: 2, available: 2, publishedYear: 1976 },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", isbn: "9780393317558", category: "History", quantity: 3, available: 3, publishedYear: 1997 },
  { title: "Homo Deus", author: "Yuval Noah Harari", isbn: "9780062464316", category: "Futurism", quantity: 4, available: 4, publishedYear: 2015 },
  { title: "The Diary of a Young Girl", author: "Anne Frank", isbn: "9780553296983", category: "Biography", quantity: 5, available: 5, publishedYear: 1947 },
  { title: "Steve Jobs", author: "Walter Isaacson", isbn: "9781451648539", category: "Biography", quantity: 4, available: 4, publishedYear: 2011 },
  { title: "Elon Musk", author: "Ashlee Vance", isbn: "9780062301239", category: "Biography", quantity: 3, available: 3, publishedYear: 2015 },
  { title: "The Wright Brothers", author: "David McCullough", isbn: "9781476728759", category: "History", quantity: 2, available: 2, publishedYear: 2015 },
  { title: "Into the Wild", author: "Jon Krakauer", isbn: "9780385486804", category: "Adventure", quantity: 4, available: 4, publishedYear: 1996 },
  { title: "Wild", author: "Cheryl Strayed", isbn: "9780307476074", category: "Memoir", quantity: 3, available: 3, publishedYear: 2012 },
  { title: "The Martian", author: "Andy Weir", isbn: "9780553418026", category: "Science Fiction", quantity: 6, available: 6, publishedYear: 2011 },
  { title: "Project Hail Mary", author: "Andy Weir", isbn: "9780593135204", category: "Science Fiction", quantity: 5, available: 5, publishedYear: 2021 },
  { title: "Dune", author: "Frank Herbert", isbn: "9780441172719", category: "Science Fiction", quantity: 5, available: 5, publishedYear: 1965 },
  { title: "Neuromancer", author: "William Gibson", isbn: "9780441569595", category: "Science Fiction", quantity: 3, available: 3, publishedYear: 1984 },
];

async function seedBooks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: clear old books first
    await Book.deleteMany({});
    console.log("🗑️  Old books deleted");

    await Book.insertMany(books);
    console.log(`✅ ${books.length} books inserted successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding books:", error.message);
    process.exit(1);
  }
}

seedBooks();